// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import FlorafaunaAI from 'florafauna-ai';

const client = new FlorafaunaAI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.techniques.runs.retrieve('run_abc123', { techniqueId: 'tech_def_abc123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.techniques.runs.retrieve('run_abc123', { techniqueId: 'tech_def_abc123' });
  });

  // Mock server tests are disabled
  test.skip('start: only required params', async () => {
    const responsePromise = client.techniques.runs.start('tech_def_abc123', {
      inputs: [
        {
          id: 'id',
          type: 'imageUrl',
          value: 'value',
        },
      ],
      mode: 'async',
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
  test.skip('start: required and optional params', async () => {
    const response = await client.techniques.runs.start('tech_def_abc123', {
      inputs: [
        {
          id: 'id',
          type: 'imageUrl',
          value: 'value',
        },
      ],
      mode: 'async',
      callback_url: 'https://example.com',
      idempotency_key: 'idempotency_key',
    });
  });
});
