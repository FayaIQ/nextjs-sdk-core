export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// Environment variable to control behavior
const AUTH_MODE = process.env.AUTH_MODE || "strict"; // "auto" | "strict"

// Use React.cache to memoize token fetching within a single request
let cachedGetToken: () => Promise<string>;
try {
  const { cache } = require("react");
  cachedGetToken = cache(getTokenImpl);
} catch {
  // Fallback if react cache not available
  cachedGetToken = getTokenImpl;
}

/**
 * Internal implementation of token fetching
 */
async function getTokenImpl(): Promise<string> {
  const USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
  
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");

    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    const err = new Error("Unauthorized: Access token missing (strict mode enabled)");
    // attach HTTP status for callers that inspect it
    (err as any).status = 401;
    throw err;
  }
  
  // AUTO MODE: check existing token first (server cookies)
  try {
    if (typeof window === "undefined") {
      // server: read cookie via next/headers
      const { cookies } = await import("next/headers");
      const cookie = await cookies();
      const accessTokenCookie = cookie.get("access_token")?.value;
      if (accessTokenCookie) {
        console.log("[token:getToken] using existing access_token from cookie");
        return accessTokenCookie;
      }
    }
  } catch (e) {
    // ignore errors while probing for existing token and fall back to sign-in below
  }
  
  // No existing token found - if USE_TOKEN_ROUTE enabled, call the route handler ONCE (client-only)
  // IMPORTANT: Avoid calling the token route during server render to prevent Dynamic server usage errors.
  if (USE_TOKEN_ROUTE && typeof window !== "undefined") {
    try {
      console.log("[token:getToken] no cookie found (client), calling /api/auth/token ONCE to set cookie");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                      'http://localhost:3000';
      
      const res = await fetch(`${baseUrl}/api/auth/token`, {
        cache: "no-store", // Don't cache the route response, we want the cookie
      } as any);
      
      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          console.log("[token:getToken] token route set cookie, returning token");
          
          return data.access_token;
        }
      }
      console.log("[token:getToken] token route failed, falling back to direct sign-in");
    } catch (e) {
      console.log("[token:getToken] token route error, falling back to direct sign-in", e);
    }
  }

  // No existing token found — perform signin to fetch a new token
  const { getAuthConfig } = await import("./core/config");
  const { Api } = await import("./api/api");
  const authConfig = getAuthConfig();

  // Try to leverage third-party ID token if present (saved by login with thirdPartyToken)
  let thirdPartyToken: string | undefined = undefined;
  try {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookie = await cookies();
      console.log("[token:getToken] tp_id cookie value", { value: cookie.get("tp_id")?.value });
      // Read obfuscated cookie name
      thirdPartyToken = cookie.get("tp_id")?.value;
    }
  } catch {}

  const requestBody: Record<string, any> = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false,
  };

  // If tp_id exists, use it for third-party auth
  if (thirdPartyToken) {
    console.log("[token:getToken] using tp_id for sign-in");
    requestBody["ThirdPartyToken"] = thirdPartyToken;
  } else if ((authConfig as any).thirdPartyToken) {
    console.log("[token:getToken] using config thirdPartyToken for sign-in");
    requestBody["ThirdPartyToken"] = (authConfig as any).thirdPartyToken;
  } else {
    // No tp_id: sign in with only clientId and clientSecret
    console.log("[token:getToken] no tp_id, signing in with clientId/clientSecret only");
  }

  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Enable Next.js caching for 1 hour in AUTO mode
    ...(AUTH_MODE === "auto" ? { next: { revalidate: 3600 } } : {}),
    body: JSON.stringify({
      ...requestBody,
      ...(requestBody["ThirdPartyToken"]
        ? { ThirdPartyAuthType: 100 }
        : {}),
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

  console.log("[token:getToken] sign-in successful, got access_token");

  
  return data.access_token;
}

/**
 * Retrieves or generates an access token based on the configured mode.
 *
 * Modes:
 * - "auto": automatically logs in if token missing or expired
 * - "strict": throws Unauthorized error if no token exists
 * 
 * For persistent cookie storage in AUTO mode, wire up the token route handler:
 * ```ts
 * // app/api/auth/token/route.ts
 * export { GET } from "erp-core/identity";
 * ```
 * Then set USE_TOKEN_ROUTE=true in your env
 * 
 * This function is automatically memoized per-request using React.cache()
 */
export default function getToken(): Promise<string> {
  return cachedGetToken();
}
