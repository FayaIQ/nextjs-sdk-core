
import { Api } from "../api/api";
import { postWithoutAuth } from "../core/fetcher";
import { getAuthConfig } from "../core/config";

/**
 * Represents login credentials for Storeak Identity Service
 */
export interface LoginRequest {
  username: string;
  password: string;
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
 * Only requires username and password - other credentials come from env config.
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const isServer = typeof window === "undefined";

  // ✅ SERVER SIDE
  if (isServer) {
    // Get client credentials from environment
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");

    
    // Merge user credentials with env config
    const fullCredentials: FullLoginCredentials = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: credentials.username,
      password: credentials.password,
      Language: config.language ?? 0,
      GMT: config.gmt ?? 3,
      IsFromNotification: false,
    };

    const response = await postWithoutAuth<LoginResponse>(Api.signIn, fullCredentials);

    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }

    const cookieStore = await cookies();

    const expiresIn = response.expires || 7200; // 2 hours

    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

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
