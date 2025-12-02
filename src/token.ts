export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// ENV
const AUTH_MODE = process.env.AUTH_MODE || "auto"; // auto | strict
const USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";

// -------------------------------
// GLOBAL TOKEN CACHE (Fixes login spam)
// -------------------------------
if (!(globalThis as any).__AUTH_CACHE) {
  (globalThis as any).__AUTH_CACHE = {
    token: null as string | null,
    expiresAt: 0
  };
}
const AUTH_CACHE = (globalThis as any).__AUTH_CACHE;

// -------------------------------
// React.cache wrapper (per-request memo)
// -------------------------------
let cachedGetToken: () => Promise<string>;
try {
  const { cache } = require("react");
  cachedGetToken = cache(getTokenImpl);
} catch {
  cachedGetToken = getTokenImpl;
}

// ------------------------------------------------
// INTERNAL TOKEN LOGIC (with global caching)
// ------------------------------------------------
async function getTokenImpl(): Promise<string> {
  // 🟢 1. if token exists globally and is not expired → reuse it
  if (AUTH_CACHE.token && Date.now() < AUTH_CACHE.expiresAt) {
    return AUTH_CACHE.token;
  }

  // 🟢 2. STRICT MODE → token must exist in cookie
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const ck = (await cookieStore).get("access_token")?.value;

    if (ck) {
      // store in global cache for next calls
      AUTH_CACHE.token = ck;
      AUTH_CACHE.expiresAt = Date.now() + 1000 * 60 * 60; // assume 1hr
      return ck;
    }

    const err = new Error("Unauthorized: Access token missing (strict mode)");
    (err as any).status = 401;
    throw err;
  }

  // 🟢 3. AUTO MODE → check if token exists via SSR cookies
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const ck = cookieStore.get("access_token")?.value;

      if (ck) {
        AUTH_CACHE.token = ck;
        AUTH_CACHE.expiresAt = Date.now() + 1000 * 60 * 60;
        return ck;
      }
    } catch {}
  }

  // 🟢 4. (CLIENT ONLY) use /api/auth/token route to set cookie
  if (USE_TOKEN_ROUTE && typeof window !== "undefined") {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
        "http://localhost:3000";

      const res = await fetch(`${baseUrl}/api/auth/token`, {
        cache: "no-store",
      } as any);

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          AUTH_CACHE.token = data.access_token;
          AUTH_CACHE.expiresAt = Date.now() + 1000 * 60 * 60;
          return data.access_token;
        }
      }
    } catch {}
  }

  // 🟢 5. NO TOKEN FOUND → perform sign-in ONCE
  const { getAuthConfig } = await import("./core/config");
  const { Api } = await import("./api/api");

  const authConfig = getAuthConfig();

  // Third-party token
  let thirdPartyToken: string | undefined = undefined;

  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore =await cookies();
      thirdPartyToken = cookieStore.get("tp_id")?.value;
    } catch {}
  }

  const requestBody: Record<string, any> = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false,
  };

  if (thirdPartyToken) {
    requestBody["ThirdPartyToken"] = thirdPartyToken;
  } else if ((authConfig as any).thirdPartyToken) {
    requestBody["ThirdPartyToken"] = (authConfig as any).thirdPartyToken;
  }

  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...(AUTH_MODE === "auto" ? { next: { revalidate: 3600 } } : {}),
    body: JSON.stringify({
      ...requestBody,
      ...(requestBody["ThirdPartyToken"] ? { ThirdPartyAuthType: 100 } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as TokenResponse;

  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }

  // 🟢 6. SAVE TOKEN IN GLOBAL CACHE
  AUTH_CACHE.token = data.access_token;
  AUTH_CACHE.expiresAt =
    Date.now() + (data.expires_in ? data.expires_in * 1000 : 3600 * 1000);

  return data.access_token;
}

// -------------------------------
// PUBLIC API
// -------------------------------
export default function getToken(): Promise<string> {
  return cachedGetToken();
}
