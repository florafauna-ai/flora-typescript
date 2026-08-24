// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FoldersAPI from './folders';
import { FolderCreateProjectParams, FolderCreateProjectResponse, Folders } from './folders';
import * as LibraryAPI from './library/library';
import { Library } from './library/library';
import * as ProjectsAPI from './projects/projects';
import {
  ProjectCreateParams,
  ProjectCreateResponse,
  ProjectGraphParams,
  ProjectGraphResponse,
  ProjectRunNodesParams,
  ProjectRunNodesResponse,
  Projects,
} from './projects/projects';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Workspace discovery endpoints.
 */
export class Workspaces extends APIResource {
  projects: ProjectsAPI.Projects = new ProjectsAPI.Projects(this._client);
  folders: FoldersAPI.Folders = new FoldersAPI.Folders(this._client);
  library: LibraryAPI.Library = new LibraryAPI.Library(this._client);

  /**
   * Returns the workspaces available to the authenticated public API key, including
   * each workspace's public ID, name, creation timestamp, and caller role.
   *
   * @example
   * ```ts
   * const workspaces = await client.workspaces.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WorkspaceListResponse> {
    return this._client.get('/workspaces', options);
  }
}

export interface WorkspaceListResponse {
  workspaces: Array<WorkspaceListResponse.Workspace>;
}

export namespace WorkspaceListResponse {
  export interface Workspace {
    created_at: number | null;

    /**
     * Workspace name
     */
    name: string;

    /**
     * Workspace role
     */
    role: string;

    /**
     * Workspace identifier
     */
    workspace_id: string;
  }
}

Workspaces.Projects = Projects;
Workspaces.Folders = Folders;
Workspaces.Library = Library;

export declare namespace Workspaces {
  export { type WorkspaceListResponse as WorkspaceListResponse };

  export {
    Projects as Projects,
    type ProjectCreateResponse as ProjectCreateResponse,
    type ProjectGraphResponse as ProjectGraphResponse,
    type ProjectRunNodesResponse as ProjectRunNodesResponse,
    type ProjectCreateParams as ProjectCreateParams,
    type ProjectGraphParams as ProjectGraphParams,
    type ProjectRunNodesParams as ProjectRunNodesParams,
  };

  export {
    Folders as Folders,
    type FolderCreateProjectResponse as FolderCreateProjectResponse,
    type FolderCreateProjectParams as FolderCreateProjectParams,
  };

  export { Library as Library };
}
