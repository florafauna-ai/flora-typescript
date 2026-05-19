// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Generation endpoints.
 */
export class Generations extends APIResource {
  /**
   * Starts a model generation using a prompt, workspace, project, optional model,
   * and optional model parameters. Poll the returned run_id via GET /runs/{runId}
   * for progress and outputs. Mutating public API requests support an optional
   * Idempotency-Key header for client retries; duplicate keys within two hours
   * return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const generation = await client.generations.create({
   *   project_id: 'prj_abc123',
   *   prompt:
   *     'A cinematic product photo of a ceramic mug on a sunlit table',
   *   type: 'image',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  create(body: GenerationCreateParams, options?: RequestOptions): APIPromise<GenerationCreateResponse> {
    return this._client.post('/generate', { body, ...options });
  }
}

export interface GenerationCreateResponse {
  /**
   * Cost charged in USD
   */
  charged_cost: number;

  estimated_seconds: number | null;

  /**
   * Run identifier
   */
  run_id: string;

  /**
   * Run type
   */
  type: 'generation' | 'technique' | 'action';

  action?: GenerationCreateResponse.Action | null;

  model?: GenerationCreateResponse.Model | null;

  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: GenerationCreateResponse.Technique | null;
}

export namespace GenerationCreateResponse {
  export interface Action {
    /**
     * Action identifier
     */
    action_id:
      | 'split-text'
      | 'find-and-replace-text'
      | 'concat-text'
      | 'ken-burns-video'
      | 'color-grade-image'
      | 'change-image-ar'
      | 'rotate-image'
      | 'flip-image'
      | 'color-filter-image'
      | 'color-tint-image'
      | 'filter-color-image'
      | 'blur-image'
      | 'duplicate-image'
      | 'side-by-side-composite'
      | 'add-shape-to-image'
      | 'generate-shape-image'
      | 'add-text-to-image'
      | 'generate-text-image'
      | 'qr-code-generator'
      | 'stitch-videos'
      | 'split-video'
      | 'extract-video-frames'
      | 'color-grade-video'
      | 'video-to-frame-grid'
      | 'boomerang-video'
      | 'reverse-video'
      | 'video-to-long-exposure'
      | 'video-effect'
      | 'color-filter-video'
      | 'speed-up-video'
      | 'slow-down-video'
      | 'duplicate-video'
      | 'greenscreen-video'
      | 'resize-video'
      | 'change-video-ar'
      | 'split-audio-from-video'
      | 'merge-audio-into-video';
  }

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

export interface GenerationCreateParams {
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

export declare namespace Generations {
  export {
    type GenerationCreateResponse as GenerationCreateResponse,
    type GenerationCreateParams as GenerationCreateParams,
  };
}
