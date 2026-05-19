// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { FLORA } from '../client';

export abstract class APIResource {
  protected _client: FLORA;

  constructor(client: FLORA) {
    this._client = client;
  }
}
