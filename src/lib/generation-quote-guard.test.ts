/** Quotes fail closed on older/unreachable APIs; supported quotes and ordinary runs use the original transport. */
import { expect, it, vi } from "vitest"

import { FloraClient } from "../client.js"

const request = {
  workspace_id: "ws_1",
  project_id: "prj_1",
  type: "image" as const,
  prompt: "a mug",
}

it.each([{}, { publicApiFeatures: [] }, { publicApiFeatures: ["other_feature"] }])(
  "never posts a quote to a deployment lacking capability: %j",
  async (release) => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(Response.json(release))
    const client = new FloraClient({ baseUrl: "https://example.com/api/v1", apiKey: "test", fetch })
    await expect(client.generations.create({ ...request, quote: true })).rejects.toThrow(
      "No generation request was sent",
    )
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(String(fetch.mock.calls[0]?.[0])).toBe("https://example.com/api/meta/release")
  },
)

it("never posts when the capability probe fails", async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValue(new Response("unavailable", { status: 503 }))
  const client = new FloraClient({ baseUrl: "https://example.com/api/v1", apiKey: "test", fetch })
  await expect(client.generations.create({ ...request, quote: true })).rejects.toThrow(
    "No generation request was sent",
  )
  expect(fetch).toHaveBeenCalledTimes(1)
})

it("sends the exact quote request only after capability confirmation", async () => {
  const quote = { type: "generation_quote", estimated_usage_credits: 10 }
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(Response.json({ publicApiFeatures: ["generation_quote"] }))
    .mockResolvedValueOnce(Response.json(quote))
  const client = new FloraClient({ baseUrl: "https://example.com/api/v1", apiKey: "test", fetch })
  const input = { ...request, quote: true, params: { duration: 8 } }
  await expect(client.generations.create(input)).resolves.toEqual(quote)
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(JSON.parse(String(fetch.mock.calls[1]?.[1]?.body))).toEqual(input)
})

it("does not add a capability probe to ordinary generation calls", async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValue(Response.json({ run_id: "run_1" }))
  const client = new FloraClient({ baseUrl: "https://example.com/api/v1", apiKey: "test", fetch })
  await client.generations.create(request)
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(String(fetch.mock.calls[0]?.[0])).toBe("https://example.com/api/v1/generate")
})

it.each(["generate", "runs/generation"])(
  "probes the same deployment prefix for %s",
  async (operation) => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(Response.json({ publicApiFeatures: ["generation_quote"] }))
      .mockResolvedValueOnce(Response.json({ type: "generation_quote" }))
    const client = new FloraClient({
      baseUrl: "https://example.com/tenant/api/v1",
      apiKey: "test",
      fetch,
    })
    if (operation === "generate") await client.generations.create({ ...request, quote: true })
    else await client.runs.startGeneration({ ...request, quote: true })
    expect(String(fetch.mock.calls[0]?.[0])).toBe("https://example.com/tenant/api/meta/release")
    expect(String(fetch.mock.calls[1]?.[0])).toBe(`https://example.com/tenant/api/v1/${operation}`)
  },
)
