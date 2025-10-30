import {
  Api
} from "./chunk-LLW3DCLL.js";

// src/core/config.ts
var getAuthConfig = () => {
  if (typeof process !== "undefined" && process.env) {
    const envConfig = {
      clientId: process.env.STOREAK_CLIENT_ID,
      clientSecret: process.env.STOREAK_CLIENT_SECRET,
      username: process.env.STOREAK_USERNAME,
      password: process.env.STOREAK_PASSWORD
    };
    if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
      return {
        ...envConfig,
        language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
        gmt: parseInt(process.env.STOREAK_GMT || "3")
      };
    }
  }
  const missing = [];
  const required = [
    "STOREAK_CLIENT_ID",
    "STOREAK_CLIENT_SECRET"
  ];
  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}`
    );
  }
  return {
    clientId: process.env.STOREAK_CLIENT_ID,
    clientSecret: process.env.STOREAK_CLIENT_SECRET,
    username: process.env.STOREAK_USERNAME,
    password: process.env.STOREAK_PASSWORD,
    language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
    gmt: parseInt(process.env.STOREAK_GMT || "3")
  };
};

// src/token.ts
var AUTH_MODE = process.env.STOREAK_AUTH_MODE || "auto";
async function getToken() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    throw new Error("Unauthorized: Access token missing (strict mode enabled)");
  }
  const authConfig = getAuthConfig();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    username: authConfig.username,
    password: authConfig.password,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  const response = await fetch(Api.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }
  return data.access_token;
}

export {
  getAuthConfig,
  getToken
};
