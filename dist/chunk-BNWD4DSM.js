// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "strict";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
async function getTokenImpl() {
  console.log(`[token:getTokenImpl] Starting token retrieval. AUTH_MODE: ${AUTH_MODE}, USE_TOKEN_ROUTE: ${USE_TOKEN_ROUTE}, isServer: ${typeof window === "undefined"}`);
  if (typeof window === "undefined") {
    console.log("[token:getTokenImpl] Server-side execution, checking x-access-token header");
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    console.log(`[token:getTokenImpl] x-access-token header present: ${!!headerToken}`);
    if (headerToken) {
      console.log(`[token:getTokenImpl] Raw header token length: ${headerToken.length}`);
      console.log(`[token:getTokenImpl] Header token preview: ${headerToken.substring(0, 50)}...`);
      const { decryptUniversal } = await import("./crypto-NNIJ74XH.js");
      try {
        console.log("[token:getTokenImpl] Attempting to decrypt header token");
        const decryptedToken = await decryptUniversal(headerToken);
        if (decryptedToken) {
          console.log(`[token:getTokenImpl] Header token decrypted successfully, length: ${decryptedToken.length}`);
          console.log(`[token:getTokenImpl] Decrypted token preview: ${decryptedToken.substring(0, 20)}...${decryptedToken.substring(decryptedToken.length - 20)}`);
          try {
            const trimmed = decryptedToken.trim();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
              try {
                const parsed = JSON.parse(trimmed);
                if (parsed) {
                  const candidate = parsed.session_id || parsed.access_token || parsed.token || parsed.accessToken;
                  if (candidate && typeof candidate === "string") {
                    console.log("[token:getTokenImpl] Extracted token from decrypted JSON payload");
                    return candidate;
                  }
                }
              } catch (jsonErr) {
              }
            }
            const looksLikeJWT = trimmed.includes(".") && trimmed.split(".").length === 3;
            if (!looksLikeJWT) {
              const base64Pattern = /^[A-Za-z0-9+/=\n\r]+$/;
              if (base64Pattern.test(trimmed)) {
                try {
                  const decoded = Buffer.from(trimmed.replace(/\s+/g, ""), "base64").toString("utf8");
                  if (decoded && decoded.includes(".") && decoded.split(".").length === 3) {
                    console.log("[token:getTokenImpl] Base64-decoded decrypted payload into JWT");
                    return decoded;
                  }
                } catch (b64Err) {
                }
              }
            }
            return decryptedToken;
          } catch (extractErr) {
            console.log("[token:getTokenImpl] Error extracting token from decrypted payload, returning decrypted string", extractErr);
            return decryptedToken;
          }
        } else {
          console.log("[token:getTokenImpl] Decryption returned null/undefined, using original token");
          return headerToken;
        }
      } catch (e) {
        console.log("[token:getTokenImpl] Header token decryption failed, using as-is (might be plain JWT)");
        return headerToken;
      }
    }
  }
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    console.log("[token:getTokenImpl] Strict mode server-side, checking cookies");
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log(`[token:getTokenImpl] Available cookies: ${cookieStore.getAll().map((c) => c.name).join(", ")}`);
    let token = null;
    const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-WWTJYXTV.js");
    console.log("[token:getTokenImpl] Trying encrypted session_id");
    try {
      token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID);
      if (token) {
        console.log("[token:getTokenImpl] Found encrypted session_id");
        console.log(`[token:getTokenImpl] Token preview: ${token.substring(0, 20)}...${token.substring(token.length - 20)}`);
        console.log(`[token:getTokenImpl] Token length: ${token.length}`);
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] session_id decryption failed, trying plain");
    }
    console.log("[token:getTokenImpl] Trying plain session_id");
    token = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found plain session_id, returning token");
      return token;
    }
    console.log("[token:getTokenImpl] Trying middleware access_token cookie");
    try {
      token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.ACCESS_TOKEN);
      if (token) {
        console.log("[token:getTokenImpl] Found encrypted access_token (middleware), returning token");
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] access_token decryption failed, trying plain");
    }
    token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found plain access_token (middleware), returning token");
      return token;
    }
    console.log("[token:getTokenImpl] Trying legacy cookie names");
    try {
      token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      if (token) {
        console.log("[token:getTokenImpl] Found legacy encrypted crf, returning token");
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] Legacy crf decryption failed");
    }
    token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found legacy plain access_token, returning token");
      return token;
    }
    console.error(
      "[token:getTokenImpl] No token found in strict mode. Available cookies:",
      cookieStore.getAll().map((c) => c.name)
    );
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    err.status = 401;
    console.error("[token:getTokenImpl] Throwing 401 error:", err.message);
    throw err;
  }
  if (typeof window === "undefined") {
    console.log("[token:getTokenImpl] Auto mode server-side, checking cookies");
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      console.log(`[token:getTokenImpl:auto] Available cookies: ${cookieStore.getAll().map((c) => c.name).join(", ")}`);
      const { getEncryptedCookie, COOKIE_NAMES } = await import("./cookie-WWTJYXTV.js");
      let token = null;
      console.log("[token:getTokenImpl:auto] Trying encrypted session_id");
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found encrypted session_id");
          console.log(`[token:getTokenImpl:auto] Token preview: ${token.substring(0, 20)}...${token.substring(token.length - 20)}`);
          console.log(`[token:getTokenImpl:auto] Token length: ${token.length}`);
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] session_id decryption failed, trying plain");
      }
      console.log("[token:getTokenImpl:auto] Trying plain session_id");
      token = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      if (token) {
        console.log("[token:getTokenImpl:auto] Found plain session_id, returning token");
        return token;
      }
      console.log("[token:getTokenImpl:auto] Trying middleware access_token cookie");
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.ACCESS_TOKEN);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found encrypted access_token (middleware), returning token");
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] access_token decryption failed, trying plain");
      }
      token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
      if (token) {
        console.log("[token:getTokenImpl:auto] Found plain access_token (middleware), returning token");
        return token;
      }
      console.log("[token:getTokenImpl:auto] Trying legacy cookie names");
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found legacy encrypted crf, returning token");
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] Legacy crf decryption failed");
      }
      console.warn(
        "[token:getTokenImpl:auto] No token found. Available cookies:",
        cookieStore.getAll().map((c) => c.name)
      );
    } catch (e) {
      console.error("[token:getTokenImpl:auto] Error reading cookies:", e);
    }
  }
  if (typeof window !== "undefined") {
    console.log("[token:getTokenImpl] Client-side execution, checking cookies");
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };
    console.log("[token:getTokenImpl] Checking for session_id cookie");
    const sessionIdToken = getCookie("session_id");
    console.log(`[token:getTokenImpl] session_id cookie found: ${!!sessionIdToken}`);
    if (sessionIdToken) {
      console.log("[token:getTokenImpl] Returning token from session_id cookie");
      return sessionIdToken;
    }
    console.log("[token:getTokenImpl] Checking for legacy access_token cookie");
    const accessToken = getCookie("access_token");
    console.log(`[token:getTokenImpl] access_token cookie found: ${!!accessToken}`);
    if (accessToken) {
      console.log("[token:getTokenImpl] Returning token from legacy access_token cookie");
      return accessToken;
    }
    console.error("[token:getTokenImpl] No token available on client side");
    throw new Error("No token available on client side");
  }
  console.error("[token:getTokenImpl] No token available (server-side fallback)");
  throw new Error("No token available");
}
function getToken() {
  return getTokenImpl();
}

export {
  getToken
};
