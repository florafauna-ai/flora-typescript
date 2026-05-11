// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FlorafaunaAI from 'florafauna-ai';

const client = new FlorafaunaAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource techniques', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.techniques.retrieve('tech_def_abc123');
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
    const responsePromise = client.techniques.list();
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
      client.techniques.list(
        {
          cursor: 'cursor',
          limit: 1,
          query: 'logo',
          workspace_id: 'ws_abc123',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(FlorafaunaAI.NotFoundError);
  });
});
