"use server";

import { API_ROUTES, getAuthConfig, type AuthConfig } from "./config";

export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

/**
 * Fetches an authentication token from the Storeak Identity Service
 * Credentials can be provided via environment variables:
 * - STOREAK_CLIENT_ID
 * - STOREAK_CLIENT_SECRET
 * - STOREAK_USERNAME
 * - STOREAK_PASSWORD
 * - STOREAK_LANGUAGE (optional, default: 0)
 * - STOREAK_GMT (optional, default: 3)
 * 
 * @returns Promise with the access token string
 * @throws Error if authentication fails
 */
export default async function getToken(): Promise<string> {
  const authConfig = getAuthConfig();

  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    username: authConfig.username,
    password: authConfig.password,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false,
  };

  const response = await fetch(API_ROUTES.token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as TokenResponse;
  
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }

  return data.access_token;
}

