// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
async function getTokenImpl() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    let token = null;
    try {
      const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-2O2AMKQX.js");
      token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    } catch {
    }
    if (!token) {
      token = cookieStore.get("access_token")?.value || null;
    }
    if (token) return token;
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    err.status = 401;
    throw err;
  }
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      let token = null;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-2O2AMKQX.js");
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      } catch {
      }
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
      }
      if (token) return token;
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
        if (data2.access_token) return data2.access_token;
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
    ...AUTH_MODE === "auto" ? { next: { revalidate: 0 } } : {},
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
  return data.access_token;
}
function getToken() {
  return getTokenImpl();
}

export {
  getToken
};
