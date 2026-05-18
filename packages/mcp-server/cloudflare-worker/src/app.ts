import { Hono } from 'hono';
import { homeContent, layout } from './utils';
import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider';

export type Bindings = Env & {
  OAUTH_PROVIDER: OAuthHelpers;
  OAUTH_CLIENT_ID: string;
  OAUTH_CLIENT_SECRET: string;
};

const CLERK_AUTHORIZE_URL = 'https://clerk.flora.ai/oauth/authorize';
const CLERK_TOKEN_URL = 'https://clerk.flora.ai/oauth/token';
const CLERK_USERINFO_URL = 'https://clerk.flora.ai/oauth/userinfo';

function getBaseUrl(req: Request): string {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

async function generateCodeVerifier(): Promise<string> {
  const buffer = new Uint8Array(32);
  crypto.getRandomValues(buffer);
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export function makeOAuthConsent() {
  const app = new Hono<{
    Bindings: Bindings;
  }>();

  app.get('/', async (c) => {
    const content = await homeContent(c.req.raw);
    return c.html(layout(content, 'Home', { orgName: 'Flora', clientProperties: [] }));
  });

  // Redirect to Clerk's OAuth authorize endpoint
  app.get('/authorize', async (c) => {
    const oauthReqInfo = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);

    const state = crypto.randomUUID();
    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store the original auth request and code verifier in KV (10 min TTL)
    await c.env.OAUTH_KV.put(`clerk_auth_state:${state}`, JSON.stringify({ oauthReqInfo, codeVerifier }), {
      expirationTtl: 600,
    });

    const baseUrl = getBaseUrl(c.req.raw);
    const params = new URLSearchParams({
      client_id: c.env.OAUTH_CLIENT_ID,
      redirect_uri: `${baseUrl}/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return c.redirect(`${CLERK_AUTHORIZE_URL}?${params.toString()}`);
  });

  // Handle Clerk's OAuth callback
  app.get('/callback', async (c) => {
    const code = c.req.query('code');
    const state = c.req.query('state');
    const error = c.req.query('error');

    if (error) {
      return c.text(`Authorization failed: ${c.req.query('error_description') || error}`, 400);
    }

    if (!code || !state) {
      return c.text('Missing code or state parameter', 400);
    }

    const stored = await c.env.OAUTH_KV.get(`clerk_auth_state:${state}`);
    if (!stored) {
      return c.text('Invalid or expired state', 400);
    }

    await c.env.OAUTH_KV.delete(`clerk_auth_state:${state}`);

    const { oauthReqInfo, codeVerifier } = JSON.parse(stored);
    const baseUrl = getBaseUrl(c.req.raw);

    // Exchange the code for tokens with Clerk using Basic Auth
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${baseUrl}/callback`,
      code_verifier: codeVerifier,
    });

    const basicAuth = btoa(`${c.env.OAUTH_CLIENT_ID}:${c.env.OAUTH_CLIENT_SECRET}`);

    const tokenResponse = await fetch(CLERK_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Clerk token exchange failed:', errorText);
      console.error('Client ID used:', c.env.OAUTH_CLIENT_ID);
      console.error('Redirect URI:', `${baseUrl}/callback`);
      return c.text(`Token exchange failed: ${errorText}`, 500);
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string;
      id_token?: string;
      token_type: string;
    };

    // Get user info from Clerk
    const userinfoResponse = await fetch(CLERK_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    let userId = crypto.randomUUID();
    let userMetadata: Record<string, unknown> = {};

    if (userinfoResponse.ok) {
      const userinfo = (await userinfoResponse.json()) as {
        sub?: string;
        email?: string;
        name?: string;
      };
      userId = userinfo.sub || userId;
      userMetadata = userinfo;
    }

    // Complete the OAuth authorization with the MCP client
    const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
      request: oauthReqInfo,
      userId,
      metadata: userMetadata,
      scope: oauthReqInfo.scope,
      props: {
        clerkAccessToken: tokenData.access_token,
      },
    });

    return c.redirect(redirectTo);
  });

  // OAuth protected resource metadata
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '86400',
  };
  app.options('/.well-known/oauth-protected-resource', async (c) => {
    Object.entries(corsHeaders).forEach(([key, value]) => c.header(key, value));
    return c.body(null, 204);
  });
  app.get('/.well-known/oauth-protected-resource', async (c) => {
    Object.entries(corsHeaders).forEach(([key, value]) => c.header(key, value));
    const baseURL = new URL('/', c.req.url).toString();
    return c.json({
      resource: baseURL,
      authorization_servers: [baseURL],
    });
  });

  return app;
}
