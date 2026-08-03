import { Api } from "./api/api";
import { getAuthConfig } from "./core/config";
import { postWithoutAuth } from "./core/fetcher";
import {
  getErpTokenRuntime,
  getOrGenerateErpToken,
  isReusableToken,
  proofStateKey,
  tokenStateKey,
  type IssuedErpToken,
} from "./erp-token-state";
import { COOKIE_NAMES } from "./utils/cookie";

export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

export class ReauthenticationRequiredError extends Error {
  readonly reauthenticationRequired = true;
  constructor() {
    super("Authenticated ERP token expired and no renewable authentication proof is available");
    this.name = "ReauthenticationRequiredError";
  }
}

async function issueAnonymousToken(idempotencyKey: string): Promise<IssuedErpToken> {
  const config = getAuthConfig();
  const response = await postWithoutAuth<TokenResponse>(Api.signIn, {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    Language: config.language ?? 0,
    GMT: config.gmt ?? 3,
    IsFromNotification: false,
  }, { "Idempotency-Key": idempotencyKey });
  if (!response.access_token) throw new Error("ERP sign-in did not return an access token");
  return {
    accessToken: response.access_token,
    backendExpiresAt: response.expires_in ? Date.now() + response.expires_in * 1000 : undefined,
  };
}

/**
 * Server-only raw ERP-token accessor. Browser code receives no ERP token: it
 * only carries `erp_browser_id`, while the token remains in the shared store.
 */
async function getTokenImpl(): Promise<string> {
  if (typeof window !== "undefined") {
    throw new Error("ERP access tokens are server-only; call an SDK API route instead");
  }

  const { headers, cookies } = await import("next/headers");
  const requestHeaders = await headers();
  // A consumer middleware may resolve the state once and pass the raw token to
  // server components. It is still never exposed to client JavaScript.
  const injected = requestHeaders.get("x-erp-access-token") || requestHeaders.get("x-access-token");
  if (injected) return injected;

  const cookieStore = await cookies();
  const browserId = cookieStore.get(COOKIE_NAMES.ERP_BROWSER_ID)?.value;
  if (!browserId) {
    const error = new Error("ERP browser identity is missing; initialize /api/auth/token from a qualifying request");
    (error as Error & { status?: number }).status = 401;
    throw error;
  }

  const runtime = getErpTokenRuntime();
  const tenantKey = runtime.tenantKey || "default";
  const key = tokenStateKey(tenantKey, browserId);
  const current = await runtime.store.get(key);
  const now = runtime.now?.() ?? Date.now();
  if (current && isReusableToken(current, current, now)) return current.accessToken;

  if (current?.authState === "authenticated") {
    const proof = await runtime.store.getProof?.(proofStateKey(tenantKey, browserId));
    if (!proof || proof.expiresAt <= now || !runtime.renewAuthenticatedToken) {
      throw new ReauthenticationRequiredError();
    }
    const renewed = await getOrGenerateErpToken({
      browserId,
      tenantKey,
      authState: "authenticated",
      actorId: proof.actorId,
      userId: proof.userId,
      firebaseUid: proof.firebaseUid,
      reason: "renew",
      issue: (idempotencyKey) => runtime.renewAuthenticatedToken!(proof, idempotencyKey),
    });
    return renewed.accessToken;
  }

  const anonymous = await getOrGenerateErpToken({
    browserId,
    tenantKey,
    authState: "anonymous",
    actorId: `browser:${browserId}`,
    reason: "anonymous",
    issue: issueAnonymousToken,
  });
  return anonymous.accessToken;
}

export default function getToken(): Promise<string> {
  return getTokenImpl();
}

/**
 * Request-oriented accessor for middleware/API routes. A verified bot company
 * receives one server-side state key per tenant for the commercial window.
 * An unverified Googlebot user-agent is intentionally handled as a normal
 * browser request and cannot join a verified company's state.
 */
export async function getErpTokenForRequest(request: Request, browserId: string): Promise<string> {
  const runtime = getErpTokenRuntime();
  const tenantKey = runtime.tenantKey || "default";
  const identity = await runtime.botIdentityResolver?.resolve(request);
  if (identity?.verified) {
    const token = await getOrGenerateErpToken({
      browserId: `bot:${identity.botCompanyId}`,
      tenantKey,
      authState: "anonymous",
      actorId: `bot:${identity.botCompanyId}`,
      reason: "bot",
      lockKey: `lock:erp-token:bot:${tenantKey}:${identity.botCompanyId}`,
      issue: issueAnonymousToken,
    });
    return token.accessToken;
  }
  return getOrGenerateErpToken({
    browserId,
    tenantKey,
    authState: "anonymous",
    actorId: `browser:${browserId}`,
    reason: "anonymous",
    issue: issueAnonymousToken,
  }).then((state) => state.accessToken);
}

/** Mark a rejected token invalid so the next server operation can replace it once. */
export async function markCurrentErpTokenRevoked(): Promise<void> {
  if (typeof window !== "undefined") return;
  const { cookies } = await import("next/headers");
  const browserId = (await cookies()).get(COOKIE_NAMES.ERP_BROWSER_ID)?.value;
  if (!browserId) return;
  const runtime = getErpTokenRuntime();
  const key = tokenStateKey(runtime.tenantKey || "default", browserId);
  const state = await runtime.store.get(key);
  if (state) await runtime.store.set(key, { ...state, revoked: true });
}

export { issueAnonymousToken };
