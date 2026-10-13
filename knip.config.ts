import type { KnipConfig } from "knip"

const config: KnipConfig = {
  rules: {
    files: "error",
    dependencies: "error",
    unlisted: "error",
    unresolved: "error",
    exports: "error",
    types: "error",
    nsExports: "error",
    nsTypes: "error",
    duplicates: "error",
    enumMembers: "off",
  },

  entry: ["src/index.ts"],

  // Fern owns this tree: it re-exports everything it emits, and unused members
  // are regenerated with the next Fern run, so they are not dead code.
  ignore: [
    "src/generated/**",
    // Published namespace members have consumers outside this workspace.
    "src/lib/generation-response-types.ts",
  ],
}

export default config
