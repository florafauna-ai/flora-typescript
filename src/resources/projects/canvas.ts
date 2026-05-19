// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Project management endpoints.
 */
export class Canvas extends APIResource {
  /**
   * Returns the current project canvas topology as a Mermaid flowchart using the
   * same serializer as the Fauna agent.
   *
   * @example
   * ```ts
   * const canvas = await client.projects.canvas.retrieve(
   *   'prj_abc123',
   * );
   * ```
   */
  retrieve(projectID: string, options?: RequestOptions): APIPromise<CanvasRetrieveResponse> {
    return this._client.get(path`/projects/${projectID}/canvas`, options);
  }

  /**
   * Applies a Mermaid flowchart patch to the project canvas using the same
   * create_workflow path as the Fauna agent. The diagram may add nodes, connect
   * nodes, and reference existing canvas nodes by their Mermaid short IDs.
   *
   * @example
   * ```ts
   * const canvas = await client.projects.canvas.update(
   *   'prj_abc123',
   *   {
   *     diagram:
   *       'graph LR\n  source["Product photo (Image)"]\n  output["Editorial campaign image (Image)"]\n  source --> output',
   *   },
   * );
   * ```
   */
  update(
    projectID: string,
    body: CanvasUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CanvasUpdateResponse> {
    return this._client.patch(path`/projects/${projectID}/canvas`, { body, ...options });
  }
}

export interface CanvasRetrieveResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  /**
   * Mermaid flowchart diagram
   */
  diagram: string;

  /**
   * Project identifier
   */
  project_id: string;

  summary: CanvasRetrieveResponse.Summary;
}

export namespace CanvasRetrieveResponse {
  export interface Summary {
    edge_count: number;

    group_count: number;

    isolated_node_count: number;

    node_count: number;

    workflow_count: number;
  }
}

export interface CanvasUpdateResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  created_edge_count: number;

  created_node_count: number;

  /**
   * Applied Mermaid flowchart diagram
   */
  diagram: string;

  /**
   * Project identifier
   */
  project_id: string;

  warnings?: Array<string>;
}

export interface CanvasUpdateParams {
  /**
   * Mermaid flowchart diagram to apply
   */
  diagram: string;

  /**
   * Optional per-node parameters keyed by Mermaid node ID.
   */
  node_params?: { [key: string]: CanvasUpdateParams.NodeParams };
}

export namespace CanvasUpdateParams {
  export interface NodeParams {
    aspect_ratio?: string | null;

    content_url?: string | null;

    model?: string | null;

    model_parameters?: { [key: string]: unknown } | null;

    prompt?: string | null;

    resolution?: string | null;
  }
}

export declare namespace Canvas {
  export {
    type CanvasRetrieveResponse as CanvasRetrieveResponse,
    type CanvasUpdateResponse as CanvasUpdateResponse,
    type CanvasUpdateParams as CanvasUpdateParams,
  };
}
