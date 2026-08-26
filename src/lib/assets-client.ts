import * as Flora from "../generated/api/index.js"
import { AssetsClient as GeneratedAssetsClient } from "../generated/api/resources/assets/client/Client.js"
import { mergeHeaders } from "../generated/core/headers.js"
import * as core from "../generated/core/index.js"
import * as environments from "../generated/environments.js"
import { handleNonStatusCodeError } from "../generated/errors/handleNonStatusCodeError.js"
import { FloraError } from "../generated/errors/index.js"

/** The server stores direct multipart bytes up to 4 MB; larger files must use the signed-url path. */
const DIRECT_MAX_BYTES = 4 * 1024 * 1024

/**
 * Anything {@link AssetsClient.upload} accepts as the file argument:
 *
 * - a public `https://` URL — FLORA fetches it server-side (no bytes leave the
 *   client; SSRF-protected, up to 50 MB). Plain `http://` is rejected up front,
 *   as the API only accepts HTTPS sources;
 * - any other string — a local filesystem path (Node.js only);
 * - a `File` or `Blob`;
 * - raw bytes (`Uint8Array`, Node `Buffer`, or `ArrayBuffer`).
 */
export type AssetUploadable = string | Blob | Uint8Array | ArrayBuffer

export interface AssetUploadParams {
  /** Workspace identifier (`ws_…`). */
  workspace_id: string
  /** Asset content type. Defaults to the file's own MIME type when available. */
  content_type?: string
  /** Asset file name. Defaults to the file's own name when available. */
  file_name?: string
  /** Destination folder. */
  folder?: string
  /** Project identifier (`prj_…`). When provided, the asset is also surfaced on that project's canvas. */
  project_id?: string
  /** How often, in milliseconds, to poll for the asset to become ready. Defaults to 1000. */
  pollIntervalMs?: number
  /** Maximum time, in milliseconds, to wait for the asset to become ready. Defaults to 120000. */
  pollTimeoutMs?: number
}

/**
 * The generated assets client plus a one-call `upload` helper.
 */
export class AssetsClient extends GeneratedAssetsClient {
  /**
   * Upload a file to FLORA in a single call, choosing the optimal path:
   *
   * - a public URL is fetched server-side;
   * - a local file ≤ 4 MB is sent as direct multipart bytes in one request;
   * - a larger local file reserves a signed upload URL, sends the bytes, and is
   *   marked complete.
   *
   * It then polls until the asset is processed and returns the final, ready asset.
   */
  public async upload(
    file: AssetUploadable,
    params: AssetUploadParams,
    requestOptions?: GeneratedAssetsClient.RequestOptions,
  ): Promise<Flora.RetrieveAssetsResponse> {
    const {
      workspace_id,
      content_type,
      file_name,
      folder,
      project_id,
      pollIntervalMs = 1000,
      pollTimeoutMs = 120_000,
    } = params
    const common = {
      workspace_id,
      ...(folder ? { folder } : {}),
      ...(project_id ? { project_id } : {}),
    }

    // Server-side fetch: hand a public https URL to the API as the source.
    if (typeof file === "string" && /^http:\/\//i.test(file)) {
      throw new FloraError({
        message: "Server-side fetch requires an https:// URL; the API rejects plain http sources.",
      })
    }
    if (typeof file === "string" && isHttpsUrl(file)) {
      const resolvedName = file_name ?? nameFromUrl(file)
      const fetched = await this.create(
        {
          source: file,
          ...common,
          ...(content_type ? { content_type } : {}),
          ...(resolvedName ? { file_name: resolvedName } : {}),
        },
        requestOptions,
      )
      return this.pollUntilReady(fetched.asset_id, pollIntervalMs, pollTimeoutMs, requestOptions)
    }

    const resolved = await resolveUploadFile(file, file_name, content_type)

    // Direct bytes for small files: a single multipart request returns the asset.
    if (resolved.size <= DIRECT_MAX_BYTES) {
      const form = new FormData()
      for (const [key, value] of Object.entries(common)) form.append(key, value)
      if (resolved.type) form.append("content_type", resolved.type)
      if (resolved.name) form.append("file_name", resolved.name)
      form.append("file", resolved, resolved.name)
      const created = await this.createDirect(form, requestOptions)
      return this.pollUntilReady(created.asset_id, pollIntervalMs, pollTimeoutMs, requestOptions)
    }

    // Signed upload for large files: reserve, send the bytes, then complete.
    const reservation = await this.create(
      {
        source: "signed-url",
        ...common,
        ...(resolved.type ? { content_type: resolved.type } : {}),
        ...(resolved.name ? { file_name: resolved.name } : {}),
      },
      requestOptions,
    )
    await this.uploadBytes(reservation, resolved, requestOptions)
    await this.complete({ assetId: reservation.asset_id }, requestOptions)
    return this.pollUntilReady(reservation.asset_id, pollIntervalMs, pollTimeoutMs, requestOptions)
  }

