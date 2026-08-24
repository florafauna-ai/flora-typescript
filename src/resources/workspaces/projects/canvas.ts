// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Project canvas endpoints.
 */
export class Canvas extends APIResource {
  /**
   * Edits a project canvas: add, update, connect, disconnect and remove operations
   * validate together and apply as ONE atomic transaction. Nothing applies if any
   * operation is invalid, and every cause is reported with a machine-readable code
   * in the error's fields array. Operations apply in the order add, update, connect,
   * disconnect, remove, with groups created before their members — so one call can
   * create a group, fill it, wire the new nodes to existing ones by the ref names it
   * chose, and delete something else. Nodes are addressed by the short id or node
   * UUID the project graph endpoint reports, or by a ref declared by an add
   * operation in the same request. REMOVE IS IMMEDIATE AND IRREVERSIBLE through the
   * API: there is no confirmation step and no undo, deleting a node also deletes its
   * edges and any group members, so confirm destructive changesets with your user
   * before sending them. The revision returned is the same change-detection marker
   * the project graph endpoint reports, so it can be compared directly against a
   * later read. Mutating public API requests support an optional Idempotency-Key
   * header for client retries; duplicate keys within two hours return
   * idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workspaces.projects.canvas.applyChangeset(
   *     'prj_abc123',
   *     { workspaceId: 'ws_abc123' },
   *   );
   * ```
   */
  applyChangeset(
    projectID: string,
    params: CanvasApplyChangesetParams,
    options?: RequestOptions,
  ): APIPromise<CanvasApplyChangesetResponse> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/workspaces/${workspaceId}/projects/${projectID}/canvas/changeset`, {
      body,
      ...options,
    });
  }

  /**
   * Validates and atomically replaces the complete project canvas definition.
   * Supplied positions are preserved and omitted positions receive deterministic
   * automatic layout. Mutating public API requests support an optional
   * Idempotency-Key header for client retries; duplicate keys within two hours
   * return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workspaces.projects.canvas.replaceDefinition(
   *     'prj_abc123',
   *     {
   *       workspaceId: 'ws_abc123',
   *       definition: {
   *         edges: [
   *           {
   *             id: 'edge_abc123',
   *             source: 'x',
   *             source_handle: 'source_handle',
   *             target: 'x',
   *             target_handle: 'target_handle',
   *           },
   *         ],
   *         node_inputs: { foo: { foo: 'bar' } },
   *         node_outputs: { foo: { foo: 'bar' } },
   *         nodes: [
   *           {
   *             id: 'node_abc123',
   *             data: { foo: 'bar' },
   *             type: 'videoBlock',
   *           },
   *         ],
   *       },
   *     },
   *   );
   * ```
   */
  replaceDefinition(
    projectID: string,
    params: CanvasReplaceDefinitionParams,
    options?: RequestOptions,
  ): APIPromise<CanvasReplaceDefinitionResponse> {
    const { workspaceId, ...body } = params;
    return this._client.put(path`/workspaces/${workspaceId}/projects/${projectID}/canvas/definition`, {
      body,
      ...options,
    });
  }

  /**
   * Returns the canonical JSON definition needed to reconstruct a project canvas,
   * including nodes, edges, inputs, current outputs, positions, and Layer Editor
   * documents when present.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workspaces.projects.canvas.retrieveDefinition(
   *     'prj_abc123',
   *     { workspaceId: 'ws_abc123' },
   *   );
   * ```
   */
  retrieveDefinition(
    projectID: string,
    params: CanvasRetrieveDefinitionParams,
    options?: RequestOptions,
  ): APIPromise<CanvasRetrieveDefinitionResponse> {
    const { workspaceId } = params;
    return this._client.get(
      path`/workspaces/${workspaceId}/projects/${projectID}/canvas/definition`,
      options,
    );
  }
}

export interface CanvasApplyChangesetResponse {
  /**
   * What the transaction actually did
   */
  applied: CanvasApplyChangesetResponse.Applied;

  /**
   * Project canvas URL
   */
  canvas_url: string;

  /**
   * Each add operation's ref mapped to the ids of the node it created
   */
  created: { [key: string]: CanvasApplyChangesetResponse.Created };

