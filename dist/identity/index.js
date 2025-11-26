import {
  getAuthConfig
} from "../chunk-ZRJIKYHV.js";
import {
  PUT,
  putUserInfo,
  toIsoBirthdate
} from "../chunk-HKHDHN4H.js";
import {
  Api
} from "../chunk-4D7LFOTQ.js";
import {
  postWithoutAuth
} from "../chunk-UEYGZNEP.js";
import "../chunk-CRASKSJL.js";

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
    if (response.user?.username) {
      cookieStore.set("username", response.user.username, {
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

// src/identity/getCustomersDropdown.ts
async function getCustomersDropdown(username, FullName) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-CX4XI7JJ.js");
    const { Api: Api2 } = await import("../api-VEZZ6GU2.js");
    const params2 = new URLSearchParams();
    const usernameTrimmed2 = username !== void 0 ? String(username).trim() : "";
    const fullNameTrimmed2 = FullName !== void 0 ? String(FullName).trim() : "";
    if (usernameTrimmed2 !== "") params2.set("username", usernameTrimmed2);
    if (fullNameTrimmed2 !== "") params2.set("FullName", fullNameTrimmed2);
    const url = params2.toString() ? `${Api2.getCustomersDropdown}?${params2.toString()}` : Api2.getCustomersDropdown;
    return getWithAuth(url);
  }
  const params = new URLSearchParams();
  const usernameTrimmed = username !== void 0 ? String(username).trim() : "";
  const fullNameTrimmed = FullName !== void 0 ? String(FullName).trim() : "";
  if (usernameTrimmed !== "") params.set("username", usernameTrimmed);
  if (fullNameTrimmed !== "") params.set("FullName", fullNameTrimmed);
  const res = await fetch(`/api/customers/dropdown${params.toString() ? `?${params.toString()}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch customers dropdown: ${res.statusText}`);
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

// src/identity/handler/getCustomersDropdown.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const usernameRaw = url.searchParams.get("username");
    const fullNameRaw = url.searchParams.get("FullName");
    const username = usernameRaw !== null && usernameRaw.trim() !== "" ? usernameRaw.trim() : void 0;
    const FullName = fullNameRaw !== null && fullNameRaw.trim() !== "" ? fullNameRaw.trim() : void 0;
    const data = await getCustomersDropdown(username, FullName);
    return NextResponse3.json({ success: true, data }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch customers";
    console.error("getCustomersDropdown handler error:", message);
    return NextResponse3.json({ success: false, error: message }, { status: 500 });
  }
}
export {
  GET as CustomersDropdownGET,
  POST as LoginPOST,
  POST2 as LogoutPOST,
  PUT as PutUserInfoPUT,
  getCustomersDropdown,
  loginUser,
  logoutUser,
  putUserInfo,
  toIsoBirthdate
};
