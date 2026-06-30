// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource actions', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.actions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.actions.retrieve('color-grade-image-browser');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.actions.run({
      action_id: 'color-grade-image-browser',
      inputs: [{ type: 'image' }],
      project_id: 'prj_abc123',
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
  test.skip('run: required and optional params', async () => {
    const response = await client.actions.run({
      action_id: 'color-grade-image-browser',
      inputs: [
        {
          type: 'image',
          name: 'name',
          text: 'text',
          url: 'https://example.com',
        },
      ],
      project_id: 'prj_abc123',
      workspace_id: 'ws_abc123',
      params: {
        advanced: true,
        brightness: 0.5,
        contrast: 0.5,
        highlights: -1,
        hue_shift: -180,
        saturation: 0,
        shadows: -1,
        show_scope: true,
        tint: -1,
        warmth: -0.5,
      },
    });
  });
});
