// File in `src/lib/` — not touched by Stainless code generation.
//
// Implements a one-call upload helper that drives the full direct-upload flow
// (reserve a signed URL -> push the bytes -> mark complete -> poll until ready)
// from a local file path, Blob, Buffer, stream, or anything `toFile` accepts.

import { FLORAError } from '../core/error';
import type { Fetch } from '../internal/builtin-types';
import type { RequestOptions } from '../internal/request-options';
import { toFile, type ToFileInput } from '../internal/to-file';
import { type Uploadable } from '../internal/uploads';
import { sleep } from '../internal/utils/sleep';
import type { FLORA } from '../client';
import type { AssetCreateResponse, AssetRetrieveResponse } from '../resources/assets';

/**
 * Anything {@link Assets.upload} accepts as the file argument: a filesystem path
 * (Node.js only), or any value that the SDK's {@link toFile} helper understands
 * (`File`, `Blob`, `Buffer`/`Uint8Array`, `ArrayBuffer`, `fetch` `Response`, an
 * `fs.ReadStream`, or an async iterable of bytes).
 */
export type AssetUploadable = string | Uploadable | ToFileInput;

export interface AssetUploadParams {
  /**
   * Workspace identifier. Use the public API ID returned by list workspaces; it
   * must start with `ws_`.
   */
  workspace_id: string;

  /**
   * Asset content type. Defaults to the file's own MIME type when available.
   */
  content_type?: string;

  /**
   * Asset file name. Defaults to the file's own name when available.
   */
  file_name?: string;

  /**
   * Destination folder.
   */
  folder?: string;

  /**
   * How often, in milliseconds, to poll for the asset to become ready.
   * Defaults to 1000ms.
   */
  pollIntervalMs?: number;

  /**
   * Maximum time, in milliseconds, to wait for the asset to become ready before
   * throwing. Defaults to 120000ms (2 minutes).
   */
  pollTimeoutMs?: number;
}

/**
 * Upload a local file to FLORA in a single call.
 *
 * Detects the input (path / Blob / Buffer / stream / `File`), reserves a signed
 * upload URL, pushes the bytes directly to storage, marks the upload complete,
 * and polls until the asset is processed — returning the final, ready asset.
 */
export async function uploadAsset(
  client: FLORA,
  file: AssetUploadable,
  params: AssetUploadParams,
  options?: RequestOptions,
): Promise<AssetRetrieveResponse> {
  const {
    workspace_id,
    content_type,
    file_name,
    folder,
    pollIntervalMs = 1000,
    pollTimeoutMs = 120_000,
  } = params;

  // 1. Normalize whatever we were handed into a `File` so we can read its name,
  //    type, and bytes consistently.
  const resolved = await resolveUploadFile(file, file_name);

  // 2. Reserve a signed direct-upload URL.
  const reservation = await client.assets.create(
    {
      source: 'signed-url',
      workspace_id,
      ...(content_type ?? resolved.type ? { content_type: content_type ?? resolved.type } : {}),
      ...(file_name ?? resolved.name ? { file_name: file_name ?? resolved.name } : {}),
      ...(folder ? { folder } : {}),
    },
    options,
  );

  // 3. Push the bytes directly to storage.
  await uploadBytes(client, reservation, resolved);

  // 4. Mark the signed upload complete.
  await client.assets.complete(reservation.asset_id, options);

  // 5. Poll until the asset is processed and ready.
  return pollUntilReady(client, reservation.asset_id, pollIntervalMs, pollTimeoutMs, options);
}

async function resolveUploadFile(file: AssetUploadable, fileName?: string): Promise<File> {
  // A plain string is treated as a filesystem path (Node.js only). Everything
  // else is handed straight to `toFile`.
  if (typeof file === 'string') {
    const fs = await importNodeFs();
    return toFile(fs.createReadStream(file), fileName);
  }
  return toFile(file as ToFileInput, fileName);
}

async function importNodeFs(): Promise<typeof import('node:fs')> {
  try {
    return await import('node:fs');
  } catch {
    throw new FLORAError(
      'Uploading from a file path is only supported in Node.js. ' +
        'Pass a File, Blob, Buffer, or stream instead.',
    );
  }
}

async function uploadBytes(client: FLORA, reservation: AssetCreateResponse, file: File): Promise<void> {
  const doFetch = getFetch(client);
  const upload = reservation.upload;

  // Preferred path: a presigned multipart/form-data POST (e.g. an S3/GCS POST
  // policy). Form fields must be appended before the file.
  if (upload?.url) {
    const form = new FormData();
    for (const [key, value] of Object.entries(upload.form_fields ?? {})) {
      form.append(key, value);
    }
    form.append(upload.file_field || 'file', file, file.name);

    const res = await doFetch(upload.url, { method: upload.method || 'POST', body: form });
    await assertUploadOk(res, reservation.asset_id);
    return;
  }

  // Fallback: a presigned URL that takes the raw bytes via PUT.
  if (reservation.upload_url) {
    const res = await doFetch(reservation.upload_url, {
      method: 'PUT',
      body: file,
      ...(file.type ? { headers: { 'Content-Type': file.type } } : {}),
    });
    await assertUploadOk(res, reservation.asset_id);
    return;
  }

  throw new FLORAError(
    `Asset ${reservation.asset_id} did not return an upload target; cannot upload file bytes.`,
  );
}

function getFetch(client: FLORA): Fetch {
  const clientFetch = (client as unknown as { fetch?: Fetch }).fetch;
  if (typeof clientFetch === 'function') {
    return (input, init) => clientFetch(input, init);
  }
  if (typeof fetch !== 'undefined') {
    return (input, init) => fetch(input, init);
  }
  throw new FLORAError('No fetch implementation is available to upload asset bytes.');
}

async function assertUploadOk(res: Response, assetID: string): Promise<void> {
  if (res.ok) return;
  let detail = '';
  try {
    detail = (await res.text()).slice(0, 500);
  } catch {
    // ignore — the status line is enough to surface the failure
  }
  throw new FLORAError(
    `Failed to upload bytes for asset ${assetID}: ${res.status} ${res.statusText}${
      detail ? ` - ${detail}` : ''
    }`,
  );
}

async function pollUntilReady(
  client: FLORA,
  assetID: string,
  pollIntervalMs: number,
  pollTimeoutMs: number,
  options?: RequestOptions,
): Promise<AssetRetrieveResponse> {
  const deadline = Date.now() + pollTimeoutMs;

  for (;;) {
    const asset = await client.assets.retrieve(assetID, options);

    if (asset.status === 'ready') return asset;

    if (asset.status === 'failed') {
      throw new FLORAError(
        `Asset ${assetID} failed to process${asset.failure_message ? `: ${asset.failure_message}` : ''}.`,
      );
    }

    if (Date.now() >= deadline) {
      throw new FLORAError(
        `Timed out after ${pollTimeoutMs}ms waiting for asset ${assetID} to become ready ` +
          `(last status: ${asset.status}).`,
      );
    }

    await sleep(pollIntervalMs);
  }
}
