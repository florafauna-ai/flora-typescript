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

This package lives in the [`flora-frontend`](https://github.com/florafauna-ai/flora-frontend)
monorepo under `sdk/typescript`. `src/generated/` is produced by
[Fern](https://buildwithfern.com) from the committed OpenAPI document; everything else is
hand-written. See `sdk/AGENTS.md` for the workflow.
