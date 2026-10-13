/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config"

// The SDK targets any fetch-capable runtime; tests run in plain Node with a
// stubbed `fetch` and no framework setup.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    passWithNoTests: true,
  },
})