  /**
   * Project identifier
   */
  project_id: string;

  /**
   * Change-detection marker of the canvas after this changeset, identical to the
   * value the project graph endpoint reports
   */
  revision: string;

  /**
   * Operations that resolved but did not change what the caller may have expected,
   * such as an update matching current state or a duplicate connect
   */
  warnings: Array<string>;
}

export namespace CanvasApplyChangesetResponse {
  /**
   * What the transaction actually did
   */
  export interface Applied {
    /**
     * Nodes created
     */
    added: number;

    /**
     * Edges created
     */
    connected: number;

    /**
     * Edges removed
     */
    disconnected: number;

    /**
     * Nodes deleted, including group members deleted with their frame
     */
    removed: number;

    /**
     * Update operations that changed at least one field
     */
    updated: number;
  }

  export interface Created {
    /**
     * Short id the created node answers to from now on
     */
    id: string;

    /**
     * Created node UUID
     */
    node_id: string;
  }
}

export interface CanvasReplaceDefinitionResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  definition: CanvasReplaceDefinitionResponse.Definition;

  /**
   * Project identifier
   */
  project_id: string;

  summary: CanvasReplaceDefinitionResponse.Summary;
}

export namespace CanvasReplaceDefinitionResponse {
  export interface Definition {
    /**
     * Complete canvas edge list
     */
    edges: Array<Definition.Edge>;

    /**
     * Complete per-node generation and action input configuration
     */
    node_inputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete current durable output attached to each node
     */
    node_outputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete ordered canvas node list
     */
    nodes: Array<Definition.Node>;

    /**
     * Portable Layer Editor documents keyed by Layer Editor node identifier; omitted
     * when no Layer Editor nodes exist
     */
    layer_editor_documents?: { [key: string]: { [key: string]: unknown } };
  }

  export namespace Definition {
    export interface Edge {
      /**
       * Stable canvas edge identifier
       */
      id: string;

      /**
       * Source node identifier
       */
      source: string;

      /**
       * Source handle identifier
       */
      source_handle: string | null;

      /**
       * Target node identifier
       */
      target: string;

      /**
       * Target handle identifier
       */
      target_handle: string | null;

      /**
       * Durable edge configuration
       */
      data?: { [key: string]: unknown };

      /**
       * Canvas edge renderer type
       */
      type?: string;
    }

    export interface Node {
      /**
       * Stable canvas node identifier
       */
      id: string;

      /**
       * Durable public node configuration; transient collaboration state is omitted
       */
      data: { [key: string]: unknown };

      /**
       * Persisted node position
       */
      position: Node.Position;

      /**
       * Flora canvas node type
       */
      type:
        | 'videoBlock'
        | 'textBlock'
        | 'comment'
        | 'group'
        | 'ghost'
        | 'virtualSourceNode'
        | 'emptyImageBlock'
        | 'outpaintImageBlock'
        | 'inpaintImageBlock'
        | 'staticImageBlock'
        | 'staticVideoBlock'
        | 'resultImageBlock'
        | 'resultVideoBlock'
        | 'resultTextBlock'
        | 'audioBlock'
        | 'resultAudioBlock'
        | 'staticAudioBlock'
        | 'techniqueBlock'
        | 'layerEditorNode'
        | 'videoEditorNode'
        | 'collectionNode'
        | 'routerNode'
        | 'switchNode'
        | 'elementNode'
        | 'textLabel'
        | 'codeBlock'
        | 'documentNode'
        | 'exportNode'
        | 'webcamNode'
        | 'model3dNode';

      /**
       * Whether moving the node may expand its parent group
       */
      expand_parent?: boolean;

      /**
       * Optional React Flow movement extent
       */
      extent?: 'parent' | Array<unknown>;

      /**
       * Authored node height
       */
      height?: number;

      /**
       * Whether the node is hidden
       */
      hidden?: boolean;

      /**
       * React Flow node origin
       */
      origin?: Array<unknown>;

      /**
       * Parent group node identifier
       */
      parent_id?: string;

      /**
       * Durable node style properties
       */
      style?: { [key: string]: unknown };

