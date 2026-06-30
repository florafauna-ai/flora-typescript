// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource actions', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.projects.actions.create('prj_abc123', {
      action_id: 'color-grade-image-browser',
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
    const response = await client.projects.actions.create('prj_abc123', {
      action_id: 'color-grade-image-browser',
      params: { foo: 'bar' },
    });
  });

  // Mock server tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.projects.actions.run('nodeId', { projectId: 'prj_abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.projects.actions.run('nodeId', { projectId: 'prj_abc123' });
  });
});
