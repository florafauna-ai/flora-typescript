// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource folders', () => {
  // Mock server tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.workspaces.library.folders.create('ws_abc123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workspaces.library.folders.create(
        'ws_abc123',
        { name: 'Clipped from Pinterest — Jul 7, 2026' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(FLORA.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.workspaces.library.folders.delete('libfolder_abc123', {
      workspaceId: 'ws_abc123',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.workspaces.library.folders.delete('libfolder_abc123', {
      workspaceId: 'ws_abc123',
    });
  });

  // Mock server tests are disabled
  test.skip('addItem: only required params', async () => {
    const responsePromise = client.workspaces.library.folders.addItem('libfolder_abc123', {
      workspaceId: 'ws_abc123',
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
  test.skip('addItem: required and optional params', async () => {
    const response = await client.workspaces.library.folders.addItem('libfolder_abc123', {
      workspaceId: 'ws_abc123',
      description: 'Product hero shot',
      source: 'https://media.flora.ai/example.png',
      text: 'A cool prompt clipped from a tweet',
      type: 'image',
    });
  });
});