  /**
   * POST /assets as multipart/form-data. The OpenAPI document models this
   * endpoint's JSON body only, so the generated `create` cannot send bytes; this
   * goes through the same fetcher with the form as the raw body (no
   * Content-Type override, so fetch sets the multipart boundary).
   */
  private async createDirect(
    form: FormData,
    requestOptions?: GeneratedAssetsClient.RequestOptions,
  ): Promise<Flora.CreateAssetsResponse> {
    const authRequest = await this._options.authProvider.getAuthRequest()
    const baseUrl =
      (await core.Supplier.get(this._options.baseUrl)) ??
      (await core.Supplier.get(this._options.environment)) ??
      environments.FloraEnvironment.Default
    const response = await (this._options.fetcher ?? core.fetcher)<Flora.CreateAssetsResponse>({
      url: core.url.join(baseUrl, "assets"),
      method: "POST",
      headers: mergeHeaders(authRequest.headers, this._options.headers, requestOptions?.headers),
      body: form,
      requestType: "file",
      timeoutMs: (requestOptions?.timeoutInSeconds ?? this._options.timeoutInSeconds ?? 60) * 1000,
      maxRetries: requestOptions?.maxRetries ?? this._options.maxRetries,
      abortSignal: requestOptions?.abortSignal,
      fetchFn: this._options.fetch,
      logging: this._options.logging,
    })
    if (response.ok) return response.body
    if (response.error.reason === "status-code") {
      throw toStatusError(response.error.statusCode, response.error.body, response.rawResponse)
    }
    return handleNonStatusCodeError(response.error, response.rawResponse, "POST", "/assets")
  }

  /**
   * Sends the bytes to the storage provider's presigned multipart POST policy.
   * The structured `upload` field is preferred; `upload_url` carries the same
   * policy serialized as JSON (`{ url, fields }`) for older response shapes.
   * The caller's abort signal and timeout apply to this transfer too.
   */
  private async uploadBytes(
    reservation: Flora.CreateAssetsResponse,
    file: File,
    requestOptions?: GeneratedAssetsClient.RequestOptions,
  ): Promise<void> {
    const doFetch = this._options.fetch ?? globalThis.fetch
    const target = resolveUploadTarget(reservation)
    if (!target) {
      throw new FloraError({
        message: `Asset ${reservation.asset_id} did not return an upload target; cannot upload file bytes.`,
      })
    }

    // Form fields must be appended before the file.
    const form = new FormData()
    for (const [key, value] of Object.entries(target.fields)) form.append(key, value)
    form.append(target.fileField, file, file.name)

    const timeoutSeconds = requestOptions?.timeoutInSeconds ?? this._options.timeoutInSeconds
    const signals: AbortSignal[] = []
    if (requestOptions?.abortSignal) signals.push(requestOptions.abortSignal)
    if (timeoutSeconds != null) signals.push(AbortSignal.timeout(timeoutSeconds * 1000))
    const res = await doFetch(target.url, {
      method: target.method,
      body: form,
      ...(signals.length > 0 ? { signal: AbortSignal.any(signals) } : {}),
    })
    await assertUploadOk(res, reservation.asset_id)
  }

  private async pollUntilReady(
    assetId: string,
    pollIntervalMs: number,
    pollTimeoutMs: number,
    requestOptions?: GeneratedAssetsClient.RequestOptions,
  ): Promise<Flora.RetrieveAssetsResponse> {
    const deadline = Date.now() + pollTimeoutMs
    for (;;) {
      const asset = await this.retrieve({ assetId }, requestOptions)
      if (asset.status === "ready") return asset
      if (asset.status === "failed") {
        throw new FloraError({
          message: `Asset ${assetId} failed to process${asset.failure_message ? `: ${asset.failure_message}` : ""}.`,
        })
      }
      if (Date.now() >= deadline) {
        throw new FloraError({
          message: `Timed out after ${pollTimeoutMs}ms waiting for asset ${assetId} to become ready (last status: ${asset.status}).`,
        })
      }
      // Runtime-agnostic sleep: the SDK cannot take on a dependency or Node-only timers.
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
    }
  }
}

