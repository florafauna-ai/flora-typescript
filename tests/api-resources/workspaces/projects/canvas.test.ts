// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource canvas', () => {
  // Mock server tests are disabled
  test.skip('applyChangeset: only required params', async () => {
    const responsePromise = client.workspaces.projects.canvas.applyChangeset('prj_abc123', {
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
  test.skip('applyChangeset: required and optional params', async () => {
    const response = await client.workspaces.projects.canvas.applyChangeset('prj_abc123', {
      workspaceId: 'ws_abc123',
      add: [
        {
          ref: 'hero',
          type: 'image',
          content_url: 'https://example.com',
          group: 'group',
          label: 'label',
          model: 'model',
          params: { foo: 'bar' },
          position: { x: 0, y: 0 },
          prompt: 'prompt',
        },
      ],
      connect: [
        {
          from: 'n7',
          to: 'n7',
          in: 'in',
        },
      ],
      disconnect: [
        {
          from: 'n7',
          to: 'n7',
          in: 'in',
        },
      ],
      remove: [{ id: 'n7' }],
      update: [
        {
          id: 'n7',
          label: 'label',
          model: 'model',
          params: { foo: 'bar' },
          position: { x: 0, y: 0 },
          prompt: 'prompt',
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('replaceDefinition: only required params', async () => {
    const responsePromise = client.workspaces.projects.canvas.replaceDefinition('prj_abc123', {
      workspaceId: 'ws_abc123',
      definition: {
        edges: [
          {
            id: 'edge_abc123',
            source: 'x',
            source_handle: 'source_handle',
            target: 'x',
            target_handle: 'target_handle',
          },
        ],
        node_inputs: { foo: { foo: 'bar' } },
        node_outputs: { foo: { foo: 'bar' } },
        nodes: [
          {
            id: 'node_abc123',
            data: { foo: 'bar' },
            type: 'videoBlock',
          },
        ],
      },
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
  test.skip('replaceDefinition: required and optional params', async () => {
    const response = await client.workspaces.projects.canvas.replaceDefinition('prj_abc123', {
      workspaceId: 'ws_abc123',
      definition: {
        edges: [
          {
            id: 'edge_abc123',
            source: 'x',
            source_handle: 'source_handle',
            target: 'x',
            target_handle: 'target_handle',
            data: { foo: 'bar' },
            type: 'type',
          },
        ],
        node_inputs: { foo: { foo: 'bar' } },
        node_outputs: { foo: { foo: 'bar' } },
        nodes: [
          {
            id: 'node_abc123',
            data: { foo: 'bar' },
            type: 'videoBlock',
            expand_parent: true,
            extent: 'parent',
            height: 0,
            hidden: true,
            origin: [{}],
            parent_id: 'x',
            position: { x: 0, y: 0 },
            style: { foo: 'bar' },
            width: 0,
            z_index: 0,
          },
        ],
        layer_editor_documents: { foo: { foo: 'bar' } },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveDefinition: only required params', async () => {
    const responsePromise = client.workspaces.projects.canvas.retrieveDefinition('prj_abc123', {
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
  test.skip('retrieveDefinition: required and optional params', async () => {
    const response = await client.workspaces.projects.canvas.retrieveDefinition('prj_abc123', {
      workspaceId: 'ws_abc123',
    });
  });
});
