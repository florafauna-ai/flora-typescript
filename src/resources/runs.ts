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
   *
   * @example
   * ```ts
   * const response = await client.runs.startGeneration({
   *   project_id: 'prj_abc123',
   *   prompt:
   *     'A cinematic product photo of a ceramic mug on a sunlit table',
   *   type: 'image',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  startGeneration(
    body: RunStartGenerationParams,
    options?: RequestOptions,
  ): APIPromise<RunStartGenerationResponse> {
    return this._client.post('/runs/generation', { body, ...options });
  }

  /**
   * Starts a technique run through the normalized top-level run resource. Mutating
   * public API requests support an optional Idempotency-Key header for client
   * retries; duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.runs.startTechnique({
   *   inputs: { foo: 'bar' },
   *   technique_id: 'tech_abcd1234',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  startTechnique(
    body: RunStartTechniqueParams,
    options?: RequestOptions,
  ): APIPromise<RunStartTechniqueResponse> {
    return this._client.post('/runs/technique', { body, ...options });
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

  /**
   * Workflow run identifier
   */
  workflow_run_id: string;

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

  /**
   * Workflow run identifier
   */
  workflow_run_id: string;

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
  /**
   * Project identifier
   */
  project_id: string;

  /**
   * Generation prompt
   */
  prompt: string;

  /**
   * Generation type
   */
  type: 'image' | 'video' | 'audio' | 'text';

  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Model endpoint ID
   */
  model?: string;

  /**
   * Model parameters
   */
  params?: { [key: string]: unknown };
}

export interface RunStartTechniqueParams {
  /**
   * Technique inputs
   */
  inputs: { [key: string]: unknown };

  /**
   * Technique identifier
   */
  technique_id: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;
}

export declare namespace Runs {
  export {
    type RunStartGenerationResponse as RunStartGenerationResponse,
    type RunStartTechniqueResponse as RunStartTechniqueResponse,
    type RunStartGenerationParams as RunStartGenerationParams,
    type RunStartTechniqueParams as RunStartTechniqueParams,
  };
}
