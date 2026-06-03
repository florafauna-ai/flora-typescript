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
   * nodes, and reference existing canvas nodes by their Mermaid short IDs in edges
   * (e.g. `n1 --> out`). This endpoint is add-only: re-declaring an existing node id
   * with a label (e.g. `n3["..."]`) creates a NEW node instead of updating the
   * existing one, and returns a warning. To attach to an existing node, reference
   * its id in an edge without re-declaring its label. Subgraph grouping is not
   * applied (nodes inside a `subgraph` are added ungrouped) and returns a warning.
   * To place an existing image/video/audio as a static node, set `node_params` —
   * which is keyed by Mermaid node id, e.g.
   * `{ "img1": { "content_url": "https://…" } }`, NOT a bare `{ content_url }`
   * object. `prompt` and `content_url` are mutually exclusive for a node: use
   * `prompt` (or a label that doubles as the prompt) for generation, or
   * `content_url` for existing media. When using `content_url`, give the node a
   * content-free type-only label such as `img1["(Image)"]` so no prompt is inferred
   * from the label.
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
   * Optional per-node parameters, keyed by Mermaid node id (a Record<nodeId,
   * NodeParams>), e.g. { "img1": { "content_url": "https://…" } }. Pass a map keyed
   * by node id, NOT a bare { content_url } object.
   */
  node_params?: { [key: string]: CanvasUpdateParams.NodeParams };
}

export namespace CanvasUpdateParams {
  export interface NodeParams {
    aspect_ratio?: string | null;

    /**
     * HTTPS URL of existing media to place as a static node. Mutually exclusive with
     * prompt: give the node a content-free type-only label such as `(Image)` so no
     * prompt is inferred from the label. Only supported for Image, Video, and Audio
     * nodes.
     */
    content_url?: string | null;

    model?: string | null;

    model_parameters?: { [key: string]: unknown } | null;

    /**
     * Generation prompt for this node. Mutually exclusive with content_url. If
     * omitted, the node's Mermaid label is used as the prompt.
     */
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
