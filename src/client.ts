import { FloraClient as GeneratedFloraClient } from "./generated/Client.js"
import { AssetsClient } from "./lib/assets-client.js"
import { Webhooks } from "./lib/webhooks.js"

/**
 * The FLORA API client.
 *
 * Extends the generated client with the helpers the OpenAPI document cannot
 * describe: `assets.upload` (multipart bytes, signed uploads, readiness
 * polling) and `webhooks` (signature verification, no network).
 */
export class FloraClient extends GeneratedFloraClient {
  public readonly webhooks: Webhooks = new Webhooks()

  public override get assets(): AssetsClient {
    if (!(this._assets instanceof AssetsClient)) {
      this._assets = new AssetsClient(this._options)
    }
    return this._assets as AssetsClient
  }
}
