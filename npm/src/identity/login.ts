"use server";

import { cookies } from "next/headers";
import { Api } from "../api/api";
import { postWithoutAuth } from "../core/fetcher";

/**
 * Represents login credentials for Storeak Identity Service
 */
export interface LoginRequest {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  Language?: number;
  GMT?: number;
  IsFromNotification?: boolean;
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
 * 
 * @param credentials - Login credentials
 * @returns Login response with token and user data
 */
export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  // Perform login call
  const response = await postWithoutAuth<LoginResponse>(Api.signIn, credentials as any);

  // Save to cookies if successful
  if (response?.access_token) {
    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200; // default 2 hours

    // Save access token
    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn,
    });

    // Save employee store ID if available
    if (response.employeeStoreId) {
      cookieStore.set("employee_store_id", response.employeeStoreId.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn,
      });
    }

    // Save roles if available
    if (response.roles && Array.isArray(response.roles)) {
      cookieStore.set("roles", response.roles.join(","), {
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

