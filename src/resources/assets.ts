// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { AssetsCursorPage, type AssetsCursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Asset upload and retrieval endpoints.
 */
export class Assets extends APIResource {
  /**
   * Creates an asset from a source string. Pass source="signed-url" to reserve a
   * direct upload URL, or pass an allowlisted HTTPS URL for server-side fetch.
   * Mutating public API requests support an optional Idempotency-Key header for
   * client retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const asset = await client.assets.create({
   *   source: 'signed-url',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  create(body: AssetCreateParams, options?: RequestOptions): APIPromise<AssetCreateResponse> {
    return this._client.post('/assets', { body, ...options });
  }

  /**
   * Returns metadata for one asset when it is accessible to the authenticated public
   * API key. Missing and inaccessible assets both return 404.
   *
   * @example
   * ```ts
   * const asset = await client.assets.retrieve('asset_abc123');
   * ```
   */
  retrieve(assetID: string, options?: RequestOptions): APIPromise<AssetRetrieveResponse> {
    return this._client.get(path`/assets/${assetID}`, options);
  }

  /**
   * Returns assets visible to the authenticated public API key. Filter by workspace,
   * project canvas, search query, cursor, and limit without exposing raw file bytes
   * or internal graph data.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetListResponse of client.assets.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AssetListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AssetListResponsesAssetsCursorPage, AssetListResponse> {
    return this._client.getAPIList('/assets', AssetsCursorPage<AssetListResponse>, { query, ...options });
  }

  /**
   * Marks a signed asset upload as complete after the file has been uploaded.
   * Mutating public API requests support an optional Idempotency-Key header for
   * client retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.assets.complete(
   *   'asset_abc123',
   * );
   * ```
   */
  complete(assetID: string, options?: RequestOptions): APIPromise<AssetCompleteResponse> {
    return this._client.post(path`/assets/${assetID}/complete`, options);
  }

  /**
   * Creates a fresh signed upload reservation for a failed or expired asset upload.
   * Mutating public API requests support an optional Idempotency-Key header for
   * client retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.assets.retry('asset_abc123');
   * ```
   */
  retry(assetID: string, options?: RequestOptions): APIPromise<AssetRetryResponse> {
    return this._client.post(path`/assets/${assetID}/retry`, options);
  }
}

export type AssetListResponsesAssetsCursorPage = AssetsCursorPage<AssetListResponse>;

export interface AssetCreateResponse {
  /**
   * Asset identifier
   */
  asset_id: string;

  status: 'pending_upload' | 'ready' | 'failed';

  /**
   * Asset source
   */
  uploaded_via: 'url' | 'signed_url';

  /**
   * Asset URL
   */
  url: string;

  visibility: 'workspace';

  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Expiration time for the upload URL
   */
  expires_at?: string;

  upload?: AssetCreateResponse.Upload;

  /**
   * Upload URL (serialized)
   */
  upload_url?: string;
}

export namespace AssetCreateResponse {
  export interface Upload {
    content_type: 'multipart/form-data';

    file_field: 'file';

    /**
     * Upload form fields
     */
    form_fields: { [key: string]: string };

    method: 'POST';

    /**
     * Upload URL
     */
    url: string;
  }
}

export interface AssetRetrieveResponse {
  /**
   * Asset identifier
   */
  asset_id: string;

  /**
   * Asset content type
   */
  content_type: string;

  /**
   * Asset creation time (ISO 8601 datetime)
   */
  created_at: string | null;

  /**
   * Asset description
   */
  description: string | null;

  /**
   * Failure message when the asset is in failed status
   */
  failure_message: string | null;

  height: number | null;

  /**
   * Asset name
   */
  name: string | null;

  size_bytes: number | null;

  status: 'pending_upload' | 'ready' | 'failed';

  /**
   * Content type provided at upload time
   */
  upload_content_type: string | null;

  /**
   * Asset source
   */
  uploaded_via: string;

  /**
   * Asset URL
   */
  url: string | null;

  width: number | null;

