# Flora MCP Server

Connect your AI tools to Flora's creative AI platform for generating images, video, audio, and text.

**Server URL:**

```
{{cloudflareWorkerUrl}}
```

## Connect Your MCP Client

### Claude.ai

1. Open Claude Web
2. Go to Settings → Connectors
3. Click "+ Add Custom Connector"
4. Add the MCP server URL: `{{cloudflareWorkerUrl}}`

### Claude Desktop

1. Edit your Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the following configuration:

```json
{
  "mcpServers": {
    "flora": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{cloudflareWorkerUrl}}"]
    }
  }
}
```

3. Restart Claude Desktop (look for the hammer icon)

### Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "flora": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{cloudflareWorkerUrl}}"]
    }
  }
}
```

### Windsurf

Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "flora": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{cloudflareWorkerUrl}}"]
    }
  }
}
```

## Authentication

When connecting for the first time, you'll be prompted to enter your Flora API key. You can generate one from the [Flora Dashboard](https://app.flora.ai).

For detailed setup instructions, see the [API Getting Started guide](https://docs.flora.ai/more/api-getting-started).

## Troubleshooting

1. Ensure you have Node.js 18 or higher installed
2. Try clearing MCP authentication cache: `rm -rf ~/.mcp-auth`
3. Restart your MCP client application
4. Check client logs for error messages

## Learn More

- [Flora API Documentation](https://docs.flora.ai)
- [Flora API Reference](https://developer.flora.ai)
- [MCP Protocol](https://modelcontextprotocol.io/introduction)
