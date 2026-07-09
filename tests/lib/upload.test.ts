import FLORA from '@flora-ai/flora';

type FetchCall = { url: string; method: string; body: unknown };

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

const urlOf = (input: string | URL | Request): string =>
  typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

const readyAsset = (id: string, extra: Record<string, unknown> = {}) => ({
  asset_id: id,
  content_type: 'image/png',
  created_at: null,
  description: null,
  failure_message: null,
  height: 1,
  name: 'f.png',
  size_bytes: 3,
  status: 'ready',
  upload_content_type: 'image/png',
  uploaded_via: 'direct',
  url: `https://cdn.flora.test/${id}`,
  width: 1,
  workspace_id: 'ws_abc123',
  ...extra,
});

describe('assets.upload helper (3-path)', () => {
  test('small local file → direct multipart bytes in one call (no reserve/complete)', async () => {
    const calls: FetchCall[] = [];
    const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = urlOf(input);
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({ url, method, body: init?.body });

      if (url.endsWith('/assets') && method === 'POST') {
        // Direct path: multipart body carrying the file, and no `source`.
        expect(init?.body).toBeInstanceOf(FormData);
        const form = init!.body as FormData;
        expect(form.get('file')).toBeInstanceOf(File);
        expect(form.get('workspace_id')).toBe('ws_abc123');
        expect(form.get('source')).toBeNull();
        return jsonResponse({
          asset_id: 'asset_direct',
          status: 'ready',
          uploaded_via: 'direct',
          url: 'https://cdn.flora.test/asset_direct',
          visibility: 'workspace',
          workspace_id: 'ws_abc123',
        });
      }
      if (url.endsWith('/assets/asset_direct') && method === 'GET') return jsonResponse(readyAsset('asset_direct'));
      throw new Error(`unexpected request: ${method} ${url}`);
    };

    const client = new FLORA({ apiKey: 't', baseURL: 'http://flora.test/v1', fetch: fetch as any });
    const asset = await client.assets.upload(Buffer.from('png'), {
      workspace_id: 'ws_abc123',
      file_name: 'hero.png',
      content_type: 'image/png',
      pollIntervalMs: 1,
    });

    expect(asset.status).toBe('ready');
    expect(calls.some((c) => c.url.endsWith('/complete'))).toBe(false);
    expect(calls.some((c) => c.url.includes('storage'))).toBe(false);
  });

  test('public URL → server-side fetch (source=url, no byte upload)', async () => {
    const calls: FetchCall[] = [];
    const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = urlOf(input);
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({ url, method, body: init?.body });

      if (url.endsWith('/assets') && method === 'POST') {
        const body = JSON.parse(String(init?.body));
        expect(body.source).toBe('https://example.com/p/image.png');
        expect(body.file_name).toBe('image.png');
        return jsonResponse({
          asset_id: 'asset_url',
          status: 'pending_upload',
          uploaded_via: 'url',
          url: 'https://cdn.flora.test/asset_url',
          visibility: 'workspace',
          workspace_id: 'ws_abc123',
        });
      }
      if (url.endsWith('/assets/asset_url') && method === 'GET')
        return jsonResponse(readyAsset('asset_url', { uploaded_via: 'url' }));
      throw new Error(`unexpected request: ${method} ${url}`);
    };

    const client = new FLORA({ apiKey: 't', baseURL: 'http://flora.test/v1', fetch: fetch as any });
    const asset = await client.assets.upload('https://example.com/p/image.png', {
      workspace_id: 'ws_abc123',
      pollIntervalMs: 1,
    });

    expect(asset.status).toBe('ready');
    expect(calls.some((c) => c.url.includes('storage'))).toBe(false);
    expect(calls.some((c) => c.url.endsWith('/complete'))).toBe(false);
  });

  test('large local file (>4MB) → signed-url reserve → upload → complete → poll', async () => {
    const calls: FetchCall[] = [];
    let polls = 0;
    const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = urlOf(input);
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({ url, method, body: init?.body });

      if (url.endsWith('/assets') && method === 'POST') {
        const body = JSON.parse(String(init?.body));
        expect(body.source).toBe('signed-url');
        return jsonResponse({
          asset_id: 'asset_big',
          status: 'pending_upload',
          uploaded_via: 'signed_url',
          url: 'https://cdn.flora.test/asset_big',
          visibility: 'workspace',
          workspace_id: 'ws_abc123',
          upload: {
            content_type: 'multipart/form-data',
            file_field: 'file',
            form_fields: { key: 'uploads/asset_big' },
            method: 'POST',
            url: 'https://storage.flora.test/signed-post',
          },
        });
      }
      if (url === 'https://storage.flora.test/signed-post') return new Response(null, { status: 204 });
      if (url.endsWith('/assets/asset_big/complete') && method === 'POST')
        return jsonResponse({ asset_id: 'asset_big', status: 'pending_upload', url: null, visibility: 'workspace', workspace_id: 'ws_abc123' });
      if (url.endsWith('/assets/asset_big') && method === 'GET') {
        polls += 1;
        return jsonResponse(readyAsset('asset_big', { uploaded_via: 'signed_url', status: polls >= 2 ? 'ready' : 'pending_upload' }));
      }
      throw new Error(`unexpected request: ${method} ${url}`);
    };

    const client = new FLORA({ apiKey: 't', baseURL: 'http://flora.test/v1', fetch: fetch as any });
    const big = Buffer.alloc(5 * 1024 * 1024, 1); // 5 MB → signed-url path
    const asset = await client.assets.upload(big, {
      workspace_id: 'ws_abc123',
      file_name: 'big.png',
      content_type: 'image/png',
      pollIntervalMs: 1,
    });

    expect(asset.status).toBe('ready');
    expect(calls.some((c) => c.url === 'https://storage.flora.test/signed-post' && c.method === 'POST')).toBe(true);
    expect(calls.some((c) => c.url.endsWith('/assets/asset_big/complete'))).toBe(true);
    expect(polls).toBe(2);
  });
});
