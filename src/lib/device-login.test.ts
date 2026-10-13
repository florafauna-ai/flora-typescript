/** Tests auth isolation, runtime root/account/workspace validation, resource binding and no retries or credential leakage on malformed/ambiguous refresh. */
import { afterEach, expect, test, vi } from "vitest"

import { PreviewDeviceLoginClient } from "./device-login.js"
afterEach(() => vi.clearAllMocks())
test("discovery uses the explicit web origin and root header with no selectors or body", async () => {
  const result = {
    account_id: "user-one",
    sub: "subject-one",
    workspaces: [{ id: "workspace-one", name: "Studio" }],
  }
  const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(result))
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: fetcher,
  })
  expect(await client.listWorkspaces("root-secret")).toEqual(result)
  expect(fetcher).toHaveBeenCalledWith("https://preview.example/api/auth/grants/workspaces", {
    method: "GET",
    headers: { Authorization: "Bearer root-secret" },
    redirect: "error",
    cache: "no-store",
    credentials: "omit",
  })
})
test("refresh never retries and errors omit request/response secrets", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockResolvedValue(new Response("secret-response", { status: 503 }))
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: fetcher,
  })
  await expect(
    client.token({
      grant_type: "refresh_token",
      client_id: "public-client",
      refresh_token: "refresh-secret",
    }),
  ).rejects.toThrow("Device login request failed (HTTP 503, unknown_error)")
  expect(fetcher).toHaveBeenCalledTimes(1)
  expect(fetcher.mock.calls[0]?.[1]?.redirect).toBe("error")
})
test("a product API path or insecure origin cannot be mistaken for the auth coordinator", () => {
  for (const previewBaseURL of [
    "http://preview.example",
    "https://preview.example/api/v1",
    "https://user:secret@preview.example",
    "https://preview.example?token=secret",
  ]) {
    expect(() => new PreviewDeviceLoginClient({ previewBaseURL })).toThrow(
      "baseURL must be an HTTPS origin",
    )
  }
})

test("pending device authorization remains distinguishable without exposing arbitrary error bodies", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockResolvedValue(Response.json({ error: "authorization_pending" }, { status: 400 }))
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: fetcher,
  })
  await expect(
    client.token({
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      client_id: "public-client",
      device_code: "pending-secret",
    }),
  ).rejects.toMatchObject({ status: 400, code: "authorization_pending" })
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test("slow_down exposes the server's increased polling interval", async () => {
  const fetcher = vi
    .fn<typeof fetch>()
    .mockResolvedValue(Response.json({ error: "slow_down", interval: 10 }, { status: 400 }))
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: fetcher,
  })
  await expect(
    client.token({
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      client_id: "public-client",
      device_code: "pending-secret",
    }),
  ).rejects.toMatchObject({ status: 400, code: "slow_down", interval: 10 })
})

// Production uses the same protocol with an explicit web origin and no automatic retries.
test("production constructor uses its explicit origin for root discovery", async () => {
  const { DeviceLoginClient } = await import("./device-login.js")
  const fetcher = vi
    .fn()
    .mockResolvedValue(Response.json({ account_id: "account", workspaces: [] }))
  const client = new DeviceLoginClient({
    baseURL: "https://app.flora.ai",
    rootResource: "https://app.flora.ai/api/auth/grants",
    fetch: fetcher,
  })
  await client.listWorkspaces("root")
  expect(fetcher.mock.calls[0]?.[0]).toBe("https://app.flora.ai/api/auth/grants/workspaces")
})

const rootResult = {
  account_id: "account",
  sub: "subject",
  workspaces: [{ id: "workspace", name: "Studio" }],
  access_token: "access-secret",
  refresh_token: "refresh-secret",
  token_type: "Bearer",
  expires_in: 300,
  scope: "device:manage",
  resource: "https://www.florafauna.site/api/auth/grants",
}
const refreshRequest = {
  grant_type: "refresh_token" as const,
  client_id: "public",
  refresh_token: "old-refresh-secret",
}
test("valid root response is parsed and extra wire fields do not enter the identity contract", async () => {
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: vi.fn().mockResolvedValue(Response.json({ ...rootResult, extra: "ignored" })),
  })
  expect(await client.token(refreshRequest)).toEqual(rootResult)
})
test.each([
  { account_id: undefined },
  { account_id: 42 },
  { sub: 42 },
  { workspaces: undefined },
  { workspaces: [{ id: 7, name: "Studio" }] },
  { workspaces: [{ id: "workspace" }] },
  {
    workspaces: [
      { id: "workspace", name: "a" },
      { id: "workspace", name: "b" },
    ],
  },
  { resource: "https://app.flora.ai/api/auth/grants" },
  { refresh_token: undefined },
  { refresh_token: "" },
  { token_type: "Basic" },
  { expires_in: 0 },
  { expires_in: -1 },
  { expires_in: "300" },
  { expires_in: Infinity },
])(
  "malformed successful root is rejected without retry or credential leakage: %j",
  async (patch) => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ ...rootResult, ...patch }))
    const client = new PreviewDeviceLoginClient({
      previewBaseURL: "https://preview.example",
      fetch: fetcher,
    })
    const error = await client.token(refreshRequest).catch((error) => error)
    expect(error).toMatchObject({ code: "invalid_response", status: 200 })
    expect(String(error)).not.toContain("secret")
    expect(fetcher).toHaveBeenCalledTimes(1)
  },
)
test.each([{ workspaces: [] }, { account_id: "account", workspaces: [null] }, null])(
  "malformed workspace discovery cannot return identity-bearing types",
  async (body) => {
    const fetcher = vi.fn().mockResolvedValue(Response.json(body))
    const client = new PreviewDeviceLoginClient({
      previewBaseURL: "https://preview.example",
      fetch: fetcher,
    })
    await expect(client.listWorkspaces("root-secret")).rejects.toMatchObject({
      code: "invalid_response",
    })
    expect(fetcher).toHaveBeenCalledTimes(1)
  },
)
test("invalid JSON success is a safe protocol error", async () => {
  const client = new PreviewDeviceLoginClient({
    previewBaseURL: "https://preview.example",
    fetch: vi.fn().mockResolvedValue(new Response("secret response body")),
  })
  await expect(client.token(refreshRequest)).rejects.toThrow("HTTP 200, invalid_response")
})