      /**
       * Authored node width
       */
      width?: number;

      /**
       * Canvas stacking order
       */
      z_index?: number;
    }

    export namespace Node {
      /**
       * Persisted node position
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

  export interface Summary {
    edge_count: number;

    group_count: number;

    isolated_node_count: number;

    node_count: number;

    workflow_count: number;
  }
}

export interface CanvasRetrieveDefinitionResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  definition: CanvasRetrieveDefinitionResponse.Definition;

  /**
   * Project identifier
   */
  project_id: string;

  summary: CanvasRetrieveDefinitionResponse.Summary;
}

export namespace CanvasRetrieveDefinitionResponse {
  export interface Definition {
    /**
     * Complete canvas edge list
     */
    edges: Array<Definition.Edge>;

    /**
     * Complete per-node generation and action input configuration
     */
    node_inputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete current durable output attached to each node
     */
    node_outputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete ordered canvas node list
     */
    nodes: Array<Definition.Node>;

    /**
     * Portable Layer Editor documents keyed by Layer Editor node identifier; omitted
     * when no Layer Editor nodes exist
     */
    layer_editor_documents?: { [key: string]: { [key: string]: unknown } };
  }

  export namespace Definition {
    export interface Edge {
      /**
       * Stable canvas edge identifier
       */
      id: string;

      /**
       * Source node identifier
       */
      source: string;

      /**
       * Source handle identifier
       */
      source_handle: string | null;

      /**
       * Target node identifier
       */
      target: string;

      /**
       * Target handle identifier
       */
      target_handle: string | null;

      /**
       * Durable edge configuration
       */
      data?: { [key: string]: unknown };

      /**
       * Canvas edge renderer type
       */
      type?: string;
    }

    export interface Node {
      /**
       * Stable canvas node identifier
       */
      id: string;

      /**
       * Durable public node configuration; transient collaboration state is omitted
       */
      data: { [key: string]: unknown };

      /**
       * Persisted node position
       */
      position: Node.Position;

      /**
       * Flora canvas node type
       */
      type:
        | 'videoBlock'
        | 'textBlock'
        | 'comment'
        | 'group'
        | 'ghost'
        | 'virtualSourceNode'
        | 'emptyImageBlock'
        | 'outpaintImageBlock'
        | 'inpaintImageBlock'
        | 'staticImageBlock'
        | 'staticVideoBlock'
        | 'resultImageBlock'
        | 'resultVideoBlock'
        | 'resultTextBlock'
        | 'audioBlock'
        | 'resultAudioBlock'
        | 'staticAudioBlock'
        | 'techniqueBlock'
        | 'layerEditorNode'
        | 'videoEditorNode'
        | 'collectionNode'
        | 'routerNode'
        | 'switchNode'
        | 'elementNode'
        | 'textLabel'
        | 'codeBlock'
        | 'documentNode'
        | 'exportNode'
        | 'webcamNode'
        | 'model3dNode';

      /**
       * Whether moving the node may expand its parent group
       */
      expand_parent?: boolean;

      /**
       * Optional React Flow movement extent
       */
      extent?: 'parent' | Array<unknown>;

      /**
       * Authored node height
       */
      height?: number;

      /**
       * Whether the node is hidden
       */
      hidden?: boolean;

      /**
       * React Flow node origin
       */
      origin?: Array<unknown>;

      /**
       * Parent group node identifier
       */
      parent_id?: string;

      /**
       * Durable node style properties
       */
      style?: { [key: string]: unknown };

      /**
       * Authored node width
       */
      width?: number;

      /**
       * Canvas stacking order
       */
      z_index?: number;
    }

    export namespace Node {
      /**
       * Persisted node position
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

  export interface Summary {
    edge_count: number;

    group_count: number;

    isolated_node_count: number;

    node_count: number;

    workflow_count: number;
  }
}

export interface CanvasApplyChangesetParams {
  /**
   * Path param: Workspace identifier
   */
  workspaceId: string;

  /**
   * Body param: Nodes to create. Groups are created before their members.
   */
  add?: Array<CanvasApplyChangesetParams.Add>;

