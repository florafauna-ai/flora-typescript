# Changelog

## 0.7.0 (2026-05-20)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.6.0...v0.7.0)

### Features

* **api:** api update ([7ba85df](https://github.com/florafauna-ai/flora-typescript/commit/7ba85dffef71e26fe06632cfc883d9b7dd676d8f))


### Chores

* **config:** hide deprecated /runs/* from docs, keep generating in SDKs ([839a6ef](https://github.com/florafauna-ai/flora-typescript/commit/839a6effbd8a1eb87c7146d1b254e532d8de433d))


### Documentation

* redirect README to developer.flora.ai, remove stale MCP install block ([3125ac1](https://github.com/florafauna-ai/flora-typescript/commit/3125ac15ae3e5b7a2d3d6db4d4b8bad29cbc39a0))

## 0.6.0 (2026-05-19)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.5.0...v0.6.0)

### Features

* add custom_casings to make client class name FLORA (all caps) ([8b663b4](https://github.com/florafauna-ai/flora-typescript/commit/8b663b4565524c031fcce9b7af50b1530219686b))
* redirect MCP OAuth to Clerk instead of API key form ([27ff4e8](https://github.com/florafauna-ai/flora-typescript/commit/27ff4e8a0b502a284587e133748079cefa5a5866))


### Bug Fixes

* pass Clerk access token as apiKey in MCPProps for Flora SDK ([d10aaf4](https://github.com/florafauna-ai/flora-typescript/commit/d10aaf40095bdc88bd207d3a37dd6f0e428356fb))
* revert to client_secret_post for Clerk token exchange ([706638f](https://github.com/florafauna-ai/flora-typescript/commit/706638fcdc4a20b4cff4add8cdb05b4b699cfd2c))
* **typescript:** upgrade tsc-multi so that it works with Node 26 ([8ed4f6d](https://github.com/florafauna-ai/flora-typescript/commit/8ed4f6d390d8cbb83dd6bf7ca7cc10f07ae30441))
* use client_secret_basic auth for Clerk token exchange ([fddb53e](https://github.com/florafauna-ai/flora-typescript/commit/fddb53e33b8214c5881818ff46a3878b8f24a319))


### Chores

* disable generate_cloudflare_worker — CF Worker hoisted to own repo ([e72c85a](https://github.com/florafauna-ai/flora-typescript/commit/e72c85ab3e6ecd77b48b2180f85d6493c8f06109))
* remove cloudflare-worker directory — hoisted to florafauna-ai/flora-mcp-worker ([77a09cd](https://github.com/florafauna-ai/flora-typescript/commit/77a09cd22e4034468d5209842236941201c05608))
* sync openapi spec from flora-frontend main ([7e89d53](https://github.com/florafauna-ai/flora-typescript/commit/7e89d53726eaf1c43dfdd1c76e342f5f10fa7d8a))
* **tests:** remove redundant File import ([701af7f](https://github.com/florafauna-ai/flora-typescript/commit/701af7f247846ec78f2dec2701c84d15ca67a384))
* update SDK settings ([8577bc0](https://github.com/florafauna-ai/flora-typescript/commit/8577bc0dbed47b6eb2da9cdbf129e513d8ed797f))
* update SDK settings ([18ee210](https://github.com/florafauna-ai/flora-typescript/commit/18ee21019865950d7ef1fc85e8ba8e7df5914be8))
* update SDK settings ([69436a3](https://github.com/florafauna-ai/flora-typescript/commit/69436a38603011d2056890443266aa08a81254ac))


### Styles

* fix prettier formatting in app.ts ([2e0afa9](https://github.com/florafauna-ai/flora-typescript/commit/2e0afa9e4540f825497a096e09041510346a20ae))

## 0.5.0 (2026-05-18)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.4.0...v0.5.0)

### Features

* use oauth_authorization_flow with Clerk for MCP server auth ([2d19792](https://github.com/florafauna-ai/flora-typescript/commit/2d19792ff87160460e66eb51ff987c3844836411))

## 0.4.0 (2026-05-18)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.3.0...v0.4.0)

### Features

* enable Cloudflare Worker generation for MCP server ([5fdf163](https://github.com/florafauna-ai/flora-typescript/commit/5fdf163fe8b65fa616ccc0e26944766a63e2541f))

## 0.3.0 (2026-05-15)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.2.0...v0.3.0)

### Features

* Add MCP OAuth resource metadata ([2c12390](https://github.com/florafauna-ai/flora-typescript/commit/2c12390e7f27e436acb48cf028532a04630c3829))
* Hide feedback endpoint from non-MCP outputs ([09ef8f5](https://github.com/florafauna-ai/flora-typescript/commit/09ef8f513333e7b51afbf28935576174fc3214a9))
* update api ver ([98698b0](https://github.com/florafauna-ai/flora-typescript/commit/98698b083acc8ff8b0efcc175bb0a16b03b72830))

## 0.2.0 (2026-05-13)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.1.0...v0.2.0)

### Features

* Add OpenAPI update script ([6fa3e9d](https://github.com/florafauna-ai/flora-typescript/commit/6fa3e9de888767200e134845b91ca6e4f4b5522f))
* **api:** api update ([2d27b73](https://github.com/florafauna-ai/flora-typescript/commit/2d27b73ed76d7cf4fb99bc6a150de7402405a91c))
* **api:** api update ([1aa34f8](https://github.com/florafauna-ai/flora-typescript/commit/1aa34f83d3f685d9bcefd2d75ae8e8ff03c6fb29))
* update oas ([138e0de](https://github.com/florafauna-ai/flora-typescript/commit/138e0de0b7d5bf9b5ca4702ca80621bbf7ef04de))

## 0.1.0 (2026-05-12)

Full Changelog: [v0.0.2...v0.1.0](https://github.com/florafauna-ai/flora-typescript/compare/v0.0.2...v0.1.0)

### Features

* **api:** api update ([a25084c](https://github.com/florafauna-ai/flora-typescript/commit/a25084cb3c986eea234bfcddf670756624f14947))

## 0.0.2 (2026-05-12)

Full Changelog: [v0.0.1...v0.0.2](https://github.com/florafauna-ai/flora-typescript/compare/v0.0.1...v0.0.2)

### Chores

* update SDK settings ([f50ec3a](https://github.com/florafauna-ai/flora-typescript/commit/f50ec3a51d59f6f915e80dce555d47f836dab416))
* update SDK settings ([87b3efa](https://github.com/florafauna-ai/flora-typescript/commit/87b3efa46adc58a0af2e769975b8c7a511c7899d))
* update SDK settings ([1976d8b](https://github.com/florafauna-ai/flora-typescript/commit/1976d8b43f448f61ad24f6c27a4391e43c9bce6f))
* update SDK settings ([20d4061](https://github.com/florafauna-ai/flora-typescript/commit/20d4061d4d8604545a2f628911a7cbda47669df1))
* update SDK settings ([10b1cbf](https://github.com/florafauna-ai/flora-typescript/commit/10b1cbfc220933e2f95878e2f21480f7776c47c8))
