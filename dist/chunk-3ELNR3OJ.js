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
      const accessTokenCookie = cookie.get("access_token")?.value;
      if (accessTokenCookie) return accessTokenCookie;
    }
  } catch (e) {
  }
  const { getAuthConfig } = await import("./config-KT5WSV3V.js");
  const { Api } = await import("./api-QG2WVXL6.js");
  const authConfig = getAuthConfig();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  console.log("Authentication response ", data);
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
