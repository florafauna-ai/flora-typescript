// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Flora } from '../client';

export abstract class APIResource {
  protected _client: Flora;

  constructor(client: Flora) {
    this._client = client;
  }
}
