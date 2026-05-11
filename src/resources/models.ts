// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Models extends APIResource {
  /**
   * Returns the public model catalog visible to API clients. Use the optional type
   * filter to narrow results to image, video, audio, or text models.
   */
  list(
    query: ModelListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ModelListResponse> {
    return this._client.get('/models', { query, ...options });
  }
}

export interface ModelListResponse {
  models: Array<ModelListResponse.Model>;
}

export namespace ModelListResponse {
  export interface Model {
    capabilities: Array<string>;

    /**
     * Estimated credits
     */
    estimated_credits: number;

    /**
     * Estimated seconds
     */
    estimated_seconds: number;

    /**
     * Model identifier
     */
    model_id: string;

    /**
     * Model name
     */
    name: string;

    /**
     * Model provider
     */
    provider: string;

    /**
     * Model type
     */
    type: 'image' | 'video' | 'audio' | 'text';

    beta?: boolean;
  }
}

export interface ModelListParams {
  /**
   * Model type
   */
  type?: 'image' | 'video' | 'audio' | 'text';
}

export declare namespace Models {
  export { type ModelListResponse as ModelListResponse, type ModelListParams as ModelListParams };
}
