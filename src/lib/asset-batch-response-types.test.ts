/**
 * Batch upload entries narrow on `ok`: after `if (entry.ok)` the single operation's
 * fields are required, and a failed entry carries `error` and no success fields.
 */
import { expectTypeOf, it } from "vitest"

import { FloraClient } from "../index.js"

it("narrows reservation and completion entries on ok", () => {
  const client = new FloraClient({ apiKey: "test" })
  // Function bodies are typechecked but never executed: no network request is made.
  const reserve = () =>
    client.assets.reserveUploads({ workspace_id: "ws_1", uploads: [{ file_name: "a.png" }] })
  const complete = () => client.assets.completeUploads({ asset_ids: ["asset_1"] })
  type Reserved = Awaited<ReturnType<typeof reserve>>["assets"][number]
  type Completed = Awaited<ReturnType<typeof complete>>["assets"][number]

  const readReserved = (entry: Reserved) => {
    if (entry.ok) {
      expectTypeOf(entry.asset_id).toEqualTypeOf<string>()
      expectTypeOf(entry.upload.form_fields).toEqualTypeOf<Record<string, string>>()
      expectTypeOf(entry.expires_at).toEqualTypeOf<string>()
      expectTypeOf(entry).not.toHaveProperty("error")
      return
    }
    expectTypeOf(entry.error).toEqualTypeOf<{ code: string; message: string }>()
    expectTypeOf(entry).not.toHaveProperty("asset_id")
  }
  const readCompleted = (entry: Completed) => {
    if (entry.ok) {
      expectTypeOf(entry.status).toEqualTypeOf<"pending_upload" | "ready" | "failed">()
      expectTypeOf(entry.failure_message).toEqualTypeOf<string | null>()
      expectTypeOf(entry).not.toHaveProperty("error")
      return
    }
    expectTypeOf(entry.asset_id).toEqualTypeOf<string>()
    expectTypeOf(entry.error).toEqualTypeOf<{ code: string; message: string }>()
    expectTypeOf(entry).not.toHaveProperty("status")
  }
  expectTypeOf(readReserved).toBeFunction()
  expectTypeOf(readCompleted).toBeFunction()
})
