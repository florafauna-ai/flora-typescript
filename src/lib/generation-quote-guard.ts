import { fetcher, type FetchFunction } from "../generated/core/fetcher/Fetcher.js"
import { FloraError } from "../generated/errors/FloraError.js"

/** Older APIs discard unknown body fields; never send quote=true to one. */
export function guardGenerationQuotes(delegate: FetchFunction = fetcher): FetchFunction {
  return async (args) => {
    const url = new URL(args.url)
    const body = args.body
    if (
      args.method === "POST" &&
      /\/(?:generate|runs\/generation)\/?$/.test(url.pathname) &&
      typeof body === "object" &&
      body !== null &&
      "quote" in body &&
      body.quote === true
    ) {
      if (!/\/api\/v1\/(?:generate|runs\/generation)\/?$/.test(url.pathname)) {
        throw new FloraError({
          message:
            "Cannot locate quote capability for this API path. No generation request was sent.",
        })
      }
      const release = await delegate<{ publicApiFeatures?: unknown }>({
        url: new URL(
          url.pathname.replace(/\/api\/v1\/(?:generate|runs\/generation)\/?$/, "/api/meta/release"),
          url.origin,
        ).href,
        method: "GET",
        headers: args.headers,
        responseType: "json",
        maxRetries: 0,
        timeoutMs: Math.min(args.timeoutMs ?? 2000, 2000),
        abortSignal: args.abortSignal,
        fetchFn: args.fetchFn,
      })
      if (
        !release.ok ||
        !Array.isArray(release.body?.publicApiFeatures) ||
        !release.body.publicApiFeatures.includes("generation_quote")
      ) {
        throw new FloraError({
          message:
            "This API deployment does not advertise generation_quote support. No generation request was sent.",
        })
      }
    }
    return delegate(args)
  }
}
