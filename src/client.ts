import { FloraClient as GeneratedFloraClient } from "./generated/Client.js"
import { AssetsClient } from "./lib/assets-client.js"
import { guardGenerationQuotes } from "./lib/generation-quote-guard.js"
import { GenerationsClient } from "./lib/generations-client.js"
import { RunsClient } from "./lib/runs-client.js"
import { Webhooks } from "./lib/webhooks.js"

/**
 * The FLORA API client.
 *
 * Extends the generated client with the helpers the OpenAPI document cannot
 * describe: `assets.upload` (multipart bytes, signed uploads, readiness
 * polling) and `webhooks` (signature verification, no network).
 */
export class FloraClient extends GeneratedFloraClient {
  constructor(options: GeneratedFloraClient.Options = {}) {
    super({ ...options, fetcher: guardGenerationQuotes(options.fetcher) })
  }
  public readonly webhooks: Webhooks = new Webhooks()

  public override get generations(): GenerationsClient {
    if (!(this._generations instanceof GenerationsClient))
      this._generations = new GenerationsClient(this._options)
    return this._generations as GenerationsClient
  }

  public override get runs(): RunsClient {
    if (!(this._runs instanceof RunsClient)) this._runs = new RunsClient(this._options)
    return this._runs as RunsClient
  }

  public override get assets(): AssetsClient {
    if (!(this._assets instanceof AssetsClient)) {
      this._assets = new AssetsClient(this._options)
    }
    return this._assets as AssetsClient
  }
}
