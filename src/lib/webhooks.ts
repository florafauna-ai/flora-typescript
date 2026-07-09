// File in `src/lib/` — not touched by Stainless code generation.
//
// Webhook signature verification for FLORA run-completion callbacks.
//
// FLORA signs every webhook delivery with an HMAC-SHA256 over `${t}.${rawBody}`
// using your per-workspace signing secret (the `whsec_…` value revealed when you
// create an API key), and sends the result in a Stripe-style `Flora-Signature`
// header: `t=<unix-seconds>,v1=<hex>`. Verify it on receipt with
// `client.webhooks.unwrap(rawBody, request.headers, secret)`, which checks the
// signature (constant-time) and the timestamp (replay window) before returning
// the parsed, typed event.
//
// IMPORTANT: pass the EXACT raw request body string (or bytes) — do not
// re-serialize the parsed JSON, or the signature will not match.

import { FLORAError } from '../core/error';

/**
 * Header carrying the signature: `t=<unix-seconds>,v1=<hex>[,v1=<hex>…]`. FLORA
 * also sends `Flora-Webhook-Id` (the `whd_…` delivery id) and `Flora-Event` (the
 * event type), which mirror the verified body's `id` and `type` fields.
 */
const SIGNATURE_HEADER = 'Flora-Signature';

/** Default replay window: reject signatures whose timestamp is older than this. */
const DEFAULT_TOLERANCE_SECONDS = 300;

export type WebhookEventType = 'run.completed' | 'run.failed';
export type WebhookRunType = 'generation' | 'technique';
export type WebhookRunStatus = 'completed' | 'failed';

/** The terminal-state data carried by a run webhook. */
export interface WebhookRunData {
  /** Public, prefixed run id (e.g. `run_abc`). */
  run_id: string;
  run_type: WebhookRunType;
  /** Public, prefixed workspace id (e.g. `ws_abc`). */
  workspace_id: string;
  status: WebhookRunStatus;
  /** Present on failures. */
  error_code?: string;
  /** Present on failures. */
  error_message?: string;
}

/** The verified webhook envelope returned by {@link Webhooks.unwrap}. */
export interface WebhookEvent {
  /** Stable delivery id (e.g. `whd_…`); also sent in the `Flora-Webhook-Id` header. */
  id: string;
  type: WebhookEventType;
  /** Payload-contract version stamp (e.g. `2026-06-11`). */
  api_version: string;
  /** Creation timestamp, unix milliseconds. */
  created_at: number;
  data: WebhookRunData;
}

/** Raw webhook body, as received off the wire. Pass it unmodified. */
export type WebhookPayload = string | Uint8Array | ArrayBuffer;

/**
 * Anything you can hand to {@link Webhooks.unwrap} as the headers argument:
 *
 * - a `Headers` instance (Fetch/Web API);
 * - a plain headers record (e.g. Node's `req.headers`);
 * - or the raw `Flora-Signature` header value as a string.
 */
export type WebhookHeaders = Headers | Record<string, string | string[] | undefined> | string;

export interface WebhookUnwrapOptions {
  /**
   * Maximum accepted age of the signed timestamp, in seconds. Defaults to 300
   * (5 minutes). Set to `0` to disable the timestamp/replay check entirely.
   */
  toleranceSeconds?: number;
  /** Injectable clock (unix milliseconds), for testing. Defaults to `Date.now`. */
  now?: () => number;
}

/** Thrown when a webhook payload fails signature or timestamp verification. */
export class WebhookVerificationError extends FLORAError {}

/**
 * Verifies and parses FLORA webhook callbacks.
 *
 * Accessed as `client.webhooks`. Verification is stateless — it needs only the
 * raw body, the request headers, and your signing secret — so these methods do
 * not make network calls.
 */
export class Webhooks {
  /**
   * Verify a webhook's signature and timestamp, then return the parsed event.
   * Throws {@link WebhookVerificationError} if verification fails.
   *
   * @example
   * ```ts
   * const event = await client.webhooks.unwrap(rawBody, req.headers, process.env.FLORA_WEBHOOK_SECRET!);
   * if (event.type === 'run.completed') { ... }
   * ```
   *
   * @param body   The exact raw request body (string or bytes). Do not re-serialize.
   * @param headers The request headers (or the raw `Flora-Signature` value).
   * @param secret  Your webhook signing secret (`whsec_…`).
   */
  async unwrap(
    body: WebhookPayload,
    headers: WebhookHeaders,
    secret: string,
    options: WebhookUnwrapOptions = {},
  ): Promise<WebhookEvent> {
    const payload = decodePayload(body);
    await this.verify(payload, headers, secret, options);
    try {
      return JSON.parse(payload) as WebhookEvent;
    } catch {
      throw new WebhookVerificationError('Webhook payload is not valid JSON.');
    }
  }

