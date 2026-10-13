import { GenerationsClient as GeneratedGenerationsClient } from "../generated/api/resources/generations/client/Client.js"
import type { HttpResponsePromise } from "../generated/core/index.js"
import type { Flora } from "../index.js"

type Quote = Flora.GenerationQuote
type Run = Exclude<Flora.CreateGenerationsResponse, Quote>

/** Preserve the run return type when callers do not request a quote. */
export class GenerationsClient extends GeneratedGenerationsClient {
  public override create(
    request: Flora.CreateGenerationsRequest & { quote: true },
    options?: GeneratedGenerationsClient.RequestOptions,
  ): HttpResponsePromise<Quote>
  public override create(
    request: Flora.CreateGenerationsRequest & { quote?: false },
    options?: GeneratedGenerationsClient.RequestOptions,
  ): HttpResponsePromise<Run>
  public override create(
    request: Flora.CreateGenerationsRequest,
    options?: GeneratedGenerationsClient.RequestOptions,
  ): HttpResponsePromise<Flora.GenerationCreateResult>
  public override create(
    request: Flora.CreateGenerationsRequest,
    options?: GeneratedGenerationsClient.RequestOptions,
  ): HttpResponsePromise<Flora.GenerationCreateResult> {
    return super.create(request, options)
  }
}
