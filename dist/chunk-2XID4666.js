// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "strict";
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
      const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-63V5QL5L.js");
      token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      if (token) {
        console.log("[token] Found encrypted CRF cookie");
      }
    } catch (e) {
      console.error("[token] Decryption error for CRF:", e);
    }
    if (!token) {
      token = cookieStore.get("access_token")?.value || null;
      if (token) {
        console.log("[token] Found plain access_token cookie");
      }
    }
    if (token) return token;
    console.error(
      "[token] No token found in strict mode. Available cookies:",
      cookieStore.getAll().map((c) => c.name)
    );
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
        const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-63V5QL5L.js");
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        if (token) {
          console.log("[token:auto] Found encrypted CRF cookie");
        }
      } catch (e) {
        console.error("[token:auto] Decryption error for CRF:", e);
      }
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
        if (token) {
          console.log("[token:auto] Found plain access_token cookie");
        }
      }
      if (token) return token;
      console.warn(
        "[token:auto] No token found. Available cookies:",
        cookieStore.getAll().map((c) => c.name)
      );
    } catch (e) {
      console.error("[token:auto] Error reading cookies:", e);
    }
  }
  if (typeof window !== "undefined") {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };
    const clientToken = getCookie("access_token");
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