  /**
   * Workspace identifier
   */
  workspace_id: string | null;
}

export interface AssetListResponse {
  /**
   * Asset identifier
   */
  asset_id: string | null;

  /**
   * Asset content type
   */
  content_type: string;

  created_at: number | null;

  /**
   * Asset description
   */
  description: string | null;

  height: number | null;

  /**
   * Asset name
   */
  name: string | null;

  size_bytes: number | null;

  status: 'pending_upload' | 'ready' | 'failed';

  /**
   * Content type provided at upload time
   */
  upload_content_type: string | null;

  /**
   * Asset source
   */
  uploaded_via: string;

  /**
   * Asset URL
   */
  url: string | null;

  width: number | null;

  /**
   * Workspace identifier
   */
  workspace_id: string | null;

  /**
   * Associated node identifier
   */
  node_id?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;
}

export interface AssetCompleteResponse {
  /**
   * Asset identifier
   */
  asset_id: string;

  status: 'pending_upload' | 'ready' | 'failed';

  /**
   * Asset URL
   */
  url: string | null;

  visibility: 'workspace';

  /**
   * Workspace identifier
   */
  workspace_id: string | null;

  /**
   * Expiration time for the upload URL
   */
  expires_at?: string;

  /**
   * Failure message when the asset is in failed status
   */
  failure_message?: string | null;

  upload?: AssetCompleteResponse.Upload;

  /**
   * Upload URL (serialized)
   */
  upload_url?: string;
}

export namespace AssetCompleteResponse {
  export interface Upload {
    content_type: 'multipart/form-data';

    file_field: 'file';

    /**
     * Upload form fields
     */
    form_fields: { [key: string]: string };

    method: 'POST';

    /**
     * Upload URL
     */
    url: string;
  }
}

export interface AssetRetryResponse {
  /**
   * Asset identifier
   */
  asset_id: string;

  status: 'pending_upload' | 'ready' | 'failed';

  /**
   * Asset URL
   */
  url: string | null;

  visibility: 'workspace';

  /**
   * Workspace identifier
   */
  workspace_id: string | null;

  /**
   * Expiration time for the upload URL
   */
  expires_at?: string;

  /**
   * Failure message when the asset is in failed status
   */
  failure_message?: string | null;

  upload?: AssetRetryResponse.Upload;

  /**
   * Upload URL (serialized)
   */
  upload_url?: string;
}

export namespace AssetRetryResponse {
  export interface Upload {
    content_type: 'multipart/form-data';

    file_field: 'file';

    /**
     * Upload form fields
     */
    form_fields: { [key: string]: string };

    method: 'POST';

    /**
     * Upload URL
     */
    url: string;
  }
}

export interface AssetCreateParams {
  /**
   * Asset source as a string: either "signed-url" to reserve a direct upload URL, or
   * an allowlisted HTTPS URL for server-side fetch.
   */
  source: string;

  /**
   * Workspace identifier. Use the public API ID returned by list workspaces; it must
   * start with ws\_.
   */
  workspace_id: string;

  /**
   * Asset content type
   */
  content_type?: string;

  /**
   * Asset file name
   */
  file_name?: string;

  /**
   * Destination folder
   */
  folder?: string;
}

export interface AssetListParams extends AssetsCursorPageParams {
  /**
   * Project identifier
   */
  project_id?: string;

  /**
   * Search query
   */
  query?: string;

  /**
   * Workspace identifier
   */
  workspace_id?: string;
}

export declare namespace Assets {
  export {
    type AssetCreateResponse as AssetCreateResponse,
    type AssetRetrieveResponse as AssetRetrieveResponse,
    type AssetListResponse as AssetListResponse,
    type AssetCompleteResponse as AssetCompleteResponse,
    type AssetRetryResponse as AssetRetryResponse,
    type AssetListResponsesAssetsCursorPage as AssetListResponsesAssetsCursorPage,
    type AssetCreateParams as AssetCreateParams,
    type AssetListParams as AssetListParams,
  };
}
