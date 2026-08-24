// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Project management endpoints.
 */
export class Folders extends APIResource {
  /**
   * Creates a new Flora project filed into the given project folder. The folder must
   * belong to the workspace named in the path; private folders are reachable only by
   * their owner, and an unreachable folder returns 404 rather than disclosing that
   * it exists. Mutating public API requests support an optional Idempotency-Key
   * header for client retries; duplicate keys within two hours return
   * idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workspaces.folders.createProject(
   *     'fld_abc123',
   *     { workspaceId: 'ws_abc123', name: 'Spring Campaign' },
   *   );
   * ```
   */
  createProject(
    folderID: string,
    params: FolderCreateProjectParams,
    options?: RequestOptions,
  ): APIPromise<FolderCreateProjectResponse> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/workspaces/${workspaceId}/folders/${folderID}/projects`, {
      body,
      ...options,
    });
  }
}

export interface FolderCreateProjectResponse {
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

export interface FolderCreateProjectParams {
  /**
   * Path param: Workspace identifier
   */
  workspaceId: string;

  /**
   * Body param: Project name
   */
  name: string;
}

export declare namespace Folders {
  export {
    type FolderCreateProjectResponse as FolderCreateProjectResponse,
    type FolderCreateProjectParams as FolderCreateProjectParams,
  };
}
