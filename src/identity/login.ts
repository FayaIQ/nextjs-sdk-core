
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
    const fullCredentials: FullLoginCredentials = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: credentials.username || config.username,
      password: credentials.password || config.password,
      Language: config.language ?? 0,
      ThirdPartyToken: config.thirdPartyToken,
      GMT: config.gmt ?? 3,
      IsFromNotification: false,
    };

    // Validate that we have username and password from somewhere
    if (!fullCredentials.username || !fullCredentials.password) {
      throw new Error("Username and password must be provided either in credentials or environment config");
    }

    const response = await postWithoutAuth<LoginResponse>(Api.signIn, fullCredentials);

    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }

    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    
    // Always save access_token
    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

    // AUTO mode: only save isUser flag based on roles
    if (authMode === "auto") {
      const isUser = !!(response.roles && response.roles.length > 0);
      cookieStore.set("isUser", String(isUser), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn,
      });
    }

    // STRICT mode: save all user data
    if (authMode === "strict") {
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

  return res.json();
}
