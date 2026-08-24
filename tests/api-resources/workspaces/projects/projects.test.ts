// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource projects', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workspaces.projects.create('ws_abc123', { name: 'Spring Campaign' });
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
    const response = await client.workspaces.projects.create('ws_abc123', { name: 'Spring Campaign' });
  });

  // Mock server tests are disabled
  test.skip('graph: only required params', async () => {
    const responsePromise = client.workspaces.projects.graph('prj_abc123', { workspaceId: 'ws_abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('graph: required and optional params', async () => {
    const response = await client.workspaces.projects.graph('prj_abc123', { workspaceId: 'ws_abc123' });
  });

  // Mock server tests are disabled
  test.skip('runNodes: only required params', async () => {
    const responsePromise = client.workspaces.projects.runNodes('prj_abc123', {
      workspaceId: 'ws_abc123',
      node_ids: ['n3'],
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
  test.skip('runNodes: required and optional params', async () => {
    const response = await client.workspaces.projects.runNodes('prj_abc123', {
      workspaceId: 'ws_abc123',
      node_ids: ['n3'],
    });
  });
});
