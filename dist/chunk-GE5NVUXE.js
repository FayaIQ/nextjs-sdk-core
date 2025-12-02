// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
async function getToken() {
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
    requestBody["ThirdPartyToken"] = thirdPartyToken;
  } else if (authConfig.thirdPartyToken) {
    requestBody["ThirdPartyToken"] = authConfig.thirdPartyToken;
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
  try {
    if (AUTH_MODE === "auto" && typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      cookieStore.set("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600
      });
    }
  } catch (e) {
  }
  return data.access_token;
}

export {
  getToken
};
