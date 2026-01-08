export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// ENV
const AUTH_MODE = process.env.AUTH_MODE || "strict"; // auto | strict
const USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";

// ------------------------------------------------
// SINGLE SOURCE OF TRUTH — NO CACHING
// ------------------------------------------------
async function getTokenImpl(): Promise<string> {
  // 🟢 0. SERVER-SIDE: Check for x-access-token header first
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    if (headerToken) {
      return headerToken;
    }
  }

  // 🟢 1. STRICT MODE → token must exist in cookie (SSR)
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    // Try encrypted crf first
    let token: string | null = null;
    try {
      const { getEncryptedCookie, COOKIE_NAMES } = await import(
        "./utils/cookie"
      );
      token = getEncryptedCookie(cookieStore, COOKIE_NAMES.ACCESS_TOKEN);
      if (token) {
        console.log('[token] Found encrypted CRF cookie');
      }
    } catch (e) {
      console.error('[token] Decryption error for CRF:', e);
    }

    // Fallback to legacy plain access_token
    if (!token) {
      token = cookieStore.get("access_token")?.value || null;
      if (token) {
        console.log('[token] Found plain access_token cookie');
      }
    }

    if (token) return token;

    console.error('[token] No token found in strict mode. Available cookies:', 
      cookieStore.getAll().map((c: any) => c.name));
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    (err as any).status = 401;
    throw err;
  }

  // 🟢 2. AUTO MODE → SSR cookie check
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      // Try encrypted crf first
      let token: string | null = null;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import(
          "./utils/cookie"
        );
        token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        if (token) {
          console.log('[token:auto] Found encrypted CRF cookie');
        }
      } catch (e) {
        console.error('[token:auto] Decryption error for CRF:', e);
      }

      // Fallback to legacy plain access_token
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
        if (token) {
          console.log('[token:auto] Found plain access_token cookie');
        }
      }

      if (token) return token;
      
      console.warn('[token:auto] No token found. Available cookies:', 
        cookieStore.getAll().map((c: any) => c.name));
    } catch (e) {
      console.error('[token:auto] Error reading cookies:', e);
    }
  }

  // 🟢 3. CLIENT → check for token in cookie (no auto login)
  if (typeof window !== "undefined") {

    // On client side, check for token in cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
      return null;
    };
    const clientToken = getCookie("access_token");
    if (clientToken) {
      return clientToken;
    }
    // No auto login, throw error
    throw new Error("No token available on client side");
  }

  // If we reach here on server without token, throw error (no auto login)
  throw new Error("No token available");
}

// -------------------------------
// PUBLIC API (NO MEMOIZATION)
// -------------------------------
export default function getToken(): Promise<string> {
  return getTokenImpl();
}
