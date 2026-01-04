// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
async function getTokenImpl() {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    if (headerToken) {
      return headerToken;
    }
  }
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    let token = null;
    try {
      const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-QTBNOWAP.js");
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
      const { headers } = await import("next/headers");
      const headerToken = (await headers()).get("x-access-token");
      let token = null;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-QTBNOWAP.js");
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      } catch {
      }
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
      }
      if (headerToken) {
        return headerToken;
      }
      if (token) return token;
    } catch {
    }
  }
  if (typeof window !== "undefined") {
    const clientToken = localStorage.getItem("access_token");
    if (clientToken) {
      return clientToken;
    }
    throw new Error("No token available on client side");
  }
  throw new Error("No token available");
}
function getToken() {
  return getTokenImpl();
}

export {
  getToken
};
