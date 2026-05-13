// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Runs extends APIResource {
  /**
   * Starts a model generation run in a project canvas using a prompt, workspace,
   * project, optional model, and optional model parameters. Mutating public API
   * requests support an optional Idempotency-Key header for client retries;
   * duplicate keys within two hours return idempotency_duplicate.
   */
  startGeneration(
    params: RunStartGenerationParams,
    options?: RequestOptions,
  ): APIPromise<RunStartGenerationResponse> {
    const { body } = params;
    return this._client.post('/runs/generation', { body: body, ...options });
  }

  /**
   * Starts a technique run through the normalized top-level run resource. Mutating
   * public API requests support an optional Idempotency-Key header for client
   * retries; duplicate keys within two hours return idempotency_duplicate.
   */
  startTechnique(
    params: RunStartTechniqueParams,
    options?: RequestOptions,
  ): APIPromise<RunStartTechniqueResponse> {
    const { body } = params;
    return this._client.post('/runs/technique', { body: body, ...options });
  }
}

export interface RunStartGenerationResponse {
  charged_cost: number;

  estimated_seconds: number | null;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Run type
   */
  type: 'generation' | 'technique';

  model?: RunStartGenerationResponse.Model | null;

  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: RunStartGenerationResponse.Technique | null;
}

export namespace RunStartGenerationResponse {
  export interface Model {
    /**
     * Model identifier
     */
    model_id: string;
  }

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
}

export interface RunStartTechniqueResponse {
  charged_cost: number;

  estimated_seconds: number | null;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Run type
   */
  type: 'generation' | 'technique';

  model?: RunStartTechniqueResponse.Model | null;

  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: RunStartTechniqueResponse.Technique | null;
}

export namespace RunStartTechniqueResponse {
  export interface Model {
    /**
     * Model identifier
     */
    model_id: string;
  }

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
}

export interface RunStartGenerationParams {
  body: unknown;
}

export interface RunStartTechniqueParams {
  body: unknown;
}

export declare namespace Runs {
  export {
    type RunStartGenerationResponse as RunStartGenerationResponse,
    type RunStartTechniqueResponse as RunStartTechniqueResponse,
    type RunStartGenerationParams as RunStartGenerationParams,
    type RunStartTechniqueParams as RunStartTechniqueParams,
  };
}
