// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Flora from '@flora-ai/flora';

const client = new Flora({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  // Mock server tests are disabled
  test.skip('startGeneration: only required params', async () => {
    const responsePromise = client.runs.startGeneration({ body: {} });
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
    const response = await client.runs.startGeneration({ body: {} });
  });

  // Mock server tests are disabled
  test.skip('startTechnique: only required params', async () => {
    const responsePromise = client.runs.startTechnique({ body: {} });
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
    const response = await client.runs.startTechnique({ body: {} });
  });
});
