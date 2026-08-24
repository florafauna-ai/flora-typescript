// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CanvasAPI from './canvas';
import {
  Canvas,
  CanvasApplyChangesetParams,
  CanvasApplyChangesetResponse,
  CanvasReplaceDefinitionParams,
  CanvasReplaceDefinitionResponse,
  CanvasRetrieveDefinitionParams,
  CanvasRetrieveDefinitionResponse,
} from './canvas';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Projects extends APIResource {
  canvas: CanvasAPI.Canvas = new CanvasAPI.Canvas(this._client);

  /**
   * Creates a new Flora project in the workspace named in the path. Prefer this over
   * `POST /projects` when a credential can reach more than one workspace: the
   * destination is explicit rather than carried in the body. To file the project
   * into a project folder, use the folder route below. Mutating public API requests
   * support an optional Idempotency-Key header for client retries; duplicate keys
   * within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const project = await client.workspaces.projects.create(
   *   'ws_abc123',
   *   { name: 'Spring Campaign' },
   * );
   * ```
   */
  create(
    workspaceID: string,
    body: ProjectCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProjectCreateResponse> {
    return this._client.post(path`/workspaces/${workspaceID}/projects`, { body, ...options });
  }

  /**
   * Returns the full state of a project canvas: every node's short id, node UUID,
   * type, label, prompt, model, parameters, absolute position, generation status and
   * current output, plus the edges between them and a revision marker. This is the
   * lossless counterpart of the Mermaid canvas rendering, which collapses node types
   * and truncates labels. Short ids are persisted as part of the read, so the id
   * reported for a node is the same on every subsequent read and is the id canvas
   * write operations accept. The revision is opaque: an identical value means
   * nothing this endpoint reports has changed, a different value means something
   * has, and no ordering can be inferred from two values.
   *
   * @example
   * ```ts
   * const response = await client.workspaces.projects.graph(
   *   'prj_abc123',
   *   { workspaceId: 'ws_abc123' },
   * );
   * ```
   */
  graph(
    projectID: string,
    params: ProjectGraphParams,
    options?: RequestOptions,
  ): APIPromise<ProjectGraphResponse> {
    const { workspaceId } = params;
    return this._client.get(path`/workspaces/${workspaceId}/projects/${projectID}/graph`, options);
  }

  /**
   * Runs generation nodes that already exist on a project canvas. Each node runs
   * with the model, prompt, parameters and wired upstream inputs it already carries
   * — this endpoint supplies nothing but ids, so configure a node with a canvas
   * changeset first. THESE RUNS SPEND THE WORKSPACE'S CREDITS IMMEDIATELY: there is
   * no confirmation step and no dry run, and the charge lands whether or not you
   * poll the result. Nodes are addressed by the short id or node UUID the project
   * graph endpoint reports, and each entry echoes the identifier you sent. The
   * response returns as soon as every run has an id — it never waits for the
   * generations, which continue in the background — so poll each run_id for status
   * and output. Nodes requested in one call run in dependency order: connected nodes
   * run children before parents, so a chain can be started in a single request, and
   * independent nodes run in parallel. A node that cannot run is reported as its own
   * skipped entry with a machine-readable reason and never fails the rest of the
   * batch; only an empty or oversized node_ids list, a project that does not exist
   * in the workspace, or denied write access fail the whole request. Credits are not
   * checked up front: insufficient credits surface on the individual run, not on
   * this request. Known limits compared with running a node in the Flora editor:
   * automatic model routing covers image nodes only, an element node with several
   * assets counts as one input, and collections, batch fan-out, per-run parameter
   * overrides and multi-model selections are not supported. Mutating public API
   * requests support an optional Idempotency-Key header for client retries;
   * duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response = await client.workspaces.projects.runNodes(
   *   'prj_abc123',
   *   { workspaceId: 'ws_abc123', node_ids: ['n3'] },
   * );
   * ```
   */
  runNodes(
    projectID: string,
    params: ProjectRunNodesParams,
    options?: RequestOptions,
  ): APIPromise<ProjectRunNodesResponse> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/workspaces/${workspaceId}/projects/${projectID}/nodes/run`, {
      body,
      ...options,
    });
  }
}

export interface ProjectCreateResponse {
  created_at: number;

  last_modified: number | null;

  /**
   * Project name
   */
  name: string;

  /**
   * Project origin
   */
  origin: string | null;

  /**
   * Project identifier
   */
  project_id: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;
}

export interface ProjectGraphResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  /**
   * Complete canvas edge list
   */
  edges: Array<ProjectGraphResponse.Edge>;

  /**
   * Complete canvas node list
   */
  nodes: Array<ProjectGraphResponse.Node>;

  /**
   * Project identifier
   */
  project_id: string;

  /**
   * Opaque change-detection marker for the reported graph. An identical value means
   * nothing this endpoint reports has changed; a different value means something
   * has. It is not a counter, so no ordering can be inferred from two values.
   */
  revision: string;
}

export namespace ProjectGraphResponse {
  export interface Edge {
    /**
     * Short identifier of the source node
     */
    from: string;

    /**
     * Input slot the edge lands in on the target node, for example "image" or
     * "enabled". Null when the edge names no slot.
     */
    in: string | null;

    /**
     * Short identifier of the target node
     */
    to: string;
  }

  export interface Node {
    /**
     * Short node identifier. Stable across reads and the vocabulary canvas edges use.
     */
    id: string;

    /**
     * Action-node configuration. Null for every node type other than action.
     */
    action: Node.Action | null;

    /**
     * Node display label
     */
    label: string;

    /**
     * Configured model name, or null when the node generates nothing
     */
    model: string | null;

    /**
     * Configured model endpoint identifier. Preferred over model because it survives
     * catalog renames.
     */
    model_id: string | null;

    /**
     * Canvas node UUID. Stable for the node's life.
     */
    node_id: string;

    /**
     * The node's current text output, or null when it has none
     */
    output_text: string | null;

    /**
     * URL of the node's current media output, or null when it has none or its output
     * is not externally addressable
     */
    output_url: string | null;

    /**
     * Configured model parameters excluding prompt, which is reported separately. Null
     * when the node sets none.
     */
    params: { [key: string]: unknown } | null;

    /**
     * Absolute canvas position with parent groups resolved
     */
    position: Node.Position;

    /**
     * Configured generation prompt, or null when the node has none
     */
    prompt: string | null;

    /**
     * Derived generation status. Null for node types that carry no generation
     * lifecycle, such as groups, comments, batches, routers, switches, exports, and
     * labels.
     */
    status: 'idle' | 'generating' | 'done' | 'error' | null;

    /**
     * Node type in agent vocabulary, for example image, video, text, action, batch, or
     * group
     */
    type: string;

    /**
     * Machine-readable failure code. Present only when status is error.
     */
    error_code?: string;

    /**
     * User-facing failure message. Present only when status is error.
     */
    error_message?: string;
  }

  export namespace Node {
    /**
     * Action-node configuration. Null for every node type other than action.
     */
    export interface Action {
      /**
       * Prebuilt action slug the node runs, for example rotate-image. Null when the node
       * runs custom code.
       */
      action_id: string | null;

      /**
       * Configured action parameter values, keyed by the snake_case parameter ids the
       * actions endpoints expose. Null when none are set.
       */
      params: { [key: string]: unknown } | null;
    }

    /**
     * Absolute canvas position with parent groups resolved
     */
    export interface Position {
      /**
       * Horizontal canvas coordinate
       */
      x: number;

      /**
       * Vertical canvas coordinate
       */
      y: number;
    }
  }
}

export interface ProjectRunNodesResponse {
  /**
   * Project identifier
   */
  project_id: string;

  /**
   * One entry per requested node, in the order the request listed them.
   */
  runs: Array<ProjectRunNodesResponse.Run>;
}

export namespace ProjectRunNodesResponse {
  export interface Run {
    /**
     * The identifier supplied for this node, echoed verbatim: a short id in is a short
     * id out
     */
    node_id: string;

    /**
     * Whether this node's generation was started or could not run. Skipped nodes carry
     * a reason and never charge.
     */
    status: 'started' | 'skipped';

    /**
     * Estimated cost in USD at start time, at the model's default parameters. Null
     * when the model is not yet decided. The amount actually charged is reported on
     * the run itself.
     */
    charged_cost?: number | null;

    /**
     * Expected duration of this run, or null when the model is not yet decided.
     */
    estimated_seconds?: number | null;

    /**
     * Human-readable explanation of the skip. Present only when status is skipped.
     */
    message?: string;

    /**
     * Endpoint the node is configured for. Null when the node routes its model at run
     * time, so the model is only decided once the run starts.
     */
    model?: Run.Model | null;

    /**
     * URL to poll this run. Present only when status is started.
     */
    poll_url?: string;

    /**
     * Why the node did not run. Present only when status is skipped. node_not_found:
     * no node on this canvas answers to that id. node_not_executable: the node
     * generates nothing — action nodes run through the action run endpoint.
     * node_locked: the node is locked on the canvas. no_model_configured: the node has
     * no model set. generation_already_running: a generation for this node is already
     * in flight. run_failed_to_start: the run could not be started for this node — the
     * rest of the batch is unaffected, retry this node.
     * video_generation_not_available: the workspace's plan does not include video
     * generation.
     */
    reason?:
      | 'node_not_found'
      | 'node_not_executable'
      | 'node_locked'
      | 'no_model_configured'
      | 'generation_already_running'
      | 'run_failed_to_start'
      | 'video_generation_not_available';

    /**
     * Run identifier to poll for this node. Present only when status is started.
     */
    run_id?: string;

    /**
     * Run type. Present only when status is started.
     */
    type?: 'generation';
  }

  export namespace Run {
    /**
     * Endpoint the node is configured for. Null when the node routes its model at run
     * time, so the model is only decided once the run starts.
     */
    export interface Model {
      /**
       * Model identifier
       */
      model_id: string;
    }
  }
}

export interface ProjectCreateParams {
  /**
   * Project name
   */
  name: string;
}

export interface ProjectGraphParams {
  /**
   * Workspace identifier
   */
  workspaceId: string;
}

export interface ProjectRunNodesParams {
  /**
   * Path param: Workspace identifier
   */
  workspaceId: string;

  /**
   * Body param: Nodes to run, addressed by the short id or node UUID the project
   * graph endpoint reports. Between 1 and 50 per request.
   */
  node_ids: Array<string>;
}

Projects.Canvas = Canvas;

export declare namespace Projects {
  export {
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectGraphResponse as ProjectGraphResponse,
    type ProjectRunNodesResponse as ProjectRunNodesResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectGraphParams as ProjectGraphParams,
    type ProjectRunNodesParams as ProjectRunNodesParams,
  };

  export {
    Canvas as Canvas,
    type CanvasApplyChangesetResponse as CanvasApplyChangesetResponse,
    type CanvasReplaceDefinitionResponse as CanvasReplaceDefinitionResponse,
    type CanvasRetrieveDefinitionResponse as CanvasRetrieveDefinitionResponse,
    type CanvasApplyChangesetParams as CanvasApplyChangesetParams,
    type CanvasReplaceDefinitionParams as CanvasReplaceDefinitionParams,
    type CanvasRetrieveDefinitionParams as CanvasRetrieveDefinitionParams,
  };
}
