// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RunsAPI from './runs';
import { RunRetrieveParams, RunRetrieveResponse, RunStartParams, RunStartResponse, Runs } from './runs';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
  ): APIPromise<TechniqueListResponse> {
    return this._client.get('/techniques', { query, ...options });
  }
}

export interface TechniqueRetrieveResponse {
  inputs: Array<TechniqueRetrieveResponse.Input>;

  /**
   * Technique name
   */
  name: string;

  outputs: Array<TechniqueRetrieveResponse.Output>;

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
     * Technique input or output description
     */
    description?: string;

    /**
     * Required aspect ratio
     */
    specifiedAspectRatio?: string;

    /**
     * Required duration in seconds
     */
    specifiedDuration?: number;
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
     * Technique input or output description
     */
    description?: string;

    /**
     * Required aspect ratio
     */
    specifiedAspectRatio?: string;

    /**
     * Required duration in seconds
     */
    specifiedDuration?: number;
  }
}

export interface TechniqueListResponse {
  meta: TechniqueListResponse.Meta;

  techniques: Array<TechniqueListResponse.Technique>;
}

export namespace TechniqueListResponse {
  export interface Meta {
    /**
     * Opaque cursor for fetching the next page
     */
    next_cursor: string | null;

    /**
     * Estimated total matching items
     */
    total_estimate?: number | null;
  }

  export interface Technique {
    inputs: Array<Technique.Input>;

    /**
     * Technique name
     */
    name: string;

    outputs: Array<Technique.Output>;

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

  export namespace Technique {
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
       * Technique input or output description
       */
      description?: string;

      /**
       * Required aspect ratio
       */
      specifiedAspectRatio?: string;

      /**
       * Required duration in seconds
       */
      specifiedDuration?: number;
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
       * Technique input or output description
       */
      description?: string;

      /**
       * Required aspect ratio
       */
      specifiedAspectRatio?: string;

      /**
       * Required duration in seconds
       */
      specifiedDuration?: number;
    }
  }
}

export interface TechniqueListParams {
  /**
   * Opaque cursor for fetching the next page
   */
  cursor?: string;

  /**
   * Maximum number of results to return
   */
  limit?: number;

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
    type TechniqueListParams as TechniqueListParams,
  };

  export {
    Runs as Runs,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunStartResponse as RunStartResponse,
    type RunRetrieveParams as RunRetrieveParams,
    type RunStartParams as RunStartParams,
  };
}
