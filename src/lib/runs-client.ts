import { RunsClient as GeneratedRunsClient } from "../generated/api/resources/runs/client/Client.js"
import type { HttpResponsePromise } from "../generated/core/index.js"
import type { Flora } from "../index.js"

type Quote = Flora.GenerationQuote
type Run = Exclude<Flora.StartGenerationRunsResponse, Quote>

/** Keep the deprecated generation alias compatible with ordinary run callers. */
export class RunsClient extends GeneratedRunsClient {
  public override startGeneration(
    request: Flora.StartGenerationRunsRequest & { quote: true },
    options?: GeneratedRunsClient.RequestOptions,
  ): HttpResponsePromise<Quote>
  public override startGeneration(
    request: Flora.StartGenerationRunsRequest & { quote?: false },
    options?: GeneratedRunsClient.RequestOptions,
  ): HttpResponsePromise<Run>
  public override startGeneration(
    request: Flora.StartGenerationRunsRequest,
    options?: GeneratedRunsClient.RequestOptions,
  ): HttpResponsePromise<Flora.GenerationCreateResult>
  public override startGeneration(
    request: Flora.StartGenerationRunsRequest,
    options?: GeneratedRunsClient.RequestOptions,
  ): HttpResponsePromise<Flora.GenerationCreateResult> {
    return super.startGeneration(request, options)
  }
}
