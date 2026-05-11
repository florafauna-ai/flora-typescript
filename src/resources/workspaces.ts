// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Workspaces extends APIResource {
  /**
   * Returns the workspaces available to the authenticated public API key, including
   * each workspace's public ID, name, creation timestamp, and caller role.
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

export declare namespace Workspaces {
  export { type WorkspaceListResponse as WorkspaceListResponse };
}
