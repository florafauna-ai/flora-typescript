// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FoldersAPI from './folders';
import {
  FolderAddItemParams,
  FolderAddItemResponse,
  FolderCreateParams,
  FolderCreateResponse,
  FolderDeleteParams,
  FolderDeleteResponse,
  Folders,
} from './folders';

export class Library extends APIResource {
  folders: FoldersAPI.Folders = new FoldersAPI.Folders(this._client);
}

Library.Folders = Folders;

export declare namespace Library {
  export {
    Folders as Folders,
    type FolderCreateResponse as FolderCreateResponse,
    type FolderDeleteResponse as FolderDeleteResponse,
    type FolderAddItemResponse as FolderAddItemResponse,
    type FolderCreateParams as FolderCreateParams,
    type FolderDeleteParams as FolderDeleteParams,
    type FolderAddItemParams as FolderAddItemParams,
  };
}