async function resolveUploadFile(
  file: AssetUploadable,
  fileName?: string,
  contentType?: string,
): Promise<File> {
  if (typeof file === "string") {
    const bytes = await readLocalFile(file)
    const name = fileName ?? file.split(/[\\/]/).pop() ?? "upload"
    return new File([bytes], name, contentType ? { type: contentType } : {})
  }
  if (file instanceof Blob) {
    const name = fileName ?? (file instanceof File ? file.name : "upload")
    const type = contentType ?? file.type
    if (file instanceof File && name === file.name && type === file.type) return file
    return new File([file], name, type ? { type } : {})
  }
  // Uint8Array.from yields a view over a fresh ArrayBuffer, which is what File accepts
  // (a Node Buffer may sit on a shared or pooled buffer).
  const bytes = file instanceof ArrayBuffer ? new Uint8Array(file) : Uint8Array.from(file)
  return new File([bytes], fileName ?? "upload", contentType ? { type: contentType } : {})
}

async function readLocalFile(path: string): Promise<Uint8Array<ArrayBuffer>> {
  try {
    const { readFile } = await import("node:fs/promises")
    return Uint8Array.from(await readFile(path))
  } catch {
    throw new FloraError({
      message:
        "Uploading from a file path is only supported in Node.js. Pass a File, Blob, or bytes instead.",
    })
  }
}

async function assertUploadOk(res: Response, assetId: string): Promise<void> {
  if (res.ok) return
  let detail = ""
  try {
    detail = (await res.text()).slice(0, 500)
  } catch {
    // The status line is enough to surface the failure.
  }
  throw new FloraError({
    message: `Failed to upload bytes for asset ${assetId}: ${res.status} ${res.statusText}${detail ? ` - ${detail}` : ""}`,
  })
}

/** Same status → error-class mapping the generated `assets.create` uses, so callers can catch one set of types. */
function toStatusError(
  statusCode: number,
  body: unknown,
  rawResponse: core.RawResponse,
): FloraError {
  switch (statusCode) {
    case 400:
      return new Flora.BadRequestError(body, rawResponse)
    case 401:
      return new Flora.UnauthorizedError(body, rawResponse)
    case 402:
      return new Flora.PaymentRequiredError(body, rawResponse)
    case 403:
      return new Flora.ForbiddenError(body, rawResponse)
    case 404:
      return new Flora.NotFoundError(body, rawResponse)
    case 409:
      return new Flora.ConflictError(body, rawResponse)
    case 429:
      return new Flora.TooManyRequestsError(body, rawResponse)
    case 500:
      return new Flora.InternalServerError(body, rawResponse)
    default:
      return new FloraError({ statusCode, body, rawResponse })
  }
}

interface UploadTarget {
  url: string
  method: string
  fields: Record<string, string>
  fileField: string
}

function resolveUploadTarget(reservation: Flora.CreateAssetsResponse): UploadTarget | undefined {
  const upload = reservation.upload
  if (upload?.url) {
    return {
      url: upload.url,
      method: upload.method || "POST",
      fields: upload.form_fields ?? {},
      fileField: upload.file_field || "file",
    }
  }
  if (reservation.upload_url) {
    try {
      const parsed = JSON.parse(reservation.upload_url) as { url?: unknown; fields?: unknown }
      if (typeof parsed.url === "string") {
        const fields =
          parsed.fields && typeof parsed.fields === "object"
            ? (parsed.fields as Record<string, string>)
            : {}
        return { url: parsed.url, method: "POST", fields, fileField: "file" }
      }
    } catch {
      // Not the serialized policy; fall through to "no target".
    }
  }
  return undefined
}

function isHttpsUrl(value: string): boolean {
  return /^https:\/\//i.test(value)
}

function nameFromUrl(url: string): string | undefined {
  try {
    return new URL(url).pathname.split("/").pop() || undefined
  } catch {
    return undefined
  }
}
