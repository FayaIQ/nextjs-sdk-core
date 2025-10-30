// src/token.ts
var AUTH_MODE = process.env.STOREAK_AUTH_MODE || "auto";
async function getToken() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    console.log("Access Token Cookie:", accessTokenCookie);
    console.log("AUTH_MODE:", AUTH_MODE);
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    throw new Error("Unauthorized: Access token missing (strict mode enabled)");
  }
  const { getAuthConfig } = await import("./config-EU6B2XSH.js");
  const { postWithoutAuth } = await import("./fetcher-U7GVW2NE.js");
  const { Api } = await import("./api-RRFLYPBZ.js");
  const authConfig = getAuthConfig();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    username: authConfig.username,
    password: authConfig.password,
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
