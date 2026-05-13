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
     * Supported generation parameters for this model
     */
    params: Array<Model.Param>;

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

  export namespace Model {
    export interface Param {
      /**
       * Parameter name to pass in generation params
       */
      name: string;

      /**
       * Whether the model requires this parameter
       */
      required: boolean;

      /**
       * Parameter value type
       */
      type: 'string' | 'string[]' | 'bool' | 'int' | 'int?' | 'seed' | 'float' | 'dict';

      /**
       * Default parameter value
       */
      default?: unknown;

      /**
       * Parameter help text
       */
      description?: string;

      /**
       * Human-readable parameter label
       */
      label?: string;

      /**
       * Maximum numeric value
       */
      max?: number;

      /**
       * Minimum numeric value
       */
      min?: number;

      /**
       * Allowed values for enum-like parameters
       */
      options?: Array<Param.Option>;

      /**
       * Nested numeric properties for object parameters
       */
      properties?: { [key: string]: Param.Properties };
    }

    export namespace Param {
      export interface Option {
        /**
         * Displayed option label
         */
        label: string;

        /**
         * Option value to pass in generation params
         */
        value: string;

        /**
         * Option description
         */
        description?: string;
      }

      export interface Properties {
        default: number;

        max: number;

        min: number;
      }
    }
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
