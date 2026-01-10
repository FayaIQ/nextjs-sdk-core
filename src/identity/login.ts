import { Api } from "../api/api";
import { postWithoutAuth } from "../core/fetcher";
import { getAuthConfig } from "../core/config";

/**
 * Represents login credentials for Storeak Identity Service
 * In STRICT mode: username and password are required
 * In AUTO mode: username and password are optional (uses env config)
 */
export interface LoginRequest {
  username?: string;
  password?: string;
  playerId?: string;
  thirdPartyToken?: string; // Firebase ID token when logging via phone auth
}

/**
 * Full credentials including config from environment
 */
interface FullLoginCredentials {
  clientId: string;
  playerId?: string;
  clientSecret: string;
  username: string;
  password: string;
  Language?: number;
  ThirdPartyToken?: string;
  GMT?: number;
  IsFromNotification?: boolean;
  [key: string]: string | number | boolean | undefined;
}
/**
 * User information from login response
 */
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  playerId: string;
  storeIDRegisteredWith: number;
  gender: number;
  birthdate: string;
  [key: string]: any;
}

/**
 * Login response from the Storeak Identity Service
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires: number;
  employeeStoreId?: number;
  roles?: string[];
  user?: User;
  [key: string]: any;
}

/**
 * Logs in a user and retrieves an access token.
 * Automatically saves the token, roles, and store ID to cookies.
 *
 * STRICT mode: username and password are required in credentials
 * AUTO mode: username and password are optional - falls back to env config
 */
export async function loginUser(
  credentials: LoginRequest,
  userAgent?: string
): Promise<LoginResponse> {
  const isServer = typeof window === "undefined";
  const authMode = process.env.AUTH_MODE || "auto";

  // ✅ SERVER SIDE
  if (isServer) {
    // Get client credentials from environment
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");

    // In STRICT mode, require username and password in credentials
    if (
      authMode === "strict" &&
      (!credentials.username || !credentials.password)
    ) {
      throw new Error("Username and password are required in STRICT mode");
    }

    // Merge user credentials with env config
    // In AUTO mode: use env credentials as fallback
    // In STRICT mode: credentials must be provided
    const thirdPartyToken =
      credentials.thirdPartyToken || config.thirdPartyToken;

    // Build request body based on auth type
    let requestBody: Record<string, any>;

    if (thirdPartyToken) {
      // Third-party authentication (Firebase, etc.)
      requestBody = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        Language: config.language ?? 0,
        GMT: config.gmt ?? 3,
        IsFromNotification: false,
        ThirdPartyToken: thirdPartyToken,
        ThirdPartyAuthType: 100, // Firebase auth type
      };
    } else {
      // Standard username/password authentication or anonymous (client credentials only) in AUTO mode
      const username = credentials.username || config.username;
      const password = credentials.password || config.password;

      if (!username || !password) {
        if (authMode === "auto") {
          requestBody = {
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            Language: config.language ?? 0,
            GMT: config.gmt ?? 3,
            IsFromNotification: false,
          };
        } else {
          throw new Error(
            "Username/password or ThirdPartyToken must be provided"
          );
        }
      } else {
        requestBody = {
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          username: username,
          password: password,
          Language: config.language ?? 0,
          GMT: config.gmt ?? 3,
          IsFromNotification: false,
        };
      }
    }

    if (credentials.playerId) {
      requestBody.playerId = credentials.playerId;
    }

    const headers = userAgent
      ? {
          "User-Agent":
            userAgent + "login in user server side in nextjs-sdk-core ",
        }
      : "login in user server side in nextjs-sdk-core ";

    const response = await postWithoutAuth<LoginResponse>(
      Api.signIn,
      requestBody,
      (headers as Record<string, string>) || {}
    );

    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }
    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    console.log(
      `[login] Setting cookies. expiresIn: ${expiresIn}, access_token length: ${
        response.access_token?.length || 0
      }`
    );

    // Import cookie utilities for encrypted storage
    const { setEncryptedCookie, setPlainCookie, COOKIE_NAMES } = await import(
      "../utils/cookie"
    );

    // Save session token (plain)
    console.log("[login] Saving session_id cookie (plain)");
    // Remove any legacy/encrypted cookies before writing new plain cookie
    try {
      cookieStore.delete(COOKIE_NAMES.CRF);
    } catch {}
    try {
      cookieStore.delete("access_token");
    } catch {}
    try {
      cookieStore.delete(COOKIE_NAMES.SESSION_ID);
    } catch {}
    console.log(
      "[SAVING TOKEN] token login plain store",
      response.access_token.slice(0, 30)
    );
    setPlainCookie(
      cookieStore,
      COOKIE_NAMES.SESSION_ID,
      response.access_token,
      {
        maxAge: expiresIn,
      }
    );

    // If request included Firebase ID token, cache it encrypted for re-login in AUTO mode
    if (credentials.thirdPartyToken) {
      console.log("[login] Third party token present, saving tp_id cookie");
      // Save third-party token plainly for re-login
      try {
        cookieStore.delete(COOKIE_NAMES.TP_ID);
      } catch {}
      try {
        cookieStore.delete("tp_id");
      } catch {}
      setPlainCookie(
        cookieStore,
        COOKIE_NAMES.TP_ID,
        credentials.thirdPartyToken,
        {
          maxAge: 3600, // 1 hour typical Firebase token lifetime
        }
      );
      console.log("[login] tp_id saved (plain)");
    } else {
      console.log("[login] No third party token present");
    }

    // AUTO mode: only save isUser flag based on roles
    if (authMode === "auto") {
      console.log("[login] Auto mode: saving isUser flag");
      const isUser = !!(response.roles && response.roles.length > 0);
      console.log(
        `[login] isUser determined: ${isUser} (roles count: ${
          response.roles?.length || 0
        })`
      );
      setPlainCookie(cookieStore, COOKIE_NAMES.IS_USER, String(isUser), {
        maxAge: expiresIn,
      });
    }

    // STRICT mode: save all user data
    if (authMode === "strict") {
      console.log("[login] Strict mode: saving user data");
      if (response.employeeStoreId) {
        cookieStore.set("employee_store_id", String(response.employeeStoreId), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn,
        });
      }

      if (response.roles?.length) {
        cookieStore.set("roles", response.roles.join(","), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn,
        });
      }

      if (response.user?.username) {
        cookieStore.set("username", response.user.username, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn,
        });
      }
    }

    return response;
  }

  // ✅ CLIENT SIDE
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Browsers disallow setting User-Agent; keep a sentinel for other clients
      "User-Agent":
        (typeof navigator !== "undefined" && navigator.userAgent) ||
        "login user",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);

  return res.json();
}
