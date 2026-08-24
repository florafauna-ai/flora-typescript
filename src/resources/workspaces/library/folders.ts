// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Library folder and saved-image endpoints.
 */
export class Folders extends APIResource {
  /**
   * Creates a folder in the authenticated user's FLORA library. Used by the Web
   * Clipper to group images clipped from a page. Defaults to the credential's
   * workspace when workspace_id is omitted. Mutating public API requests support an
   * optional Idempotency-Key header for client retries; duplicate keys within two
   * hours return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const folder =
   *   await client.workspaces.library.folders.create(
   *     'ws_abc123',
   *   );
   * ```
   */
  create(
    workspaceID: string,
    body: FolderCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FolderCreateResponse> {
    return this._client.post(path`/workspaces/${workspaceID}/library/folders`, { body, ...options });
  }

  /**
   * Deletes a library folder owned by the authenticated user, detaching any saved
   * nodes still in it. Used by the Web Clipper to clean up an empty folder when a
   * clip saved nothing.
   *
   * @example
   * ```ts
   * const folder =
   *   await client.workspaces.library.folders.delete(
   *     'libfolder_abc123',
   *     { workspaceId: 'ws_abc123' },
   *   );
   * ```
   */
  delete(
    folderID: string,
    params: FolderDeleteParams,
    options?: RequestOptions,
  ): APIPromise<FolderDeleteResponse> {
    const { workspaceId } = params;
    return this._client.delete(path`/workspaces/${workspaceId}/library/folders/${folderID}`, options);
  }

  /**
   * Fetches an image from a public HTTPS URL (SSRF-safe) and saves it into the given
   * library folder as a media node. Used by the Web Clipper's send pipeline, one
   * call per selected image. Mutating public API requests support an optional
   * Idempotency-Key header for client retries; duplicate keys within two hours
   * return idempotency_duplicate.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workspaces.library.folders.addItem(
   *     'libfolder_abc123',
   *     { workspaceId: 'ws_abc123' },
   *   );
   * ```
   */
  addItem(
    folderID: string,
    params: FolderAddItemParams,
    options?: RequestOptions,
  ): APIPromise<FolderAddItemResponse> {
    const { workspaceId, ...body } = params;
    return this._client.post(path`/workspaces/${workspaceId}/library/folders/${folderID}/items`, {
      body,
      ...options,
    });
  }
}

export interface FolderCreateResponse {
  /**
   * Library folder identifier
   */
  folder_id: string;

  /**
   * Library folder name
   */
  name: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;
}

export interface FolderDeleteResponse {
  /**
   * Always true when the folder was deleted
   */
  deleted: true;

  /**
   * Library folder identifier
   */
  folder_id: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;
}

export interface FolderAddItemResponse {
  /**
   * Library folder identifier
   */
  folder_id: string;

  /**
   * Saved node identifier
   */
  saved_node_id: string;

  /**
   * Workspace identifier
   */
  workspace_id: string;

  /**
   * Asset identifier
   */
  asset_id?: string;

  /**
   * Stored image URL
   */
  url?: string | null;
}

export interface FolderCreateParams {
  /**
   * Library folder name. Defaults to a generated name when omitted; renameable later
   * in the library.
   */
  name?: string;
}

export interface FolderDeleteParams {
  /**
   * Workspace identifier
   */
  workspaceId: string;
}

export interface FolderAddItemParams {
  /**
   * Path param: Workspace identifier
   */
  workspaceId: string;

  /**
   * Body param: Optional caption/label for the saved item
   */
  description?: string;

  /**
   * Body param: Public HTTPS URL of the image to save (required when type=image).
   * FLORA fetches the bytes server-side with SSRF protection
   * (private/loopback/metadata IPs and redirects to them are blocked) and stores
   * them.
   */
  source?: string;

  /**
   * Body param: Text to save as a text node (required when type=text).
   */
  text?: string;

  /**
   * Body param: Kind of item to save.
   */
  type?: 'image' | 'text';
}

export declare namespace Folders {
  export {
    type FolderCreateResponse as FolderCreateResponse,
    type FolderDeleteResponse as FolderDeleteResponse,
    type FolderAddItemResponse as FolderAddItemResponse,
    type FolderCreateParams as FolderCreateParams,
    type FolderDeleteParams as FolderDeleteParams,
    type FolderAddItemParams as FolderAddItemParams,
  };
}
