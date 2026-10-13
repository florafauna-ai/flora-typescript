# @flora-ai/flora

The official TypeScript SDK for the [FLORA API](https://docs.flora.ai). Works in
Node.js 20+, Deno, Bun, Cloudflare Workers, and browsers — anywhere `fetch` exists.
No runtime dependencies.

```bash
npm install @flora-ai/flora
```

## Usage

```ts
import { FloraClient } from "@flora-ai/flora"

const client = new FloraClient({ apiKey: process.env.FLORA_API_KEY }) // or omit: FLORA_API_KEY is read automatically

const workspaces = await client.workspaces.list()

// Paginated lists are async iterables
for await (const project of await client.projects.list({ workspace_id: "ws_abc123" })) {
  console.log(project.project_id)
}

// One-call upload: picks direct bytes, server-side URL fetch, or signed upload by input and size,
// then polls until the asset is ready
const asset = await client.assets.upload("./hero.png", { workspace_id: "ws_abc123" })

// Verify a webhook delivery (no network)
const event = await client.webhooks.unwrap(
  rawBody,
  request.headers,
  process.env.FLORA_WEBHOOK_SECRET!,
)
```

Errors are typed per status code (`Flora.NotFoundError`, `Flora.TooManyRequestsError`, …) and all
extend `FloraError`. Every method accepts request options (`timeoutInSeconds`, `maxRetries`,
`abortSignal`, `headers`) as its last argument, and `.withRawResponse()` exposes headers and status.

## Development

`src/generated/` is produced by [Fern](https://buildwithfern.com) from the FLORA OpenAPI
document; everything else is hand-written. Install with `pnpm install`, then run
`pnpm build`, `pnpm test:unit` and `pnpm check`.

### Quote a generation

Pass `quote: true` to the existing `client.generations.create()` request to receive `estimated_usage_credits`, `estimated_cost` (USD), assumptions, and expiry. The API prepares the same prompt, parameters, and references without reserving credits, creating a canvas node, or starting a generation. Quotes are estimates, not a balance check or price lock. Omit `quote` (or use `false`) to start the run normally.

The SDK checks the API's `generation_quote` capability before sending quote requests and fails closed on older or unreachable deployments. Direct HTTP clients must check `/api/meta/release` for that feature too: older APIs discard unknown fields, including `quote`.

Quote requests ignore `Idempotency-Key`, so callers can refresh an estimate after expiry. `Flora.CreateGenerationsResponse` and `Flora.StartGenerationRunsResponse` retain their ordinary-run shapes and enum namespaces; use `Flora.GenerationQuote` for quotes or `Flora.GenerationCreateResult` for a dynamic quote flag.

### Device login

The explicitly enabled auth coordinator is separate from the product API. Its contract is
`device-login.openapi.json`; it is not
part of the generated `/api/v1` client. The handwritten `DeviceLoginClient`
requires an explicit web origin and uses root credentials only. Production remains default-OFF
and staff/entitlement gated; `PreviewDeviceLoginClient({ previewBaseURL })` remains compatible:

```ts
import { DeviceLoginClient } from "@flora-ai/flora"

const login = new DeviceLoginClient({
  baseURL: "https://your-preview.vercel.app",
  rootResource: "https://www.florafauna.site/api/auth/grants",
})
const { account_id, workspaces } = await login.listWorkspaces(rootAccessToken)
// Show workspace names. Restore a saved ID only if it still appears in this account's list.
// Pass the selected workspaces[i].id unchanged to the child credential exchange.
```

`login.token(request)` redeems device/PKCE sign-in or refreshes a root and returns a
`DeviceRootToken`, including the same `account_id` and `workspaces`. Serialize refresh;
there are no automatic retries because replay revokes the family. `DeviceLoginError`
exposes `status` and a known protocol `code` (including `authorization_pending` and
`slow_down`) plus the increased `interval` when supplied. Device callers respect the
initiation interval and any subsequent increase. Never send the root
to product API endpoints. List discovery accepts no account/workspace selector and
returns only stored consent intersected with current membership. `account_id` is the
stable verified Flora user ID; scope saved choices by deployment and account. Configure
preview deployment-protection access separately through an authorized custom fetch.

The generic constructor requires the exact logical `rootResource`: preview uses
`https://www.florafauna.site/api/auth/grants`, production uses
`https://app.flora.ai/api/auth/grants`. It is independent of the preview deployment hostname;
`PreviewDeviceLoginClient` supplies the preview value automatically. Successful root and workspace
responses are parsed before returning account identity: malformed accounts/workspaces, duplicate
workspace IDs, wrong root resource, non-Bearer tokens, missing replacement refresh or invalid
expiry fail with `DeviceLoginError.code === "invalid_response"`. Response bodies are not included
in errors. There is still no automatic retry, especially after an ambiguous refresh.
