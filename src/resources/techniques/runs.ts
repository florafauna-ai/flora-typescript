// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Runs extends APIResource {
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
   * Starts a run for a specific technique using the backward-compatible nested
   * route. Mutating public API requests support an optional Idempotency-Key header
   * for client retries; duplicate keys within two hours return
   * idempotency_duplicate.
   */
  start(techniqueID: string, body: RunStartParams, options?: RequestOptions): APIPromise<RunStartResponse> {
    return this._client.post(path`/techniques/${techniqueID}/runs`, { body, ...options });
  }
}

export interface RunRetrieveResponse {
  createdAt: number;

  progress: number;

  /**
   * Run identifier
   */
  runId: string;

  status: 'pending' | 'running' | 'completed' | 'failed';

  chargedCost?: number;

  completedAt?: number;

  /**
   * Machine-readable run error code
   */
  errorCode?: string;

  /**
   * Human-readable run error message
   */
  errorMessage?: string;

  outputs?: Array<RunRetrieveResponse.Output>;

  pollUrl?: string;

  startedAt?: number;
}

export namespace RunRetrieveResponse {
  export interface Output {
    /**
     * Run output identifier
     */
    outputId: string;

    /**
     * Run output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * Run output URL
     */
    url: string;
  }
}

export interface RunStartResponse {
  createdAt: number;

  progress: number;

  /**
   * Run identifier
   */
  runId: string;

  status: 'pending' | 'running' | 'completed' | 'failed';

  chargedCost?: number;

  completedAt?: number;

  /**
   * Machine-readable run error code
   */
  errorCode?: string;

  /**
   * Human-readable run error message
   */
  errorMessage?: string;

  outputs?: Array<RunStartResponse.Output>;

  pollUrl?: string;

  startedAt?: number;
}

export namespace RunStartResponse {
  export interface Output {
    /**
     * Run output identifier
     */
    outputId: string;

    /**
     * Run output media type
     */
    type: 'imageUrl' | 'videoUrl' | 'audioUrl' | 'text' | 'documentUrl';

    /**
     * Run output URL
     */
    url: string;
  }
}

export interface RunRetrieveParams {
  /**
   * Technique identifier or slug
   */
  techniqueId: string;
}

export interface RunStartParams {
  inputs: Array<RunStartParams.Input>;

  mode: 'async' | 'stream';

  callback_url?: string;

  /**
   * Idempotency key for safely retrying requests
   */
  idempotency_key?: string;
}

export namespace RunStartParams {
  export interface Input {
    /**
     * Technique input identifier
     */
    id: string;

    /**
     * Technique input type
     */
    type: 'imageUrl' | 'videoUrl' | 'text';

    /**
     * Technique input value
     */
    value: string;
  }
}

export declare namespace Runs {
  export {
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunStartResponse as RunStartResponse,
    type RunRetrieveParams as RunRetrieveParams,
    type RunStartParams as RunStartParams,
  };
}
