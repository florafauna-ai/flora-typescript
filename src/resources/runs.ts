// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Top-level run creation endpoints.
 */
export class Runs extends APIResource {
  /**
   * Starts a model generation run in a project canvas using type, prompt,
   * workspace_id, project_id, optional model endpoint ID, and optional model
   * parameters. Use type=image|video|audio|text and model IDs returned by GET
   * /models or list_models. Mutating public API requests support an optional
   * Idempotency-Key header for client retries; duplicate keys within two hours
   * return idempotency_duplicate.
   *
   * @deprecated
   */
  startGeneration(
    body: RunStartGenerationParams,
    options?: RequestOptions,
  ): APIPromise<RunStartGenerationResponse> {
    return this._client.post('/runs/generation', { body, ...options });
  }

  /**
   * Starts a technique run through the normalized top-level run resource using
   * technique*id, workspace_id, and inputs. technique_id must use the tech* public
   * API ID returned by list techniques. Mutating public API requests support an
   * optional Idempotency-Key header for client retries; duplicate keys within two
   * hours return idempotency_duplicate.
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

  action?: RunStartGenerationResponse.Action | null;

  model?: RunStartGenerationResponse.Model | null;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: RunStartGenerationResponse.Technique | null;
}

export namespace RunStartGenerationResponse {
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

export interface RunStartTechniqueResponse {
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

  action?: RunStartTechniqueResponse.Action | null;

  model?: RunStartTechniqueResponse.Model | null;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: RunStartTechniqueResponse.Technique | null;
}

export namespace RunStartTechniqueResponse {
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

export interface RunStartGenerationParams {
  /**
   * Project identifier. Use the public API ID returned by list projects; it must
   * start with prj\_.
   */
  project_id: string;

  /**
   * Generation prompt
   */
  prompt: string;

  /**
   * Generation type. Use "image", "video", "audio", or "text"; do not pass model
   * families such as "t2i" or "i2v".
   */
  type: 'image' | 'video' | 'audio' | 'text';

  /**
   * Workspace identifier. Use the public API ID returned by list workspaces; it must
   * start with ws\_.
   */
  workspace_id: string;

  /**
   * Model endpoint ID, not a display name. Use list_models (or GET /models) to find
   * accessible endpoint IDs for the requested type.
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
   * Technique identifier. Use the public API ID returned by list techniques; it must
   * start with tech\_.
   */
  technique_id: string;

  /**
   * Workspace identifier. Use the public API ID returned by list workspaces; it must
   * start with ws\_.
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
