// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Assets extends APIResource {
  /**
   * Attaches an existing ready asset to a project canvas as a static media node.
   * Mutating public API requests support an optional Idempotency-Key header for
   * client retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.projects.assets.attach(
   *   'asset_abc123',
   *   { projectId: 'prj_abc123' },
   * );
   * ```
   */
  attach(
    assetID: string,
    params: AssetAttachParams,
    options?: RequestOptions,
  ): APIPromise<AssetAttachResponse> {
    const { projectId } = params;
    return this._client.post(path`/projects/${projectId}/assets/${assetID}/attach`, options);
  }
}

export interface AssetAttachResponse {
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

export interface AssetAttachParams {
  /**
   * Project identifier
   */
  projectId: string;
}

export declare namespace Assets {
  export { type AssetAttachResponse as AssetAttachResponse, type AssetAttachParams as AssetAttachParams };
}
