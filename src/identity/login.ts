
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
  thirdPartyToken?: string; // Firebase ID token when logging via phone auth
}

/**
 * Full credentials including config from environment
 */
interface FullLoginCredentials {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  Language?: number;
  ThirdPartyToken?: string;
  GMT?: number;
  IsFromNotification?: boolean;
  [key: string]: string | number | boolean | undefined;
}/**
 * User information from login response
 */
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
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
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const isServer = typeof window === "undefined";
  const authMode = process.env.AUTH_MODE || "auto";
  console.log("[identity:loginUser] called", { isServer, authMode, hasThirdPartyToken: !!credentials.thirdPartyToken });

  // ✅ SERVER SIDE
  if (isServer) {
    // Get client credentials from environment
  const config = getAuthConfig();
    const { cookies } = await import("next/headers");

    // In STRICT mode, require username and password in credentials
    if (authMode === "strict" && (!credentials.username || !credentials.password)) {
      throw new Error("Username and password are required in STRICT mode");
    }

    // Merge user credentials with env config
    // In AUTO mode: use env credentials as fallback
    // In STRICT mode: credentials must be provided
    const thirdPartyToken = credentials.thirdPartyToken || config.thirdPartyToken;
    
    // Build request body based on auth type
    let requestBody: Record<string, any>;
    
    if (thirdPartyToken) {
      // Third-party authentication (Firebase, etc.)
      console.log("[identity:loginUser] using ThirdPartyToken authentication");
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
          console.log("[identity:loginUser] AUTO mode anonymous login using clientId/clientSecret only");
          requestBody = {
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            Language: config.language ?? 0,
            GMT: config.gmt ?? 3,
            IsFromNotification: false,
          };
        } else {
          throw new Error("Username/password or ThirdPartyToken must be provided");
        }
      } else {
        console.log("[identity:loginUser] using username/password authentication");
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
    
    console.log("[identity:loginUser] requestBody prepared", { 
      hasClientId: !!(requestBody as any).clientId,
      hasClientSecret: !!(requestBody as any).clientSecret,
      hasUsername: !!(requestBody as any).username, 
      hasPassword: !!(requestBody as any).password, 
      hasThirdPartyToken: !!(requestBody as any).ThirdPartyToken,
      hasThirdPartyAuthType: !!(requestBody as any).ThirdPartyAuthType 
    });

    const response = await postWithoutAuth<LoginResponse>(Api.signIn, requestBody);
  console.log("[identity:loginUser] signIn response", { hasAccessToken: !!response?.access_token, rolesCount: response?.roles?.length || 0, employeeStoreId: response?.employeeStoreId });

    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }

    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    
    // Import cookie utilities for encrypted storage
    const { setEncryptedCookie, setPlainCookie, COOKIE_NAMES } = await import("../utils/cookie");
    
    // Save encrypted access_token as 'crf' cookie (httpOnly, secure)
    console.log("[identity:loginUser] saving encrypted crf cookie");
    try {
      setEncryptedCookie(cookieStore, COOKIE_NAMES.CRF, response.access_token, {
        maxAge: expiresIn,
      });
    } catch (e) {
      console.error("[identity:loginUser] Failed to encrypt token - fallback to plain", e);
      // Fallback to plain cookie if encryption fails (missing COOKIE_CRYPTO_KEY)
      cookieStore.set(COOKIE_NAMES.CRF, response.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn,
      });
    }
    
    // LEGACY: Keep access_token for backward compatibility during migration
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

    // If request included Firebase ID token, cache it for re-login in AUTO mode
    if (credentials.thirdPartyToken) {
      console.log("[identity:loginUser] caching tp_id cookie for AUTO re-auth");
      cookieStore.set(COOKIE_NAMES.TP_ID, credentials.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600, // 1 hour typical Firebase token lifetime
      });
    }

    // AUTO mode: only save isUser flag based on roles
    if (authMode === "auto") {
      const isUser = !!(response.roles && response.roles.length > 0);
      console.log("[identity:loginUser] AUTO mode set isUser", { isUser });
      setPlainCookie(cookieStore, COOKIE_NAMES.IS_USER, String(isUser), {
        maxAge: expiresIn,
      });
    }

    // STRICT mode: save all user data
    if (authMode === "strict") {
      console.log("[identity:loginUser] STRICT mode: writing detailed cookies");
      if (response.employeeStoreId) {
        cookieStore.set("employee_store_id", String(response.employeeStoreId), {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn,
        });
      }

      if (response.roles?.length) {
        cookieStore.set("roles", response.roles.join(","), {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn,
        });
      }

      if (response.user?.username) {
        cookieStore.set("username", response.user.username, {
          httpOnly: false,
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  console.log("[identity:loginUser] client-side login completed", { status: res.status });

  return res.json();
}