  /**
   * Body param: Edges to create. Either endpoint may be a ref created by this same
   * changeset. The canvas carries one edge per pair, so a duplicate pair is skipped
   * with a warning.
   */
  connect?: Array<CanvasApplyChangesetParams.Connect>;

  /**
   * Body param: Edges to remove, addressed by their endpoints as the graph read
   * reports them
   */
  disconnect?: Array<CanvasApplyChangesetParams.Disconnect>;

  /**
   * Body param: Nodes to delete. Their edges and any group members go too. Removal
   * is immediate and cannot be undone through the API.
   */
  remove?: Array<CanvasApplyChangesetParams.Remove>;

  /**
   * Body param: Existing nodes to modify. One operation per node.
   */
  update?: Array<CanvasApplyChangesetParams.Update>;
}

export namespace CanvasApplyChangesetParams {
  export interface Add {
    /**
     * Caller-chosen handle for the new node, echoed back in created with its real ids.
     * Usable as a connect or group target inside this same changeset. Must not collide
     * with a live node id.
     */
    ref: string;

    /**
     * Node type to create, in the agent vocabulary the graph read reports
     */
    type: 'image' | 'video' | 'text' | 'audio' | 'group' | 'static_image' | 'layer_editor';

    /**
     * HTTPS URL of existing image, video, or audio to place instead of generating. The
     * media is copied onto Flora's CDN and the node becomes a static block. Mutually
     * exclusive with prompt, model, and params.
     */
    content_url?: string;

    /**
     * Group to parent this node into: an existing group's short id or UUID, or the ref
     * of a group created by this same changeset.
     */
    group?: string;

    /**
     * Display label pinned on the node
     */
    label?: string;

    /**
     * Model name or endpoint id, as the graph read reports them. Omit to take the
     * default model for the node's modality.
     */
    model?: string;

    /**
     * Model parameters, validated against the model's schema. Invalid values reject
     * the whole changeset rather than being coerced.
     */
    params?: { [key: string]: unknown };

    /**
     * Absolute canvas position. Omit to place the node automatically below the
     * existing canvas content.
     */
    position?: Add.Position;

    /**
     * Generation prompt, stored in the node's model parameters. Mutually exclusive
     * with content_url.
     */
    prompt?: string;
  }

  export namespace Add {
    /**
     * Absolute canvas position. Omit to place the node automatically below the
     * existing canvas content.
     */
    export interface Position {
      /**
       * Absolute horizontal canvas coordinate
       */
      x: number;

      /**
       * Absolute vertical canvas coordinate
       */
      y: number;
    }
  }

  export interface Connect {
    /**
     * Source node reference
     */
    from: string;

    /**
     * Target node reference
     */
    to: string;

    /**
     * Target input slot, in the vocabulary the graph read reports: a modality word
     * such as "image", a named action or technique input, or "enabled" for the boolean
     * gate. Omit to let the target take the edge by modality.
     */
    in?: string;
  }

  export interface Disconnect {
    /**
     * Source node reference
     */
    from: string;

    /**
     * Target node reference
     */
    to: string;

    /**
     * Input slot of the edge to remove; omit to remove every edge between the pair
     */
    in?: string;
  }

  export interface Remove {
    /**
     * Node to delete: its short id or UUID
     */
    id: string;
  }

  export interface Update {
    /**
     * Node to modify: its short id or UUID
     */
    id: string;

    /**
     * Replacement display label
     */
    label?: string;

    /**
     * Replacement model name or endpoint id
     */
    model?: string;

    /**
     * Model parameters, merged key by key into the node's stored parameters. Omitted
     * keys survive; a named key is overwritten. On an action node these are the
     * action's own parameter values.
     */
    params?: { [key: string]: unknown };

    /**
     * New absolute canvas position
     */
    position?: Update.Position;

    /**
     * Replacement generation prompt
     */
    prompt?: string;
  }

  export namespace Update {
    /**
     * New absolute canvas position
     */
    export interface Position {
      /**
       * Absolute horizontal canvas coordinate
       */
      x: number;

      /**
       * Absolute vertical canvas coordinate
       */
      y: number;
    }
  }
}

export interface CanvasReplaceDefinitionParams {
  /**
   * Path param: Workspace identifier
   */
  workspaceId: string;

