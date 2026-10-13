/** Published ordinary-run types and enum namespaces survive adding quote results. */
import { expect, expectTypeOf, it } from "vitest"

import { Flora, FloraClient } from "../index.js"

it("retains public run response namespaces at both export paths", () => {
  expect(Flora.CreateGenerationsResponse.Type.Generation).toBe("generation")
  expect(Flora.StartGenerationRunsResponse.Action.ActionId.CropImageBrowser).toBe(
    "crop-image-browser",
  )
  expect(Flora.generations.CreateGenerationsResponse.Type.Action).toBe("action")
  expect(Flora.runs.StartGenerationRunsResponse.Type.Technique).toBe("technique")
  expectTypeOf<Flora.CreateGenerationsResponse.Model>().toEqualTypeOf<{ model_id: string }>()
  expectTypeOf<Flora.StartGenerationRunsResponse.Warnings.Item>().toMatchTypeOf<{
    code: string
    message: string
  }>()
  const request: Flora.CreateGenerationsRequest = {
    workspace_id: "ws_1",
    project_id: "prj_1",
    type: "image",
    prompt: "test",
  }
  const client = new FloraClient({ apiKey: "test" })
  // Function bodies are typechecked but never executed: no network request is made.
  const ordinary = () => client.generations.create({ ...request, quote: false })
  const quote = () => client.generations.create({ ...request, quote: true })
  expectTypeOf<
    Awaited<ReturnType<typeof ordinary>>
  >().toEqualTypeOf<Flora.CreateGenerationsResponse>()
  expectTypeOf<Awaited<ReturnType<typeof quote>>>().toEqualTypeOf<Flora.GenerationQuote>()
})
