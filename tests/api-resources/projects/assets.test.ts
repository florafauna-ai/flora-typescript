// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FlorafaunaAI from 'florafauna-ai';

const client = new FlorafaunaAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource assets', () => {
  // Mock server tests are disabled
  test.skip('attach: only required params', async () => {
    const responsePromise = client.projects.assets.attach('asset_abc123', { projectId: 'prj_abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('attach: required and optional params', async () => {
    const response = await client.projects.assets.attach('asset_abc123', { projectId: 'prj_abc123' });
  });
});
