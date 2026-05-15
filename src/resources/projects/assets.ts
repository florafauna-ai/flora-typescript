// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Project canvas endpoints.
 */
export class Assets extends APIResource {
  /**
   * Attaches an existing ready asset to a project canvas as a static media node.
   * Mutating public API requests support an optional Idempotency-Key header for
   * client retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.projects.assets.attachAsset(
   *   'asset_abc123',
   *   { projectId: 'prj_abc123' },
   * );
   * ```
   */
  attachAsset(
    assetID: string,
    params: AssetAttachAssetParams,
    options?: RequestOptions,
  ): APIPromise<AssetAttachAssetResponse> {
    const { projectId } = params;
    return this._client.post(path`/projects/${projectId}/assets/${assetID}/attach`, options);
  }
}

export interface AssetAttachAssetResponse {
  /**
   * Asset identifier
   */
  asset_id: string;

  /**
   * Project canvas URL
   */
  canvas_url: string;

  /**
   * Canvas node identifier
   */
  node_id: string;

  /**
   * Project identifier
   */
  project_id: string;
}

export interface AssetAttachAssetParams {
  /**
   * Project identifier
   */
  projectId: string;
}

export declare namespace Assets {
  export {
    type AssetAttachAssetResponse as AssetAttachAssetResponse,
    type AssetAttachAssetParams as AssetAttachAssetParams,
  };
}
