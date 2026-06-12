// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.techniques.runs.create('art-directors-critique', {
      inputs: [
        {
          id: 'id',
          type: 'text',
          value: 'value',
        },
      ],
      mode: 'async',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.techniques.runs.create('art-directors-critique', {
      inputs: [
        {
          id: 'id',
          type: 'text',
          value: 'value',
        },
      ],
      mode: 'async',
      callback_url: 'https://example.com',
      idempotency_key: 'idempotency_key',
    });
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.techniques.runs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.techniques.runs.list(
        {
          cursor: 'eyJvZmZzZXQiOjIwfQ',
          limit: 1,
          project_id: 'prj_abc123',
          status: 'pending',
          technique_id: 'tech_abcd1234',
          workspace_id: 'ws_abc123',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(FLORA.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.techniques.runs.retrieve('run_abc123', {
      techniqueId: 'art-directors-critique',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.techniques.runs.retrieve('run_abc123', {
      techniqueId: 'art-directors-critique',
    });
  });
});
