// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Project canvas endpoints.
 */
export class Actions extends APIResource {
  /**
   * Creates a prebuilt action node on a project canvas using a raw action slug.
   *
   * @example
   * ```ts
   * const action = await client.projects.actions.create(
   *   'prj_abc123',
   *   { action_id: 'color-grade-image-browser' },
   * );
   * ```
   */
  create(
    projectID: string,
    body: ActionCreateParams,
    options?: RequestOptions,
  ): APIPromise<ActionCreateResponse> {
    return this._client.post(path`/projects/${projectID}/actions`, { body, ...options });
  }

  /**
   * Runs an existing canvas action node through the action execution workflow.
   *
   * @example
   * ```ts
   * const response = await client.projects.actions.run(
   *   'nodeId',
   *   { projectId: 'prj_abc123' },
   * );
   * ```
   */
  run(nodeID: string, params: ActionRunParams, options?: RequestOptions): APIPromise<ActionRunResponse> {
    const { projectId } = params;
    return this._client.post(path`/projects/${projectId}/actions/${nodeID}/run`, options);
  }
}

export interface ActionCreateResponse {
  /**
   * Action identifier
   */
  action_id:
    | 'color-grade-image-browser'
    | 'overlay-image-browser'
    | 'draw-image-browser'
    | 'crop-image-browser'
    | 'scene-3d-image-browser'
    | 'blur-image-browser'
    | 'change-image-ar-browser'
    | 'rotate-image-browser'
    | 'color-filter-image-browser'
    | 'color-tint-image-browser'
    | 'filter-color-image-browser'
    | 'duplicate-image-browser'
    | 'side-by-side-composite-browser'
    | 'add-shape-to-image-browser'
    | 'add-text-to-image-browser'
    | 'qr-code-generator-browser'
    | 'resize-image-browser'
    | 'shader-effect-browser'
    | 'split-text-browser'
    | 'find-and-replace-text-browser'
    | 'concat-text-browser'
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

  /**
   * Project canvas URL
   */
  canvas_url: string;

  /**
   * Canvas action node identifier
   */
  node_id: string;

  /**
   * Project identifier
   */
  project_id: string;
}

export interface ActionRunResponse {
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

  action?: ActionRunResponse.Action | null;

  model?: ActionRunResponse.Model | null;

  /**
   * URL to poll pending/running runs or fetch completed/failed run details.
   */
  poll_url?: string | null;

  /**
   * Project identifier
   */
  project_id?: string | null;

  technique?: ActionRunResponse.Technique | null;
}

export namespace ActionRunResponse {
  export interface Action {
    /**
     * Action identifier
     */
    action_id:
      | 'color-grade-image-browser'
      | 'overlay-image-browser'
      | 'draw-image-browser'
      | 'crop-image-browser'
      | 'scene-3d-image-browser'
      | 'blur-image-browser'
      | 'change-image-ar-browser'
      | 'rotate-image-browser'
      | 'color-filter-image-browser'
      | 'color-tint-image-browser'
      | 'filter-color-image-browser'
      | 'duplicate-image-browser'
      | 'side-by-side-composite-browser'
      | 'add-shape-to-image-browser'
      | 'add-text-to-image-browser'
      | 'qr-code-generator-browser'
      | 'resize-image-browser'
      | 'shader-effect-browser'
      | 'split-text-browser'
      | 'find-and-replace-text-browser'
      | 'concat-text-browser'
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

export interface ActionCreateParams {
  /**
   * Action identifier
   */
  action_id:
    | 'color-grade-image-browser'
    | 'overlay-image-browser'
    | 'draw-image-browser'
    | 'crop-image-browser'
    | 'scene-3d-image-browser'
    | 'blur-image-browser'
    | 'change-image-ar-browser'
    | 'rotate-image-browser'
    | 'color-filter-image-browser'
    | 'color-tint-image-browser'
    | 'filter-color-image-browser'
    | 'duplicate-image-browser'
    | 'side-by-side-composite-browser'
    | 'add-shape-to-image-browser'
    | 'add-text-to-image-browser'
    | 'qr-code-generator-browser'
    | 'resize-image-browser'
    | 'shader-effect-browser'
    | 'split-text-browser'
    | 'find-and-replace-text-browser'
    | 'concat-text-browser'
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

  /**
   * Action parameters (snake_case keys). The accepted keys depend on action_id; see
   * GET /actions/{actionId} or POST /runs/action for the per-action schema.
   */
  params?: { [key: string]: unknown };
}

export interface ActionRunParams {
  /**
   * Project identifier
   */
  projectId: string;
}

export declare namespace Actions {
  export {
    type ActionCreateResponse as ActionCreateResponse,
    type ActionRunResponse as ActionRunResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionRunParams as ActionRunParams,
  };
}
