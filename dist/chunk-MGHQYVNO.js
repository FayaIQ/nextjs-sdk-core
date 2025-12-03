import {
  __require
} from "./chunk-3RG5ZIWI.js";

// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
if (!globalThis.__AUTH_CACHE) {
  globalThis.__AUTH_CACHE = {
    token: null,
    expiresAt: 0
  };
}
var AUTH_CACHE = globalThis.__AUTH_CACHE;
var cachedGetToken;
try {
  const { cache } = __require("react");
  cachedGetToken = cache(getTokenImpl);
} catch {
  cachedGetToken = getTokenImpl;
}
async function getTokenImpl() {
  if (AUTH_CACHE.token && Date.now() < AUTH_CACHE.expiresAt) {
    return AUTH_CACHE.token;
  }
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    const ck = (await cookieStore).get("access_token")?.value;
    if (ck) {
      AUTH_CACHE.token = ck;
      AUTH_CACHE.expiresAt = Date.now() + 1e3 * 60 * 60;
      return ck;
    }
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    err.status = 401;
    throw err;
  }
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const ck = cookieStore.get("access_token")?.value;
      if (ck) {
        AUTH_CACHE.token = ck;
        AUTH_CACHE.expiresAt = Date.now() + 1e3 * 60 * 60;
        return ck;
      }
    } catch {
    }
  }
  if (USE_TOKEN_ROUTE && typeof window !== "undefined") {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/auth/token`, {
        cache: "no-store"
      });
      if (res.ok) {
        const data2 = await res.json();
        if (data2.access_token) {
          AUTH_CACHE.token = data2.access_token;
          AUTH_CACHE.expiresAt = Date.now() + 1e3 * 60 * 60;
          return data2.access_token;
        }
      }
    } catch {
    }
  }
  const { getAuthConfig } = await import("./config-DIBWT45S.js");
  const { Api } = await import("./api-RO5SLBPK.js");
  const authConfig = getAuthConfig();
  let thirdPartyToken = void 0;
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      thirdPartyToken = cookieStore.get("tp_id")?.value;
    } catch {
    }
  }
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  if (thirdPartyToken) {
    requestBody["ThirdPartyToken"] = thirdPartyToken;
  } else if (authConfig.thirdPartyToken) {
    requestBody["ThirdPartyToken"] = authConfig.thirdPartyToken;
  }
  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    ...AUTH_MODE === "auto" ? { next: { revalidate: 3600 } } : {},
    body: JSON.stringify({
      ...requestBody,
      ...requestBody["ThirdPartyToken"] ? { ThirdPartyAuthType: 100 } : {}
    })
  });
  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }
  AUTH_CACHE.token = data.access_token;
  AUTH_CACHE.expiresAt = Date.now() + (data.expires_in ? data.expires_in * 1e3 : 3600 * 1e3);
  return data.access_token;
}
function getToken() {
  return cachedGetToken();
}

export {
  getToken
};
