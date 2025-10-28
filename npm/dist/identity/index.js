import {
  postWithoutAuth
} from "../chunk-OZ3PIB5A.js";
import {
  getAuthConfig
} from "../chunk-EJ2KVSUK.js";
import {
  Api
} from "../chunk-AEBXLHCR.js";

// src/identity/login.ts
async function loginUser(credentials) {
  const isServer = typeof window === "undefined";
  if (isServer) {
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");
    const fullCredentials = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: credentials.username,
      password: credentials.password,
      Language: config.language ?? 0,
      GMT: config.gmt ?? 3,
      IsFromNotification: false
    };
    const response = await postWithoutAuth(Api.signIn, fullCredentials);
    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }
    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn
    });
    if (response.employeeStoreId) {
      cookieStore.set("employee_store_id", String(response.employeeStoreId), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    if (response.roles?.length) {
      cookieStore.set("roles", response.roles.join(","), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    return response;
  }
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  return res.json();
}

// src/identity/logout.ts
async function logoutUser() {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("employee_store_id");
    cookieStore.delete("roles");
    return { success: true };
  }
  const res = await fetch("/api/auth/logout", {
    method: "POST"
  });
  if (!res.ok) throw new Error(`Logout failed: ${res.statusText}`);
  return res.json();
}

// src/identity/handler/login.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const config = getAuthConfig();
    const credentials = {
      clientId: body.clientId ?? config.clientId,
      clientSecret: body.clientSecret ?? config.clientSecret,
      username: body.username ?? config.username,
      password: body.password ?? config.password,
      Language: body.Language ?? config.language ?? 0,
      GMT: body.GMT ?? config.gmt ?? 3,
      IsFromNotification: false
    };
    const response = await loginUser(credentials);
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed unexpectedly";
    console.error("Login error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 401 }
    );
  }
}

// src/identity/handler/logout.ts
import { NextResponse as NextResponse2 } from "next/server";
async function POST2() {
  try {
    await logoutUser();
    return NextResponse2.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";
    console.error("Logout error:", message);
    return NextResponse2.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
export {
  POST as LoginPOST,
  POST2 as LogoutPOST,
  loginUser,
  logoutUser
};
