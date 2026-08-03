import { Api } from "../api/api";
import { getAuthConfig, getErpTokenConfig } from "../core/config";
import { postWithoutAuth } from "../core/fetcher";
import {
  getErpTokenRuntime,
  getOrGenerateErpToken,
  proofStateKey,
  type AuthProof,
} from "../erp-token-state";
import { COOKIE_NAMES, ensureErpBrowserId } from "../utils/cookie";

export interface LoginRequest {
  username?: string;
  password?: string;
  playerId?: string;
  thirdPartyToken?: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  playerId: string;
  storeIDRegisteredWith: number;
  gender: number;
  birthdate: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires: number;
  employeeStoreId?: number;
  roles?: string[];
  user?: User;
  [key: string]: unknown;
}

async function requestAuthenticatedToken(
  credentials: LoginRequest,
  idempotencyKey: string,
  userAgent?: string,
): Promise<LoginResponse> {
  const config = getAuthConfig();
  const body: Record<string, unknown> = {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    Language: config.language ?? 0,
    GMT: config.gmt ?? 3,
    IsFromNotification: false,
    ...(credentials.playerId ? { playerId: credentials.playerId } : {}),
  };
  if (credentials.thirdPartyToken) {
    body.ThirdPartyToken = credentials.thirdPartyToken;
    body.ThirdPartyAuthType = 100;
  } else {
    const username = credentials.username || config.username;
    const password = credentials.password || config.password;
    if (!username || !password) throw new Error("Username/password or a verified third-party credential is required");
    body.username = username;
    body.password = password;
  }
  const response = await postWithoutAuth<LoginResponse>(Api.signIn, body, {
    "Idempotency-Key": idempotencyKey,
    ...(userAgent ? { "User-Agent": userAgent } : {}),
  });
  if (!response.access_token) throw new Error("Invalid login response: missing access token");
  return response;
}

/**
 * Explicit login is an accepted visit boundary. The returned access token is
 * used only to populate server-side state and is removed from the public
 * handler response.
 */
export async function loginUser(credentials: LoginRequest, userAgent?: string): Promise<LoginResponse> {
  if (typeof window !== "undefined") {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
    return response.json();
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  // Remove legacy credential cookies. The browser keeps only an opaque identity;
  // proof and ERP token material are held in the configured server store.
  cookieStore.delete(COOKIE_NAMES.SESSION_ID);
  cookieStore.delete(COOKIE_NAMES.CRF);
  cookieStore.delete(COOKIE_NAMES.TP_ID);
  const browserId = ensureErpBrowserId(cookieStore, getErpTokenConfig().browserCookieTtlSeconds);
  const runtime = getErpTokenRuntime();
  const tenantKey = runtime.tenantKey || "default";
  let proof: AuthProof | null = null;
  if (credentials.thirdPartyToken && runtime.verifyAuthProof) {
    proof = await runtime.verifyAuthProof(credentials.thirdPartyToken);
  }

  // A verified provider identity is preferred. For legacy ERP-only login the
  // ERP response is the only available verified identity and cannot renew
  // automatically without an application-provided renewable grant.
  const actorId = proof?.actorId || `login:${credentials.username || "third-party"}`;
  let loginResponse: LoginResponse | null = null;
  const state = await getOrGenerateErpToken({
    browserId,
    tenantKey,
    authState: "authenticated",
    actorId,
    userId: proof?.userId,
    firebaseUid: proof?.firebaseUid,
    reason: "login",
    issue: async (idempotencyKey) => {
      loginResponse = await requestAuthenticatedToken(credentials, idempotencyKey, userAgent);
      return {
        accessToken: loginResponse.access_token,
        backendExpiresAt: loginResponse.expires ? Date.now() + loginResponse.expires * 1000 : undefined,
      };
    },
  });

  if (proof && runtime.store.setProof) {
    await runtime.store.setProof(proofStateKey(tenantKey, browserId), proof);
  }

  return {
    ...(loginResponse || { access_token: state.accessToken, token_type: "Bearer", expires: 0 }),
    // Kept for direct server callers only. Route handlers intentionally omit it.
    access_token: state.accessToken,
  } as LoginResponse;
}
