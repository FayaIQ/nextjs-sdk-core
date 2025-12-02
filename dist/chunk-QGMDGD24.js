// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
async function getToken() {
  const USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    const err = new Error("Unauthorized: Access token missing (strict mode enabled)");
    err.status = 401;
    throw err;
  }
  if (USE_TOKEN_ROUTE && typeof window === "undefined") {
    try {
      console.log("[token:getToken] using /api/auth/token route for persistent cookies");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/token`, {
        next: { revalidate: 3600, tags: ["auth-token"] }
      });
      if (res.ok) {
        const data2 = await res.json();
        if (data2.access_token) {
          return data2.access_token;
        }
      }
    } catch (e) {
      console.log("[token:getToken] token route failed, falling back to direct sign-in");
    }
  }
  try {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookie = await cookies();
      console.log("[token:getToken] checking existing access_token cookie (server)");
      const accessTokenCookie = cookie.get("access_token")?.value;
      console.log("[token:getToken] access_token cookie value");
      if (accessTokenCookie) return accessTokenCookie;
    }
  } catch (e) {
  }
  const { getAuthConfig } = await import("./config-KT5WSV3V.js");
  const { Api } = await import("./api-QG2WVXL6.js");
  const authConfig = getAuthConfig();
  let thirdPartyToken = void 0;
  try {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookie = await cookies();
      console.log("[token:getToken] tp_id cookie value", { value: cookie.get("tp_id")?.value });
      thirdPartyToken = cookie.get("tp_id")?.value;
    }
  } catch {
  }
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  if (thirdPartyToken) {
    console.log("[token:getToken] using tp_id for sign-in");
    requestBody["ThirdPartyToken"] = thirdPartyToken;
  } else if (authConfig.thirdPartyToken) {
    console.log("[token:getToken] using config thirdPartyToken for sign-in");
    requestBody["ThirdPartyToken"] = authConfig.thirdPartyToken;
  } else {
    console.log("[token:getToken] no tp_id, signing in with clientId/clientSecret only");
  }
  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Enable Next.js caching for 1 hour in AUTO mode
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
  console.log("[token:getToken] sign-in successful, got access_token");
  return data.access_token;
}

export {
  getToken
};
