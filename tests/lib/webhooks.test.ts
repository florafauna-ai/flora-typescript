import { webcrypto } from 'node:crypto';

import FLORA, { WebhookVerificationError, type WebhookEvent } from '@flora-ai/flora';

const SECRET = 'whsec_test_0123456789abcdef';

const SAMPLE_EVENT: WebhookEvent = {
  id: 'whd_abc123',
  type: 'run.completed',
  api_version: '2026-06-11',
  created_at: 1_750_000_000_000,
  data: {
    run_id: 'run_xyz789',
    run_type: 'generation',
    workspace_id: 'ws_abc123',
    status: 'completed',
  },
};

/** Mirror of the server's signer (apps/web/convex/webhooks/lib.ts). */
async function sign(body: string, secret: string, timestampSeconds: number): Promise<string> {
  const enc = new TextEncoder();
  const key = await webcrypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await webcrypto.subtle.sign('HMAC', key, enc.encode(`${timestampSeconds}.${body}`));
  const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `t=${timestampSeconds},v1=${hex}`;
}

const client = new FLORA({ apiKey: 'ak_test' });
const NOW_MS = 1_750_000_005_000; // 5s after the signed timestamp below
const T = 1_750_000_000; // unix seconds
const now = () => NOW_MS;

describe('client.webhooks.unwrap', () => {
  test('verifies a valid signature and returns the parsed event', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);

    const event = await client.webhooks.unwrap(body, { 'Flora-Signature': signature }, SECRET, { now });

    expect(event).toEqual(SAMPLE_EVENT);
  });

  test('accepts a Headers instance with case-insensitive lookup', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);
    const headers = new Headers({ 'flora-signature': signature });

    const event = await client.webhooks.unwrap(body, headers, SECRET, { now });
    expect(event.data.run_id).toBe('run_xyz789');
  });

  test('accepts the raw signature header string directly', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);

    const event = await client.webhooks.unwrap(body, signature, SECRET, { now });
    expect(event.type).toBe('run.completed');
  });

  test('accepts a bytes body', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);

    const event = await client.webhooks.unwrap(
      new TextEncoder().encode(body),
      { 'Flora-Signature': signature },
      SECRET,
      { now },
    );
    expect(event.id).toBe('whd_abc123');
  });

  test('rejects a tampered body', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);
    const tampered = body.replace('completed', 'failed');

    await expect(
      client.webhooks.unwrap(tampered, { 'Flora-Signature': signature }, SECRET, { now }),
    ).rejects.toThrow(WebhookVerificationError);
  });

  test('rejects a signature made with the wrong secret', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, 'whsec_wrong', T);

    await expect(
      client.webhooks.unwrap(body, { 'Flora-Signature': signature }, SECRET, { now }),
    ).rejects.toThrow(WebhookVerificationError);
  });

  test('rejects a timestamp older than the tolerance', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const staleT = T - 600; // 10 minutes old
    const signature = await sign(body, SECRET, staleT);

    await expect(
      client.webhooks.unwrap(body, { 'Flora-Signature': signature }, SECRET, { now }),
    ).rejects.toThrow(/too old/);
  });

  test('honors toleranceSeconds: 0 to disable the replay check', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const staleT = T - 86_400; // a day old, but signature still valid
    const signature = await sign(body, SECRET, staleT);

    const event = await client.webhooks.unwrap(body, { 'Flora-Signature': signature }, SECRET, {
      now,
      toleranceSeconds: 0,
    });
    expect(event.id).toBe('whd_abc123');
  });

  test('rejects when the signature header is missing', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);

    await expect(client.webhooks.unwrap(body, {}, SECRET, { now })).rejects.toThrow(/Flora-Signature/);
  });

  test('rejects when no secret is provided', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const signature = await sign(body, SECRET, T);

    await expect(client.webhooks.unwrap(body, { 'Flora-Signature': signature }, '', { now })).rejects.toThrow(
      /secret is required/,
    );
  });

  test('verifies across secret rotation (multiple v1 signatures)', async () => {
    const body = JSON.stringify(SAMPLE_EVENT);
    const good = await sign(body, SECRET, T); // "t=…,v1=<good>"
    const stale = await sign(body, 'whsec_old', T);
    const staleHex = stale.split('v1=')[1];
    const combined = `${good},v1=${staleHex}`; // current + retired signature

    const event = await client.webhooks.unwrap(body, { 'Flora-Signature': combined }, SECRET, { now });
    expect(event.id).toBe('whd_abc123');
  });
});
