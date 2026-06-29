// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { GenerationsCursorPage, type GenerationsCursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Generations extends APIResource {
  /**
   * Starts a model generation using type, prompt, workspace_id, project_id, optional
   * model endpoint ID, and optional model parameters. Use
   * type=image|video|audio|text and model IDs returned by GET /models or
   * list_models. Poll the returned run_id via GET /runs/{runId} for progress and
   * outputs. Mutating public API requests support an optional Idempotency-Key header
   * for client retries; duplicate keys within two hours return
   * idempotency_duplicate.
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

  /**
   * Returns status and completed output URLs for a public API run, including action
   * runs started through POST /runs/action.
   *
   * @example
   * ```ts
   * const generation = await client.generations.retrieve(
   *   'run_abc123',
   * );
   * ```
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<GenerationRetrieveResponse> {
    return this._client.get(path`/runs/${runID}`, options);
  }

  /**
   * Lists generation history for the authenticated caller, including pending,
   * running, completed, and failed generations. Results are newest first and can be
   * filtered by workspace_id, project_id, and status. Each item includes poll_url;
   * use it to poll pending/running generations and to fetch completed or failed run
   * details and outputs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const generationListResponse of client.generations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: GenerationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<GenerationListResponsesGenerationsCursorPage, GenerationListResponse> {
    return this._client.getAPIList('/generations', GenerationsCursorPage<GenerationListResponse>, {
      query,
      ...options,
    });
  }
}

export type GenerationListResponsesGenerationsCursorPage = GenerationsCursorPage<GenerationListResponse>;

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

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
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
      | 'ken-burns-video'
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

export interface GenerationRetrieveResponse {
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

  outputs?: Array<GenerationRetrieveResponse.Output>;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string;

  started_at?: number;
}

export namespace GenerationRetrieveResponse {
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

export interface GenerationListResponse {
  created_at: number;

  /**
   * Run identifier
   */
  generation_id: string;

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

  model?: GenerationListResponse.Model;

  outputs?: Array<GenerationListResponse.Output>;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string;

  started_at?: number;
}

export namespace GenerationListResponse {
  export interface Model {
    /**
     * Model identifier
     */
    model_id: string | null;
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

export interface GenerationCreateParams {
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

export interface GenerationListParams extends GenerationsCursorPageParams {
  /**
   * Project identifier
   */
  project_id?: string;

  /**
   * Run status filter
   */
  status?: 'pending' | 'running' | 'completed' | 'failed';

  /**
   * Workspace identifier
   */
  workspace_id?: string;
}

export declare namespace Generations {
  export {
    type GenerationCreateResponse as GenerationCreateResponse,
    type GenerationRetrieveResponse as GenerationRetrieveResponse,
    type GenerationListResponse as GenerationListResponse,
    type GenerationListResponsesGenerationsCursorPage as GenerationListResponsesGenerationsCursorPage,
    type GenerationCreateParams as GenerationCreateParams,
    type GenerationListParams as GenerationListParams,
  };
}
