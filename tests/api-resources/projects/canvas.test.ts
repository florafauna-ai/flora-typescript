// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FLORA from '@flora-ai/flora';

const client = new FLORA({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource canvas', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.projects.canvas.retrieve('prj_abc123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.projects.canvas.update('prj_abc123', {
      diagram:
        'graph LR\n  source["Product photo (Image)"]\n  output["Editorial campaign image (Image)"]\n  source --> output',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.projects.canvas.update('prj_abc123', {
      diagram:
        'graph LR\n  source["Product photo (Image)"]\n  output["Editorial campaign image (Image)"]\n  source --> output',
      node_params: {
        foo: {
          aspect_ratio: 'aspect_ratio',
          content_url: 'https://example.com',
          model: 'model',
          model_parameters: { foo: 'bar' },
          prompt: 'prompt',
          resolution: 'resolution',
        },
      },
    });
  });
});
