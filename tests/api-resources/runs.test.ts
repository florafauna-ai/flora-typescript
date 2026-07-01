// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  // Mock server tests are disabled
  test.skip('startGeneration: only required params', async () => {
    const responsePromise = client.runs.startGeneration({
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
  test.skip('startGeneration: required and optional params', async () => {
    const response = await client.runs.startGeneration({
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
  test.skip('startTechnique: only required params', async () => {
    const responsePromise = client.runs.startTechnique({
      inputs: { foo: 'bar' },
      technique_id: 'tech_abcd1234',
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
  test.skip('startTechnique: required and optional params', async () => {
    const response = await client.runs.startTechnique({
      inputs: { foo: 'bar' },
      technique_id: 'tech_abcd1234',
      workspace_id: 'ws_abc123',
    });
  });
});
