// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AssetsAPI from './assets';
import { AssetAttachParams, AssetAttachResponse, Assets } from './assets';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Projects extends APIResource {
  assets: AssetsAPI.Assets = new AssetsAPI.Assets(this._client);

  /**
   * Creates a new Flora project in the requested workspace. Mutating public API
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
   * const projects = await client.projects.list({
   *   workspace_id: 'ws_abc123',
   * });
   * ```
   */
  list(query: ProjectListParams, options?: RequestOptions): APIPromise<ProjectListResponse> {
    return this._client.get('/projects', { query, ...options });
  }

  /**
   * Returns sanitized visible media nodes on a project canvas. The response omits
   * raw graph documents, Liveblocks internals, raw Convex IDs, and unbounded node
   * data blobs.
   *
   * @example
   * ```ts
   * const response = await client.projects.listNodes(
   *   'prj_abc123',
   * );
   * ```
   */
  listNodes(
    projectID: string,
    query: ProjectListNodesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProjectListNodesResponse> {
    return this._client.get(path`/projects/${projectID}/nodes`, { query, ...options });
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
  meta: ProjectListResponse.Meta;

  projects: Array<ProjectListResponse.Project>;
}

export namespace ProjectListResponse {
  export interface Meta {
    /**
     * Opaque cursor for fetching the next page
     */
    next_cursor: string | null;

    /**
     * Estimated total matching items
     */
    total_estimate?: number | null;
  }

  export interface Project {
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
}

export interface ProjectListNodesResponse {
  /**
   * Project canvas URL
   */
  canvas_url: string;

  meta: ProjectListNodesResponse.Meta;

  nodes: Array<ProjectListNodesResponse.Node>;

  /**
   * Project identifier
   */
  project_id: string;
}

export namespace ProjectListNodesResponse {
  export interface Meta {
    /**
     * Opaque cursor for fetching the next page
     */
    next_cursor: string | null;

    /**
     * Estimated total matching items
     */
    total_estimate?: number | null;
  }

  export interface Node {
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
     * Canvas node media URL
     */
    url?: string | null;

    width?: number | null;
  }
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

export interface ProjectListParams {
  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Opaque cursor for fetching the next page
   */
  cursor?: string;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * Search query
   */
  query?: string;
}

export interface ProjectListNodesParams {
  /**
   * Opaque cursor for fetching the next page
   */
  cursor?: string;

  /**
   * Maximum number of results to return
   */
  limit?: number;
}

Projects.Assets = Assets;

export declare namespace Projects {
  export {
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectListNodesResponse as ProjectListNodesResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectListParams as ProjectListParams,
    type ProjectListNodesParams as ProjectListNodesParams,
  };

  export {
    Assets as Assets,
    type AssetAttachResponse as AssetAttachResponse,
    type AssetAttachParams as AssetAttachParams,
  };
}