  /**
   * Body param: Complete canvas definition to replace
   */
  definition: CanvasReplaceDefinitionParams.Definition;
}

export namespace CanvasReplaceDefinitionParams {
  /**
   * Complete canvas definition to replace
   */
  export interface Definition {
    /**
     * Complete canvas edge list
     */
    edges: Array<Definition.Edge>;

    /**
     * Complete per-node generation and action input configuration
     */
    node_inputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete current durable output attached to each node
     */
    node_outputs: { [key: string]: { [key: string]: unknown } };

    /**
     * Complete replacement canvas node list
     */
    nodes: Array<Definition.Node>;

    /**
     * Portable Layer Editor documents keyed by Layer Editor node identifier; omitted
     * when no Layer Editor nodes exist
     */
    layer_editor_documents?: { [key: string]: { [key: string]: unknown } };
  }

  export namespace Definition {
    export interface Edge {
      /**
       * Stable canvas edge identifier
       */
      id: string;

      /**
       * Source node identifier
       */
      source: string;

      /**
       * Source handle identifier
       */
      source_handle: string | null;

      /**
       * Target node identifier
       */
      target: string;

      /**
       * Target handle identifier
       */
      target_handle: string | null;

      /**
       * Durable edge configuration
       */
      data?: { [key: string]: unknown };

      /**
       * Canvas edge renderer type
       */
      type?: string;
    }

    export interface Node {
      /**
       * Stable canvas node identifier
       */
      id: string;

      /**
       * Durable public node configuration; transient collaboration state is omitted
       */
      data: { [key: string]: unknown };

      /**
       * Flora canvas node type
       */
      type:
        | 'videoBlock'
        | 'textBlock'
        | 'comment'
        | 'group'
        | 'ghost'
        | 'virtualSourceNode'
        | 'emptyImageBlock'
        | 'outpaintImageBlock'
        | 'inpaintImageBlock'
        | 'staticImageBlock'
        | 'staticVideoBlock'
        | 'resultImageBlock'
        | 'resultVideoBlock'
        | 'resultTextBlock'
        | 'audioBlock'
        | 'resultAudioBlock'
        | 'staticAudioBlock'
        | 'techniqueBlock'
        | 'layerEditorNode'
        | 'videoEditorNode'
        | 'collectionNode'
        | 'routerNode'
        | 'switchNode'
        | 'elementNode'
        | 'textLabel'
        | 'codeBlock'
        | 'documentNode'
        | 'exportNode'
        | 'webcamNode'
        | 'model3dNode';

      /**
       * Whether moving the node may expand its parent group
       */
      expand_parent?: boolean;

      /**
       * Optional React Flow movement extent
       */
      extent?: 'parent' | Array<unknown>;

      /**
       * Authored node height
       */
      height?: number;

      /**
       * Whether the node is hidden
       */
      hidden?: boolean;

      /**
       * React Flow node origin
       */
      origin?: Array<unknown>;

      /**
       * Parent group node identifier
       */
      parent_id?: string;

      /**
       * Node position; omitted positions receive deterministic automatic layout
       */
      position?: Node.Position;

      /**
       * Durable node style properties
       */
      style?: { [key: string]: unknown };

      /**
       * Authored node width
       */
      width?: number;

      /**
       * Canvas stacking order
       */
      z_index?: number;
    }

    export namespace Node {
      /**
       * Node position; omitted positions receive deterministic automatic layout
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
}

export interface CanvasRetrieveDefinitionParams {
  /**
   * Workspace identifier
   */
  workspaceId: string;
}

export declare namespace Canvas {
  export {
    type CanvasApplyChangesetResponse as CanvasApplyChangesetResponse,
    type CanvasReplaceDefinitionResponse as CanvasReplaceDefinitionResponse,
    type CanvasRetrieveDefinitionResponse as CanvasRetrieveDefinitionResponse,
    type CanvasApplyChangesetParams as CanvasApplyChangesetParams,
    type CanvasReplaceDefinitionParams as CanvasReplaceDefinitionParams,
    type CanvasRetrieveDefinitionParams as CanvasRetrieveDefinitionParams,
  };
}
