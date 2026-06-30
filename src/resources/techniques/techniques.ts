// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import {
  RunCreateParams,
  RunCreateResponse,
  RunListParams,
  RunListResponse,
  RunListResponsesTechniqueRunsCursorPage,
  RunRetrieveParams,
  RunRetrieveResponse,
  Runs,
} from './runs';
import { APIPromise } from '../../core/api-promise';
import { PagePromise, TechniquesCursorPage, type TechniquesCursorPageParams } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Technique catalog endpoints.
 */
export class Techniques extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Returns the public definition for one technique, including its input and output
   * schema used to start runs.
   */
  retrieve(techniqueID: string, options?: RequestOptions): APIPromise<TechniqueRetrieveResponse> {
    return this._client.get(path`/techniques/${techniqueID}`, options);
  }

  /**
   * Returns reusable Flora techniques visible to the authenticated public API key.
   * Use workspace_id, query, cursor, and limit to filter the catalog.
   */
  list(
    query: TechniqueListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TechniqueListResponsesTechniquesCursorPage, TechniqueListResponse> {
    return this._client.getAPIList('/techniques', TechniquesCursorPage<TechniqueListResponse>, {
      query,
      ...options,
    });
  }
}

export type TechniqueListResponsesTechniquesCursorPage = TechniquesCursorPage<TechniqueListResponse>;

export interface TechniqueRetrieveResponse {
  inputs: Array<TechniqueRetrieveResponse.Input>;

  /**
   * Technique name
   */
  name: string;

  outputs: Array<TechniqueRetrieveResponse.Output>;

  /**
   * Cost per run in USD
   */
  run_cost: number;

  /**
   * Technique identifier
   */
  technique_id: string;

  /**
   * Technique description
   */
  description?: string;
}

export namespace TechniqueRetrieveResponse {
  export interface Input {
    /**
     * Technique input or output identifier
     */
    id: string;

    /**
     * Technique input or output display name
     */
    name: string;

    /**
     * Technique input or output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * When true, fill this input by passing an element id as the input value
     */
    accepts_element?: boolean;

    /**
     * Technique input or output description
     */
    description?: string;

    /**
     * When true, this input may be omitted when running the technique
     */
    optional?: boolean;

    /**
     * Required aspect ratio
     */
    specified_aspect_ratio?: string;

    /**
     * Required duration in seconds
     */
    specified_duration?: number;
  }

  export interface Output {
    /**
     * Technique input or output identifier
     */
    id: string;

    /**
     * Technique input or output display name
     */
    name: string;

    /**
     * Technique input or output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * When true, fill this input by passing an element id as the input value
     */
    accepts_element?: boolean;

    /**
     * Technique input or output description
     */
    description?: string;

    /**
     * When true, this input may be omitted when running the technique
     */
    optional?: boolean;

    /**
     * Required aspect ratio
     */
    specified_aspect_ratio?: string;

    /**
     * Required duration in seconds
     */
    specified_duration?: number;
  }
}

export interface TechniqueListResponse {
  inputs: Array<TechniqueListResponse.Input>;

  /**
   * Technique name
   */
  name: string;

  outputs: Array<TechniqueListResponse.Output>;

  /**
   * Cost per run in USD
   */
  run_cost: number;

  /**
   * Technique identifier
   */
  technique_id: string;

  /**
   * Technique description
   */
  description?: string;
}

export namespace TechniqueListResponse {
  export interface Input {
    /**
     * Technique input or output identifier
     */
    id: string;

    /**
     * Technique input or output display name
     */
    name: string;

    /**
     * Technique input or output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * When true, fill this input by passing an element id as the input value
     */
    accepts_element?: boolean;

    /**
     * Technique input or output description
     */
    description?: string;

    /**
     * When true, this input may be omitted when running the technique
     */
    optional?: boolean;

    /**
     * Required aspect ratio
     */
    specified_aspect_ratio?: string;

    /**
     * Required duration in seconds
     */
    specified_duration?: number;
  }

  export interface Output {
    /**
     * Technique input or output identifier
     */
    id: string;

    /**
     * Technique input or output display name
     */
    name: string;

    /**
     * Technique input or output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * When true, fill this input by passing an element id as the input value
     */
    accepts_element?: boolean;

    /**
     * Technique input or output description
     */
    description?: string;

    /**
     * When true, this input may be omitted when running the technique
     */
    optional?: boolean;

    /**
     * Required aspect ratio
     */
    specified_aspect_ratio?: string;

    /**
     * Required duration in seconds
     */
    specified_duration?: number;
  }
}

export interface TechniqueListParams extends TechniquesCursorPageParams {
  /**
   * Search query
   */
  query?: string;

  /**
   * Workspace identifier
   */
  workspace_id?: string;
}

Techniques.Runs = Runs;

export declare namespace Techniques {
  export {
    type TechniqueRetrieveResponse as TechniqueRetrieveResponse,
    type TechniqueListResponse as TechniqueListResponse,
    type TechniqueListResponsesTechniquesCursorPage as TechniqueListResponsesTechniquesCursorPage,
    type TechniqueListParams as TechniqueListParams,
  };

  export {
    Runs as Runs,
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunListResponse as RunListResponse,
    type RunListResponsesTechniqueRunsCursorPage as RunListResponsesTechniqueRunsCursorPage,
    type RunCreateParams as RunCreateParams,
    type RunListParams as RunListParams,
    type RunRetrieveParams as RunRetrieveParams,
  };
}
