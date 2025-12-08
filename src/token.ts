export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// ENV
const AUTH_MODE = process.env.AUTH_MODE || "auto"; // auto | strict
const USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";

// ------------------------------------------------
// SINGLE SOURCE OF TRUTH — NO CACHING
// ------------------------------------------------
async function getTokenImpl(): Promise<string> {
  // 🟢 1. STRICT MODE → token must exist in cookie (SSR)
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    // Try encrypted crf first
    let token: string | null = null;
    try {
      const { getEncryptedCookie, COOKIE_NAMES } = await import(
        "./utils/cookie"
      );
      token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    } catch {}

    // Fallback to legacy access_token
    if (!token) {
      token = cookieStore.get("access_token")?.value || null;
    }

    if (token) return token;

    const err = new Error("Unauthorized: Access token missing (strict mode)");
    (err as any).status = 401;
    throw err;
  }

  // 🟢 2. AUTO MODE → SSR cookie check
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      // Try encrypted crf first
      let token: string | null = null;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import(
          "./utils/cookie"
        );
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      } catch {}

      // Fallback to legacy access_token
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
      }

      if (token) return token;
    } catch {}
  }

  // 🟢 3. CLIENT → use /api/auth/token if enabled
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
        if (data.access_token) return data.access_token;
      }
    } catch {}
  }

  // 🟢 4. FULL LOGIN (NO CACHE)
  const { getAuthConfig } = await import("./core/config");
  const { Api } = await import("./api/api");

  const authConfig = getAuthConfig();

  let thirdPartyToken: string | undefined = undefined;

  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
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
    ...(AUTH_MODE === "auto" ? { next: { revalidate: 0 } } : {}),
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
  console.log("Fetched token from core:", data.access_token);
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }

  return data.access_token;
}

// -------------------------------
// PUBLIC API (NO MEMOIZATION)
// -------------------------------
export default function getToken(): Promise<string> {
  return getTokenImpl();
}
