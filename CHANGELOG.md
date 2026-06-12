# Changelog

## [0.8.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.7.1...v0.8.0) (2026-06-12)


### Features

* **elements-v2:** server-side guards for reference generation ([51f98bd](https://github.com/florafauna-ai/flora-typescript/commit/51f98bda7cc5094bdae15b8144eb61579f22c7a6))
* Expose generations.retrieve(run_id) in the SDK (ENG-5104) ([76f9527](https://github.com/florafauna-ai/flora-typescript/commit/76f9527b5988afa80c1736ee4dc024e044871a56))
* **sdk:** scaffold stlc SDK generation pipeline (Stainless migration) ([ad1fe25](https://github.com/florafauna-ai/flora-typescript/commit/ad1fe2537ab7afdd07152a389107da774bc152cb))


### Documentation

* rewrite changelog with user-facing release descriptions ([0c95338](https://github.com/florafauna-ai/flora-typescript/commit/0c9533873f0b6482a548e0f4b8813ab41e8decdf))
* rewrite changelog with user-facing release descriptions ([414fa7d](https://github.com/florafauna-ai/flora-typescript/commit/414fa7d828db169d2ad7b9a9e6fc489442e8b6d6))

## 0.7.1 (2026-06-03)

Full Changelog: [v0.7.0...v0.7.1](https://github.com/florafauna-ai/flora-typescript/compare/v0.7.0...v0.7.1)

Maintenance release. Regenerates the SDK from the latest generator configuration; no public API changes.

### Chores

* sync generated SDK settings ([b96cd34](https://github.com/florafauna-ai/flora-typescript/commit/b96cd3419478efefd17a76c323ff9e0b91840178))

## 0.7.0 (2026-06-03)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.6.0...v0.7.0)

Adds listing and pagination across generations and technique runs, and lets technique runs return text outputs alongside media URLs.

### Features

* **generations & technique runs:** add `client.generations.list()` and `client.techniques.runs.list()` with cursor-based auto-pagination — iterate every generation or run with `for await (const item of client.generations.list())` ([cb8e726](https://github.com/florafauna-ai/flora-typescript/commit/cb8e726701ee377d873eace1844b5cfca5dac4f1))
* **techniques:** technique run outputs can now carry text content in addition to media URLs ([7ba85df](https://github.com/florafauna-ai/flora-typescript/commit/7ba85dffef71e26fe06632cfc883d9b7dd676d8f))


### Chores

* **config:** hide the deprecated `/runs/*` endpoints from the docs while keeping them generated in the SDK for backwards compatibility ([839a6ef](https://github.com/florafauna-ai/flora-typescript/commit/839a6effbd8a1eb87c7146d1b254e532d8de433d))


### Documentation

* point the README at [developer.flora.ai](https://developer.flora.ai) and drop the stale MCP install instructions ([3125ac1](https://github.com/florafauna-ai/flora-typescript/commit/3125ac15ae3e5b7a2d3d6db4d4b8bad29cbc39a0))

## 0.6.0 (2026-05-19)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.5.0...v0.6.0)

Renames the client export to `FLORA`, moves the MCP server onto Clerk's hosted OAuth flow, and adds Node 26 support. The Cloudflare Worker now lives in its own repository.

### Features

* **client:** export the client as `FLORA` (all caps) via custom casings ([8b663b4](https://github.com/florafauna-ai/flora-typescript/commit/8b663b4565524c031fcce9b7af50b1530219686b))
* **mcp:** redirect MCP OAuth to Clerk's hosted sign-in instead of the manual API-key form ([27ff4e8](https://github.com/florafauna-ai/flora-typescript/commit/27ff4e8a0b502a284587e133748079cefa5a5866))


### Bug Fixes

* **mcp:** forward the Clerk access token as `apiKey` in `MCPProps` so authenticated sessions reach the Flora SDK ([d10aaf4](https://github.com/florafauna-ai/flora-typescript/commit/d10aaf40095bdc88bd207d3a37dd6f0e428356fb))
* **mcp:** use `client_secret_post` for the Clerk token exchange ([706638f](https://github.com/florafauna-ai/flora-typescript/commit/706638fcdc4a20b4cff4add8cdb05b4b699cfd2c), [fddb53e](https://github.com/florafauna-ai/flora-typescript/commit/fddb53e33b8214c5881818ff46a3878b8f24a319))
* **typescript:** upgrade tsc-multi so builds succeed on Node 26 ([8ed4f6d](https://github.com/florafauna-ai/flora-typescript/commit/8ed4f6d390d8cbb83dd6bf7ca7cc10f07ae30441))


### Chores

* move the Cloudflare Worker into its own repo ([florafauna-ai/flora-mcp-worker](https://github.com/florafauna-ai/flora-mcp-worker)) and stop generating it here ([77a09cd](https://github.com/florafauna-ai/flora-typescript/commit/77a09cd22e4034468d5209842236941201c05608), [e72c85a](https://github.com/florafauna-ai/flora-typescript/commit/e72c85ab3e6ecd77b48b2180f85d6493c8f06109))
* sync the OpenAPI spec from flora-frontend `main` ([7e89d53](https://github.com/florafauna-ai/flora-typescript/commit/7e89d53726eaf1c43dfdd1c76e342f5f10fa7d8a))
* **tests:** remove a redundant `File` import ([701af7f](https://github.com/florafauna-ai/flora-typescript/commit/701af7f247846ec78f2dec2701c84d15ca67a384))
* sync generated SDK settings ([8577bc0](https://github.com/florafauna-ai/flora-typescript/commit/8577bc0dbed47b6eb2da9cdbf129e513d8ed797f), [18ee210](https://github.com/florafauna-ai/flora-typescript/commit/18ee21019865950d7ef1fc85e8ba8e7df5914be8), [69436a3](https://github.com/florafauna-ai/flora-typescript/commit/69436a38603011d2056890443266aa08a81254ac))


### Styles

* fix prettier formatting in `app.ts` ([2e0afa9](https://github.com/florafauna-ai/flora-typescript/commit/2e0afa9e4540f825497a096e09041510346a20ae))

## 0.5.0 (2026-05-18)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.4.0...v0.5.0)

### Features

* **mcp:** authenticate the MCP server through Clerk's OAuth authorization flow ([2d19792](https://github.com/florafauna-ai/flora-typescript/commit/2d19792ff87160460e66eb51ff987c3844836411))

## 0.4.0 (2026-05-18)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.3.0...v0.4.0)

### Features

* **mcp:** generate a Cloudflare Worker so the MCP server can be deployed to the edge ([5fdf163](https://github.com/florafauna-ai/flora-typescript/commit/5fdf163fe8b65fa616ccc0e26944766a63e2541f))

## 0.3.0 (2026-05-15)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.2.0...v0.3.0)

Brings the SDK in line with the latest API and hardens the MCP server's OAuth support.

### Features

* **mcp:** serve OAuth protected-resource metadata so MCP clients can discover how to authenticate ([2c12390](https://github.com/florafauna-ai/flora-typescript/commit/2c12390e7f27e436acb48cf028532a04630c3829))
* refresh the SDK against the latest API version — expanded run actions and updated technique parameters ([98698b0](https://github.com/florafauna-ai/flora-typescript/commit/98698b083acc8ff8b0efcc175bb0a16b03b72830))
* hide the `feedback` endpoint from non-MCP SDK outputs ([09ef8f5](https://github.com/florafauna-ai/flora-typescript/commit/09ef8f513333e7b51afbf28935576174fc3214a9))

## 0.2.0 (2026-05-13)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.1.0...v0.2.0)

Expands the asset and run resources and adds tooling to keep the SDK synced with the API.

### Features

* refresh asset upload and run resources against the latest OpenAPI spec ([2d27b73](https://github.com/florafauna-ai/flora-typescript/commit/2d27b73ed76d7cf4fb99bc6a150de7402405a91c), [1aa34f8](https://github.com/florafauna-ai/flora-typescript/commit/1aa34f83d3f685d9bcefd2d75ae8e8ff03c6fb29))
* add a script to pull and update the OpenAPI spec ([6fa3e9d](https://github.com/florafauna-ai/flora-typescript/commit/6fa3e9de888767200e134845b91ca6e4f4b5522f))
* update the bundled OpenAPI spec ([138e0de](https://github.com/florafauna-ai/flora-typescript/commit/138e0de0b7d5bf9b5ca4702ca80621bbf7ef04de))

## 0.1.0 (2026-05-12)

Full Changelog: [v0.0.2...v0.1.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.0.2...v0.1.0)

First minor release of the Flora TypeScript SDK.

### Features

* generate the client against the current API version ([a25084c](https://github.com/florafauna-ai/flora-typescript/commit/a25084cb3c986eea234bfcddf670756624f14947))

## 0.0.2 (2026-05-12)

Full Changelog: [v0.0.1...v0.0.2](https://github.com/florafauna-ai/flora-typescript/compare/v0.0.1...v0.0.2)

Initial generator setup for the SDK.

### Chores

* sync generated SDK settings ([f50ec3a](https://github.com/florafauna-ai/flora-typescript/commit/f50ec3a51d59f6f915e80dce555d47f836dab416), [87b3efa](https://github.com/florafauna-ai/flora-typescript/commit/87b3efa46adc58a0af2e769975b8c7a511c7899d), [1976d8b](https://github.com/florafauna-ai/flora-typescript/commit/1976d8b43f448f61ad24f6c27a4391e43c9bce6f), [20d4061](https://github.com/florafauna-ai/flora-typescript/commit/20d4061d4d8604545a2f628911a7cbda47669df1), [10b1cbf](https://github.com/florafauna-ai/flora-typescript/commit/10b1cbfc220933e2f95878e2f21480f7776c47c8))
</content>
