// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

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
}

export interface RunCreateResponse {
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

  outputs?: Array<RunCreateResponse.Output>;

  pollUrl?: string;

  startedAt?: number;
}

export namespace RunCreateResponse {
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

export interface RunCreateParams {
  inputs: Array<RunCreateParams.Input>;

  mode: 'async' | 'stream';

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
    type: 'imageUrl' | 'videoUrl' | 'text';

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

export declare namespace Runs {
  export {
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunCreateParams as RunCreateParams,
    type RunRetrieveParams as RunRetrieveParams,
  };
}
