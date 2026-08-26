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
  // are regenerated on the next `pnpm generate`, so they are not dead code.
  ignore: ["src/generated/**"],

  ignoreBinaries: [
    // Root devDependencies shared across the workspace; pnpm resolves them up the tree.
    "oxfmt",
    "oxlint",
    "tsgo",
    "turbo",
    // Installed globally (see ../../fern/README.md), not as a package dependency.
    "fern",
  ],
}

export default config
