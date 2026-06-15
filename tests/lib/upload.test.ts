import FLORA from '@flora-ai/flora';

type FetchCall = { url: string; method: string; body: unknown };

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Builds a fake fetch that drives the reserve -> upload -> complete -> poll flow,
 * returning `ready` only after `readyAfter` polls.
 */
function makeFlow({ readyAfter = 1 }: { readyAfter?: number } = {}) {
  const calls: FetchCall[] = [];
  let polls = 0;

  const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const url =
      typeof input === 'string' ? input
      : input instanceof URL ? input.href
      : input.url;
    const method = (init?.method ?? 'GET').toUpperCase();
    calls.push({ url, method, body: init?.body });

    // Reserve a signed upload URL.
    if (url.endsWith('/assets') && method === 'POST') {
      return jsonResponse({
        asset_id: 'asset_test',
        status: 'pending_upload',
        uploaded_via: 'signed_url',
        url: 'https://cdn.flora.test/asset_test',
        visibility: 'workspace',
        workspace_id: 'ws_abc123',
        upload: {
          content_type: 'multipart/form-data',
          file_field: 'file',
          form_fields: { key: 'uploads/asset_test', 'x-amz-meta': 'flora' },
          method: 'POST',
          url: 'https://storage.flora.test/signed-post',
        },
      });
    }

    // The presigned storage POST.
    if (url === 'https://storage.flora.test/signed-post') {
      return new Response(null, { status: 204 });
    }

    // Mark complete.
    if (url.endsWith('/assets/asset_test/complete') && method === 'POST') {
      return jsonResponse({
        asset_id: 'asset_test',
        status: 'pending_upload',
        url: null,
        visibility: 'workspace',
        workspace_id: 'ws_abc123',
      });
    }

    // Poll for readiness.
    if (url.endsWith('/assets/asset_test') && method === 'GET') {
      polls += 1;
      const ready = polls >= readyAfter;
      return jsonResponse({
        asset_id: 'asset_test',
        content_type: 'image/png',
        created_at: null,
        description: null,
        failure_message: null,
        height: ready ? 512 : null,
        name: 'hero.png',
        size_bytes: ready ? 3 : null,
        status: ready ? 'ready' : 'pending_upload',
        upload_content_type: 'image/png',
        uploaded_via: 'signed_url',
        url: ready ? 'https://cdn.flora.test/asset_test' : null,
        width: ready ? 512 : null,
        workspace_id: 'ws_abc123',
      });
    }

    throw new Error(`unexpected request: ${method} ${url}`);
  };

  return { fetch: fetch as any, calls, getPolls: () => polls };
}

describe('assets.upload helper', () => {
  test('runs reserve -> upload -> complete -> poll and returns the ready asset', async () => {
    const flow = makeFlow({ readyAfter: 2 });
    const client = new FLORA({ apiKey: 'test', baseURL: 'http://flora.test/v1', fetch: flow.fetch });

    const asset = await client.assets.upload(Buffer.from('png'), {
      workspace_id: 'ws_abc123',
      file_name: 'hero.png',
      content_type: 'image/png',
      pollIntervalMs: 1,
    });

    expect(asset.status).toBe('ready');
    expect(asset.url).toBe('https://cdn.flora.test/asset_test');

    // The bytes went to the presigned storage URL as multipart/form-data.
    const upload = flow.calls.find((c) => c.url === 'https://storage.flora.test/signed-post');
    expect(upload).toBeDefined();
    expect(upload!.method).toBe('POST');
    expect(upload!.body).toBeInstanceOf(FormData);
    const form = upload!.body as FormData;
    expect(form.get('key')).toBe('uploads/asset_test');
    expect(form.get('file')).toBeInstanceOf(File);

    // It kept polling until status flipped to ready.
    expect(flow.getPolls()).toBe(2);
  });

  test('throws when the asset ends up failed', async () => {
    const calls: FetchCall[] = [];
    const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url =
        typeof input === 'string' ? input
        : input instanceof URL ? input.href
        : input.url;
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({ url, method, body: init?.body });

      if (url.endsWith('/assets') && method === 'POST') {
        return jsonResponse({
          asset_id: 'asset_fail',
          status: 'pending_upload',
          uploaded_via: 'signed_url',
          url: 'https://cdn.flora.test/asset_fail',
          visibility: 'workspace',
          workspace_id: 'ws_abc123',
          upload: {
            content_type: 'multipart/form-data',
            file_field: 'file',
            form_fields: {},
            method: 'POST',
            url: 'https://storage.flora.test/signed-post',
          },
        });
      }
      if (url === 'https://storage.flora.test/signed-post') return new Response(null, { status: 204 });
      if (url.endsWith('/complete') && method === 'POST') {
        return jsonResponse({
          asset_id: 'asset_fail',
          status: 'pending_upload',
          url: null,
          visibility: 'workspace',
          workspace_id: 'ws_abc123',
        });
      }
      if (url.endsWith('/assets/asset_fail') && method === 'GET') {
        return jsonResponse({
          asset_id: 'asset_fail',
          content_type: 'image/png',
          created_at: null,
          description: null,
          failure_message: 'unsupported format',
          height: null,
          name: null,
          size_bytes: null,
          status: 'failed',
          upload_content_type: null,
          uploaded_via: 'signed_url',
          url: null,
          width: null,
          workspace_id: 'ws_abc123',
        });
      }
      throw new Error(`unexpected request: ${method} ${url}`);
    };

    const client = new FLORA({ apiKey: 'test', baseURL: 'http://flora.test/v1', fetch: fetch as any });

    await expect(
      client.assets.upload(Buffer.from('png'), { workspace_id: 'ws_abc123', pollIntervalMs: 1 }),
    ).rejects.toThrow(/failed to process: unsupported format/i);
  });
});
