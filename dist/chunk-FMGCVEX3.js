// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
async function getTokenImpl() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    let token = null;
    try {
      const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-Y26Y3HEV.js");
      token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    } catch {
    }
    if (!token) {
      token = cookieStore.get("session_id")?.value || null;
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
        const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-Y26Y3HEV.js");
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      } catch {
      }
      if (!token) {
        token = cookieStore.get("session_id")?.value || null;
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
        const data = await res.json();
        if (data.access_token) return data.access_token;
      }
    } catch {
    }
  }
  return Promise.reject(new Error("Token retrieval not implemented"));
}
function getToken() {
  return getTokenImpl();
}

export {
  getToken
};
