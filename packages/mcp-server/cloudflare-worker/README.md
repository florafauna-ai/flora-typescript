# Flora MCP Server — Cloudflare Worker

Self-hosted Flora MCP server running on Cloudflare Workers. Provides AI tools access to Flora's creative AI platform (image, video, audio, and text generation).

**Production URL:** `https://agents.flora.ai`

## Develop Locally

```bash
npm install
npm run dev
```

Open [`http://localhost:8787/`](http://localhost:8787/) in your browser.

## Deploy

```bash
npm run deploy
```

The Worker is deployed to `flora-ai-flora-api-mcp-server.flora-ai.workers.dev` and bound to `agents.flora.ai` via Cloudflare Workers custom domain (managed in the [devops repo](https://github.com/florafauna-ai/devops)).

## Connect MCP Clients

### Claude Desktop

```json
{
  "mcpServers": {
    "flora": {
      "command": "npx",
      "args": ["mcp-remote", "https://agents.flora.ai/sse"]
    }
  }
}
```

### Cursor (`~/.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "flora": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://agents.flora.ai/sse"]
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector@latest
```

Enter `https://agents.flora.ai/sse` as the server URL.

## Authentication

The server uses an OAuth consent flow. On first connection, you'll be prompted to enter your Flora API key. Generate one from the [Flora Dashboard](https://app.flora.ai) or see the [API Getting Started guide](https://docs.flora.ai/more/api-getting-started).

## Debugging

```bash
# Connect directly via CLI
npx mcp-remote https://agents.flora.ai/sse

# Clear auth cache if needed
rm -rf ~/.mcp-auth
```
