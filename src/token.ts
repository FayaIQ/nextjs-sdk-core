export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// Environment variable to control behavior
const AUTH_MODE = process.env.AUTH_MODE || "auto"; // "auto" | "strict"

/**
 * Retrieves or generates an access token based on the configured mode.
 *
 * Modes:
 * - "auto": automatically logs in if token missing or expired
 * - "strict": throws Unauthorized error if no token exists
 */
export default async function getToken(): Promise<string> {
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
      if (accessTokenCookie) return accessTokenCookie;
    }
  } catch (e) {
    // ignore errors while probing for existing token and fall back to sign-in below
  }

  // No existing token found — perform signin to fetch a new token
  const { getAuthConfig } = await import("./core/config");
  const { Api } = await import("./api/api");
  const authConfig = getAuthConfig();

  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false,
  };

  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });


  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as TokenResponse;

  console.log("Authentication response " , data);

  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }

  return data.access_token;
}
