// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import {
  PagePromise,
  TechniqueRunsCursorPage,
  type TechniqueRunsCursorPageParams,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Nested technique run endpoints.
 */
export class Runs extends APIResource {
  /**
   * Starts a run for a specific technique using the backward-compatible nested
   * route. Mutating public API requests support an optional Idempotency-Key header
   * for client retries; duplicate keys within two hours return
   * idempotency_duplicate.
   */
  create(
    techniqueID: string,
    body: RunCreateParams,
    options?: RequestOptions,
  ): APIPromise<RunCreateResponse> {
    return this._client.post(path`/techniques/${techniqueID}/runs`, { body, ...options });
  }

  /**
   * Returns status, progress, outputs, and error details for a technique run when it
   * is accessible to the authenticated public API key.
   */
  retrieve(
    runID: string,
    params: RunRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<RunRetrieveResponse> {
    const { techniqueId } = params;
    return this._client.get(path`/techniques/${techniqueId}/runs/${runID}`, options);
  }

  /**
   * Lists technique run history for the authenticated caller, including pending,
   * running, completed, and failed technique runs. Results are newest first and can
   * be filtered by workspace_id, project_id, technique_id, and status. Each item
   * includes poll_url; use it to poll pending/running technique runs and to fetch
   * completed or failed run details and outputs.
   */
  list(
    query: RunListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<RunListResponsesTechniqueRunsCursorPage, RunListResponse> {
    return this._client.getAPIList('/technique-runs', TechniqueRunsCursorPage<RunListResponse>, {
      query,
      ...options,
    });
  }
}

export type RunListResponsesTechniqueRunsCursorPage = TechniqueRunsCursorPage<RunListResponse>;

export interface RunCreateResponse {
  created_at: number;

  progress: number;

  /**
   * Run identifier
   */
  run_id: string;

  status: 'pending' | 'running' | 'completed' | 'failed';

  /**
   * Cost charged in USD
   */
  charged_cost?: number;

  completed_at?: number;

  /**
   * Machine-readable run error code
   */
  error_code?: string;

  /**
   * Human-readable run error message
   */
  error_message?: string;

  outputs?: Array<RunCreateResponse.Output>;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string;

  started_at?: number;
}

export namespace RunCreateResponse {
  export interface Output {
    /**
     * Run output identifier
     */
    output_id: string;

    /**
     * Run output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * Run output URL or text content
     */
    url: string;
  }
}

export interface RunRetrieveResponse {
  created_at: number;

  progress: number;

  /**
   * Run identifier
   */
  run_id: string;

  status: 'pending' | 'running' | 'completed' | 'failed';

  /**
   * Cost charged in USD
   */
  charged_cost?: number;

  completed_at?: number;

  /**
   * Machine-readable run error code
   */
  error_code?: string;

  /**
   * Human-readable run error message
   */
  error_message?: string;

  outputs?: Array<RunRetrieveResponse.Output>;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string;

  started_at?: number;
}

export namespace RunRetrieveResponse {
  export interface Output {
    /**
     * Run output identifier
     */
    output_id: string;

    /**
     * Run output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * Run output URL or text content
     */
    url: string;
  }
}

export interface RunListResponse {
  created_at: number;

  progress: number;

  /**
   * Project identifier
   */
  project_id: string;

  /**
   * Run identifier
   */
  run_id: string;

  status: 'pending' | 'running' | 'completed' | 'failed';

  technique: RunListResponse.Technique;

  /**
   * Run identifier
   */
  technique_run_id: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Cost charged in USD
   */
  charged_cost?: number;

  completed_at?: number;

  /**
   * Machine-readable run error code
   */
  error_code?: string;

  /**
   * Human-readable run error message
   */
  error_message?: string;

  outputs?: Array<RunListResponse.Output>;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string;

  started_at?: number;
}

export namespace RunListResponse {
  export interface Technique {
    /**
     * Technique name
     */
    name: string;

    /**
     * Technique identifier
     */
    technique_id: string;
  }

  export interface Output {
    /**
     * Run output identifier
     */
    output_id: string;

    /**
     * Run output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * Run output URL or text content
     */
    url: string;
  }
}

export interface RunCreateParams {
  /**
   * Technique inputs
   */
  inputs: Array<RunCreateParams.Input>;

  /**
   * Technique run execution mode
   */
  mode: 'async' | 'stream';

  /**
   * HTTPS callback URL for asynchronous run completion notifications
   */
  callback_url?: string;

  /**
   * Idempotency key for safely retrying requests
   */
  idempotency_key?: string;
}

export namespace RunCreateParams {
  export interface Input {
    /**
     * Technique input identifier
     */
    id: string;

    /**
     * Technique input type
     */
    type: 'text' | 'imageUrl' | 'videoUrl';

    /**
     * Technique input value
     */
    value: string;
  }
}

export interface RunRetrieveParams {
  /**
   * Technique identifier or slug
   */
  techniqueId: string;
}

export interface RunListParams extends TechniqueRunsCursorPageParams {
  /**
   * Project identifier
   */
  project_id?: string;

  /**
   * Run status filter
   */
  status?: 'pending' | 'running' | 'completed' | 'failed';

  /**
   * Technique identifier
   */
  technique_id?: string;

  /**
   * Workspace identifier
   */
  workspace_id?: string;
}

export declare namespace Runs {
  export {
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunListResponse as RunListResponse,
    type RunListResponsesTechniqueRunsCursorPage as RunListResponsesTechniqueRunsCursorPage,
    type RunCreateParams as RunCreateParams,
    type RunRetrieveParams as RunRetrieveParams,
    type RunListParams as RunListParams,
  };
}
