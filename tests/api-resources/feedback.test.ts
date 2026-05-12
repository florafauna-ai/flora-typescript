// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Flora from '@flora-ai/flora';

const client = new Flora({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource feedback', () => {
  // Mock server tests are disabled
  test.skip('record: only required params', async () => {
    const responsePromise = client.feedback.record({
      detail: 'I want to export all generated campaign images at once.',
      kind: 'feature_request',
      summary: 'Need batch export support',
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
  test.skip('record: required and optional params', async () => {
    const response = await client.feedback.record({
      detail: 'I want to export all generated campaign images at once.',
      kind: 'feature_request',
      summary: 'Need batch export support',
      attempted_tools: ['generate_image'],
      project_id: 'prj_abc123',
      run_id: 'run_abc123',
      workspace_id: 'ws_abc123',
    });
  });
});
