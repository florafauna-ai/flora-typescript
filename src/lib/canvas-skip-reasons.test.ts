import { describe, expect, test } from "vitest"

import { RunNodesCanvasResponse } from "../generated/api/resources/projects/resources/canvas/types/RunNodesCanvasResponse.js"

// The timeline skip reason is a consumer-facing contract shared with the
// public API wire schema (the canvas run-nodes response). If the
// reason is renamed server-side without regenerating the SDK, MCP clients
// reading this enum silently lose the branch. Pin the literal here so the
// generated code cannot drift from the API.
describe("canvas run skip reasons", () => {
  test("generated SDK carries video_editor_run_not_supported", () => {
    expect(RunNodesCanvasResponse.Runs.Item.Reason.VideoEditorRunNotSupported).toBe(
      "video_editor_run_not_supported",
    )
  })
})
