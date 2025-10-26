"use server";

import { cookies } from "next/headers";
import { Api } from "./api/api";
import { getAuthConfig } from "./core/config";

export type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  [key: string]: unknown;
};

// Environment variable to control behavior
const AUTH_MODE = process.env.STOREAK_AUTH_MODE || "auto"; // "auto" | "strict"

/**
 * Retrieves or generates an access token based on the configured mode.
 *
 * Modes:
 * - "auto": automatically logs in if token missing or expired
 * - "strict": throws Unauthorized error if no token exists
 */
export default async function getToken(): Promise<string> {
  if (AUTH_MODE === "strict") {
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie && accessTokenCookie) {
      return accessTokenCookie;
    }
    throw new Error("Unauthorized: Access token missing (strict mode enabled)");
  }

  // AUTO MODE: perform login to fetch a new token
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

  const response = await fetch(Api.signIn, {
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
