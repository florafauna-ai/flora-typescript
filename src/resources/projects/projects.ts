// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ActionsAPI from './actions';
import {
  ActionCreateParams,
  ActionCreateResponse,
  ActionRunParams,
  ActionRunResponse,
  Actions,
} from './actions';
import * as AssetsAPI from './assets';
import { AssetAttachAssetParams, AssetAttachAssetResponse, Assets } from './assets';
import * as CanvasAPI from './canvas';
import { Canvas, CanvasRetrieveResponse, CanvasUpdateParams, CanvasUpdateResponse } from './canvas';
import { APIPromise } from '../../core/api-promise';
import {
  CanvasNodesCursorPage,
  type CanvasNodesCursorPageParams,
  PagePromise,
  ProjectsCursorPage,
  type ProjectsCursorPageParams,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Projects extends APIResource {
  assets: AssetsAPI.Assets = new AssetsAPI.Assets(this._client);
  canvas: CanvasAPI.Canvas = new CanvasAPI.Canvas(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Creates a new FLORA project in the requested workspace. Mutating public API
   * requests support an optional Idempotency-Key header for client retries;
   * duplicate keys within two hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const project = await client.projects.create({
   *   name: 'Spring Campaign',
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  create(body: ProjectCreateParams, options?: RequestOptions): APIPromise<ProjectCreateResponse> {
    return this._client.post('/projects', { body, ...options });
  }

  /**
   * Returns metadata for a single project when it is accessible to the authenticated
   * public API key. Missing and inaccessible projects both return 404.
   *
   * @example
   * ```ts
   * const project = await client.projects.retrieve(
   *   'prj_abc123',
   * );
   * ```
   */
  retrieve(projectID: string, options?: RequestOptions): APIPromise<ProjectRetrieveResponse> {
    return this._client.get(path`/projects/${projectID}`, options);
  }

  /**
   * Returns projects in the requested workspace that are accessible to the
   * authenticated public API key, ordered by recent activity.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const projectListResponse of client.projects.list(
   *   { workspace_id: 'ws_abc123' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: ProjectListParams,
    options?: RequestOptions,
  ): PagePromise<ProjectListResponsesProjectsCursorPage, ProjectListResponse> {
    return this._client.getAPIList('/projects', ProjectsCursorPage<ProjectListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Returns sanitized visible media nodes on a project canvas. The response omits
   * raw graph documents, Liveblocks internals, raw Convex IDs, and unbounded node
   * data blobs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const projectListNodesResponse of client.projects.listNodes(
   *   'prj_abc123',
   * )) {
   *   // ...
   * }
   * ```
   */
  listNodes(
    projectID: string,
    query: ProjectListNodesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProjectListNodesResponsesCanvasNodesCursorPage, ProjectListNodesResponse> {
    return this._client.getAPIList(
      path`/projects/${projectID}/nodes`,
      CanvasNodesCursorPage<ProjectListNodesResponse>,
      { query, ...options },
    );
  }
}

export type ProjectListResponsesProjectsCursorPage = ProjectsCursorPage<ProjectListResponse>;

export type ProjectListNodesResponsesCanvasNodesCursorPage = CanvasNodesCursorPage<ProjectListNodesResponse>;

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

export interface ProjectRetrieveResponse {
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

export interface ProjectListResponse {
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

export interface ProjectListNodesResponse {
  /**
   * Canvas node identifier
   */
  node_id: string;

  /**
   * Canvas node media type
   */
  type: 'image' | 'video' | 'audio' | 'text';

  /**
   * Asset identifier
   */
  asset_id?: string | null;

  height?: number | null;

  /**
   * Canvas node label
   */
  label?: string | null;

  /**
   * Canvas node output URL or text content
   */
  url?: string | null;

  width?: number | null;
}

export interface ProjectCreateParams {
  /**
   * Project name
   */
  name: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;
}

export interface ProjectListParams extends ProjectsCursorPageParams {
  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Search query
   */
  query?: string;
}

export interface ProjectListNodesParams extends CanvasNodesCursorPageParams {}

Projects.Assets = Assets;
Projects.Canvas = Canvas;
Projects.Actions = Actions;

export declare namespace Projects {
  export {
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectListNodesResponse as ProjectListNodesResponse,
    type ProjectListResponsesProjectsCursorPage as ProjectListResponsesProjectsCursorPage,
    type ProjectListNodesResponsesCanvasNodesCursorPage as ProjectListNodesResponsesCanvasNodesCursorPage,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
    type ProjectListNodesParams as ProjectListNodesParams,
  };

  export {
    Assets as Assets,
    type AssetAttachAssetResponse as AssetAttachAssetResponse,
    type AssetAttachAssetParams as AssetAttachAssetParams,
  };

  export {
    Canvas as Canvas,
    type CanvasRetrieveResponse as CanvasRetrieveResponse,
    type CanvasUpdateResponse as CanvasUpdateResponse,
    type CanvasUpdateParams as CanvasUpdateParams,
  };

  export {
    Actions as Actions,
    type ActionCreateResponse as ActionCreateResponse,
    type ActionRunResponse as ActionRunResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionRunParams as ActionRunParams,
  };
}
