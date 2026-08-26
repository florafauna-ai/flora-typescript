// Dual ESM + CJS build. Each half is a plain `tsc` emit; the CJS half needs its
// own package.json so Node treats those files as CommonJS despite the package
// root being "type": "module".
import { execFileSync } from "node:child_process"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"

rmSync("dist", { recursive: true, force: true })
for (const config of ["tsconfig.build.esm.json", "tsconfig.build.cjs.json"]) {
  execFileSync("tsc", ["-p", config], { stdio: "inherit" })
}
mkdirSync("dist/cjs", { recursive: true })
writeFileSync("dist/cjs/package.json", JSON.stringify({ type: "commonjs" }, null, 2) + "\n")
