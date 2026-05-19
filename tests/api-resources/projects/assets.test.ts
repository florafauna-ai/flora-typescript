// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource assets', () => {
  // Mock server tests are disabled
  test.skip('attachAsset: only required params', async () => {
    const responsePromise = client.projects.assets.attachAsset('asset_abc123', { projectId: 'prj_abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('attachAsset: required and optional params', async () => {
    const response = await client.projects.assets.attachAsset('asset_abc123', { projectId: 'prj_abc123' });
  });
});