  /**
   * Verify a webhook's signature and timestamp without parsing the body. Throws
   * {@link WebhookVerificationError} on any failure; resolves on success.
   */
  async verify(
    body: WebhookPayload,
    headers: WebhookHeaders,
    secret: string,
    options: WebhookUnwrapOptions = {},
  ): Promise<void> {
    const { toleranceSeconds = DEFAULT_TOLERANCE_SECONDS, now = Date.now } = options;

    if (!secret) {
      throw new WebhookVerificationError('A webhook signing secret is required to verify signatures.');
    }

    const headerValue = getSignatureHeader(headers);
    if (!headerValue) {
      throw new WebhookVerificationError(`Could not find the ${SIGNATURE_HEADER} header.`);
    }

    const { timestamp, signatures } = parseSignatureHeader(headerValue);
    if (timestamp === null) {
      throw new WebhookVerificationError(`No timestamp (t=) found in the ${SIGNATURE_HEADER} header.`);
    }
    if (signatures.length === 0) {
      throw new WebhookVerificationError(`No v1 signature found in the ${SIGNATURE_HEADER} header.`);
    }

    const payload = decodePayload(body);
    const expected = await hmacSha256Hex(`${timestamp}.${payload}`, secret);
    const matches = signatures.some((candidate) => timingSafeEqual(candidate, expected));
    if (!matches) {
      throw new WebhookVerificationError(
        'Webhook signature does not match the expected signature; the body may have been tampered with or the wrong secret was used.',
      );
    }

    if (toleranceSeconds > 0) {
      const nowSeconds = Math.floor(now() / 1000);
      const age = nowSeconds - timestamp;
      if (age > toleranceSeconds) {
        throw new WebhookVerificationError(
          `Webhook timestamp is too old: age ${age}s exceeds the ${toleranceSeconds}s tolerance.`,
        );
      }
      if (age < -toleranceSeconds) {
        throw new WebhookVerificationError(
          `Webhook timestamp is too far in the future: ${-age}s ahead exceeds the ${toleranceSeconds}s tolerance.`,
        );
      }
    }
  }
}

// ── internals ────────────────────────────────────────────────────────────────

/** Normalize a string/bytes body to the exact string that was signed. */
function decodePayload(body: WebhookPayload): string {
  if (typeof body === 'string') return body;
  const bytes = body instanceof ArrayBuffer ? new Uint8Array(body) : body;
  return new TextDecoder().decode(bytes);
}

/** Pull the `Flora-Signature` value from any supported headers shape. */
function getSignatureHeader(headers: WebhookHeaders): string | null {
  if (typeof headers === 'string') return headers;

  if (typeof (headers as Headers).get === 'function') {
    return (headers as Headers).get(SIGNATURE_HEADER);
  }

  const lower = SIGNATURE_HEADER.toLowerCase();
  for (const [key, value] of Object.entries(headers as Record<string, string | string[] | undefined>)) {
    if (key.toLowerCase() === lower) {
      return Array.isArray(value) ? value[0] ?? null : value ?? null;
    }
  }
  return null;
}

/**
 * Parse `t=<seconds>,v1=<hex>[,v1=<hex>…]`. Multiple `v1` values are supported so
 * that secret rotation (more than one valid signature) verifies cleanly.
 */
function parseSignatureHeader(header: string): { timestamp: number | null; signatures: string[] } {
  let timestamp: number | null = null;
  const signatures: string[] = [];

  for (const part of header.split(',')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === 't') {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) timestamp = parsed;
    } else if (key === 'v1' && value) {
      signatures.push(value);
    }
  }

  return { timestamp, signatures };
}

/**
 * The slice of Web Crypto's `SubtleCrypto` we use. Declared structurally so the
 * SDK's `tsconfig` doesn't need the DOM lib to compile this file.
 */
interface SubtleLike {
  importKey(
    format: 'raw',
    keyData: Uint8Array,
    algorithm: { name: 'HMAC'; hash: 'SHA-256' },
    extractable: boolean,
    keyUsages: ['sign'],
  ): Promise<unknown>;
  sign(algorithm: 'HMAC', key: unknown, data: Uint8Array): Promise<ArrayBuffer>;
}

/** HMAC-SHA256 of `message` keyed by `secret`, hex-encoded — mirrors the server. */
async function hmacSha256Hex(message: string, secret: string): Promise<string> {
  const subtle = await getSubtleCrypto();
  const encoder = new TextEncoder();
  const key = await subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await subtle.sign('HMAC', key, encoder.encode(message));
  return bytesToHex(new Uint8Array(signature));
}

/** Resolve a Web Crypto subtle implementation, falling back to Node's `webcrypto`. */
async function getSubtleCrypto(): Promise<SubtleLike> {
  const fromGlobal = (globalThis as any).crypto?.subtle as SubtleLike | undefined;
  if (fromGlobal) return fromGlobal;
  try {
    const nodeCrypto = await import('node:crypto');
    const subtle = (nodeCrypto.webcrypto as any)?.subtle as SubtleLike | undefined;
    if (subtle) return subtle;
  } catch {
    // fall through to the error below
  }
  throw new FLORAError('The Web Crypto API is not available; cannot verify webhook signatures.');
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i]!.toString(16).padStart(2, '0');
  }
  return hex;
}

/** Length-checked, constant-time comparison of two ASCII (hex) strings. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
