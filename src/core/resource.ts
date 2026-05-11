// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { FlorafaunaAI } from '../client';

export abstract class APIResource {
  protected _client: FlorafaunaAI;

  constructor(client: FlorafaunaAI) {
    this._client = client;
  }
}
