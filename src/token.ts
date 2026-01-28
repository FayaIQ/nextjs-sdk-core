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
  // Debug: entry
  try {
    // eslint-disable-next-line no-console
    console.log(
      "[token:getTokenImpl] invoked; environment AUTH_MODE=",
      AUTH_MODE,
    );
  } catch {}

  // 🟢 0. SERVER-SIDE: Check for x-access-token header first
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    if (headerToken) {
      // x-access-token is ALWAYS raw (unencrypted) from middleware
      // Don't try to decrypt it

      console.log(
        "[token:getTokenImpl] token found via x-access-token header",
        headerToken,
      );
      return headerToken;
    }
  }

  // 🟢 1. STRICT MODE → token must exist in cookie (SSR)
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    let token: string | null = null;
    const { getEncryptedCookie, COOKIE_NAMES } = await import("./utils/cookie");

    // Try encrypted session_id first
    try {
      token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID);
      if (token) {
        // eslint-disable-next-line no-console
        return token;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        "[token:getTokenImpl] getEncryptedCookie threw:",
        (e as any)?.message ?? e,
      );
    }

    // Try plain session_id (use cookieStore raw value as a fallback)
    try {
      token = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      if (token) {
        return token;
      }
    } catch (e) {
      // ignore
    }

    // MIDDLEWARE: Check access_token cookie (set by consumer middleware)
    try {
      token = cookieStore.get("session_id")?.value || null;
      if (token) {
        // eslint-disable-next-line no-console
        console.log(
          "[token:getTokenImpl] token found via cookie access_token (middleware)",
        );
        return token;
      }
    } catch (e) {
      // ignore
    }

    // LEGACY: Fallback to old cookie names for migration
    try {
      token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
      if (token) {
        // eslint-disable-next-line no-console
        console.log("[token:getTokenImpl] token found via legacy CRF cookie");
        return token;
      }
    } catch {
      // ignore
    }

    console.error(
      "[token:getTokenImpl] No token found in strict mode. Available cookies:",
      cookieStore.getAll().map((c: any) => c.name),
    );
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    (err as any).status = 401;
    console.error("[token:getTokenImpl] Throwing 401 error:", err.message);
    throw err;
  }

  // 🟢 2. AUTO MODE → SSR cookie check
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const { getEncryptedCookie, COOKIE_NAMES } =
        await import("./utils/cookie");

      let token: string | null = null;

      // Try encrypted session_id first
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID);
        if (token) {
          return token;
        }
      } catch {}

      // Try plain session_id
      token = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      if (token) {
        return token;
      }

      // MIDDLEWARE: Check access_token cookie (set by consumer middleware)
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID);
        if (token) {
          return token;
        }
      } catch {}

      // Try plain access_token
      token = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      if (token) {
        return token;
      }

      // LEGACY: Fallback to old cookie names for migration
      try {
        token = await getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        if (token) {
          return token;
        }
      } catch {}
    } catch (e) {
      console.error("[token:getTokenImpl:auto] Error reading cookies:", e);
    }
  }

  // 🟢 3. CLIENT → check for token in cookie (no auto login)
  if (typeof window !== "undefined") {
    // On client side, check for token in cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };

    // Try session_id first, then legacy access_token
    const sessionIdToken = getCookie("session_id");
    if (sessionIdToken) {
      return sessionIdToken;
    }

    const accessToken = getCookie("access_token");
    if (accessToken) {
      return accessToken;
    }

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
