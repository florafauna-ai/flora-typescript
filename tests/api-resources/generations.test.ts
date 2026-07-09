// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource generations', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.generations.create({
      project_id: 'prj_abc123',
      prompt: 'A cinematic product photo of a ceramic mug on a sunlit table',
      type: 'image',
      workspace_id: 'ws_abc123',
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
    const response = await client.generations.create({
      project_id: 'prj_abc123',
      prompt: 'A cinematic product photo of a ceramic mug on a sunlit table',
      type: 'image',
      workspace_id: 'ws_abc123',
      callback_url: 'https://example.com',
      model: 't2i-flux-2-pro',
      params: { foo: 'bar' },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.generations.retrieve('run_abc123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.generations.list();
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
      client.generations.list(
        {
          cursor: 'eyJvZmZzZXQiOjIwfQ',
          limit: 1,
          project_id: 'prj_abc123',
          status: 'pending',
          workspace_id: 'ws_abc123',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(FLORA.NotFoundError);
  });
});
