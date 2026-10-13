/** Workspace IDs are opaque, server-derived and ready for token exchange. */
export interface GrantedWorkspaces {
  /** Stable verified Flora user ID, scoped to this deployment's account database. */
  account_id: string
  /**
   * The identity provider's subject for the same user: the ID FLORA's web app knows them by.
   * Recognizes one person across FLORA apps; key saved choices by `account_id`, not this.
   */
  sub?: string
  workspaces: Array<{ id: string; name: string }>
}
export interface DeviceRootToken extends GrantedWorkspaces {
  access_token: string
  token_type: "Bearer"
  expires_in: number
  refresh_token: string
  scope: string
  resource: string
}
export type DeviceRootTokenRequest =
  | { grant_type: "refresh_token"; client_id: string; refresh_token: string }
  | {
      grant_type: "urn:ietf:params:oauth:grant-type:device_code"
      client_id: string
      device_code: string
    }
  | {
      grant_type: "authorization_code"
      client_id: string
      code: string
      code_verifier: string
      redirect_uri: string
    }

export class DeviceLoginError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly interval?: number,
  ) {
    super(`Device login request failed (HTTP ${status}, ${code})`)
    this.name = "DeviceLoginError"
  }
}

function protocolError(status: number): never {
  throw new DeviceLoginError(status, "invalid_response")
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}
function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}
function grantedWorkspaces(value: unknown, status: number): GrantedWorkspaces {
  if (
    !record(value) ||
    !nonempty(value.account_id) ||
    (value.sub !== undefined && !nonempty(value.sub)) ||
    !Array.isArray(value.workspaces)
  )
    protocolError(status)
  const workspaces = value.workspaces.map((workspace: unknown) => {
    if (!record(workspace) || !nonempty(workspace.id) || typeof workspace.name !== "string")
      protocolError(status)
    return { id: workspace.id, name: workspace.name }
  })
  if (new Set(workspaces.map((workspace) => workspace.id)).size !== workspaces.length)
    protocolError(status)
  return {
    account_id: value.account_id,
    ...(value.sub === undefined ? {} : { sub: value.sub }),
    workspaces,
  }
}
function rootToken(value: unknown, status: number, resource: string): DeviceRootToken {
  const identity = grantedWorkspaces(value, status)
  if (
    !record(value) ||
    !nonempty(value.access_token) ||
    value.token_type !== "Bearer" ||
    typeof value.expires_in !== "number" ||
    !Number.isFinite(value.expires_in) ||
    value.expires_in <= 0 ||
    !nonempty(value.refresh_token) ||
    typeof value.scope !== "string" ||
    value.resource !== resource
  )
    protocolError(status)
  return {
    ...identity,
    access_token: value.access_token,
    token_type: "Bearer",
    expires_in: value.expires_in,
    refresh_token: value.refresh_token,
    scope: value.scope,
    resource,
  }
}

/** Explicitly configured auth coordinator, independent of the product API's URL and bearer.
 * Never retries: replaying a root refresh revokes the credential family.
 * Serialize refresh and restart sign-in after ambiguous refresh results.
 */
export class DeviceLoginClient {
  private readonly origin: string
  private readonly fetcher: typeof fetch
  private readonly rootResource: string
  constructor(options: { baseURL: string; rootResource: string; fetch?: typeof fetch }) {
    const url = new URL(options.baseURL)
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/"
    ) {
      throw new Error("baseURL must be an HTTPS origin")
    }
    if (
      ![
        "https://www.florafauna.site/api/auth/grants",
        "https://app.flora.ai/api/auth/grants",
      ].includes(options.rootResource)
    ) {
      throw new Error("rootResource must be the configured preview or production root resource")
    }
    this.rootResource = options.rootResource
    this.origin = url.origin
    this.fetcher = options.fetch ?? globalThis.fetch
  }
  /** Redeem or refresh a root. Native Clerk credentials are not product credentials. */
  async token(request: DeviceRootTokenRequest): Promise<DeviceRootToken> {
    return await this.request(
      "/api/auth/grants/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      },
      (value, status) => rootToken(value, status, this.rootResource),
    )
  }
  /** Only root access credentials work; no account/workspace selector is accepted. */
  async listWorkspaces(rootAccessToken: string): Promise<GrantedWorkspaces> {
    return await this.request(
      "/api/auth/grants/workspaces",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${rootAccessToken}` },
      },
      grantedWorkspaces,
    )
  }
  private async request<T>(
    path: string,
    init: RequestInit,
    parse: (value: unknown, status: number) => T,
  ): Promise<T> {
    const response = await this.fetcher(this.origin + path, {
      ...init,
      redirect: "error",
      cache: "no-store",
      credentials: "omit",
    })
    // Do not place a credential-bearing response or request in an exception.
    if (!response.ok) {
      const body: unknown = await response.json().catch(() => null)
      const known = [
        "invalid_request",
        "invalid_token",
        "invalid_grant",
        "invalid_target",
        "invalid_scope",
        "authorization_pending",
        "access_denied",
        "expired_token",
        "slow_down",
        "temporarily_unavailable",
      ]
      const code =
        body &&
        typeof body === "object" &&
        "error" in body &&
        typeof body.error === "string" &&
        known.includes(body.error)
          ? body.error
          : "unknown_error"
      const interval =
        body &&
        typeof body === "object" &&
        "interval" in body &&
        typeof body.interval === "number" &&
        Number.isFinite(body.interval) &&
        body.interval >= 5 &&
        body.interval <= 60
          ? body.interval
          : undefined
      throw new DeviceLoginError(response.status, code, interval)
    }
    let body: unknown
    try {
      body = await response.json()
    } catch {
      protocolError(response.status)
    }
    return parse(body, response.status)
  }
}

/** Backward-compatible preview constructor; environment authorization remains server-side. */
export class PreviewDeviceLoginClient extends DeviceLoginClient {
  constructor(options: { previewBaseURL: string; fetch?: typeof fetch }) {
    super({
      baseURL: options.previewBaseURL,
      rootResource: "https://www.florafauna.site/api/auth/grants",
      fetch: options.fetch,
    })
  }
}
