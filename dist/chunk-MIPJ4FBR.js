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
  const { getAuthConfig } = await import("./config-EU6B2XSH.js");
  const { Api } = await import("./api-63HUKTMR.js");
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
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }
  return data.access_token;
}

export {
  getToken
};
