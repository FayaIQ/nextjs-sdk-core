import {
  getAuthConfig
} from "../chunk-G5ZRNFFO.js";
import {
  PUT,
  putUserInfo,
  toIsoBirthdate
} from "../chunk-FUQGWFO5.js";
import {
  Api
} from "../chunk-536WXACQ.js";
import {
  ApiError,
  postWithoutAuth
} from "../chunk-FXVF23HR.js";
import "../chunk-MGHQYVNO.js";
import "../chunk-3RG5ZIWI.js";

// src/identity/login.ts
async function loginUser(credentials) {
  const isServer = typeof window === "undefined";
  const authMode = process.env.AUTH_MODE || "auto";
  console.log("[identity:loginUser] called", { isServer, authMode, hasThirdPartyToken: !!credentials.thirdPartyToken });
  if (isServer) {
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");
    if (authMode === "strict" && (!credentials.username || !credentials.password)) {
      throw new Error("Username and password are required in STRICT mode");
    }
    const thirdPartyToken = credentials.thirdPartyToken || config.thirdPartyToken;
    let requestBody;
    if (thirdPartyToken) {
      console.log("[identity:loginUser] using ThirdPartyToken authentication");
      requestBody = {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        Language: config.language ?? 0,
        GMT: config.gmt ?? 3,
        IsFromNotification: false,
        ThirdPartyToken: thirdPartyToken,
        ThirdPartyAuthType: 100
        // Firebase auth type
      };
    } else {
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
            IsFromNotification: false
          };
        } else {
          throw new Error("Username/password or ThirdPartyToken must be provided");
        }
      } else {
        console.log("[identity:loginUser] using username/password authentication");
        requestBody = {
          clientId: config.clientId,
          clientSecret: config.clientSecret,
          username,
          password,
          Language: config.language ?? 0,
          GMT: config.gmt ?? 3,
          IsFromNotification: false
        };
      }
    }
    console.log("[identity:loginUser] requestBody prepared", {
      hasClientId: !!requestBody.clientId,
      hasClientSecret: !!requestBody.clientSecret,
      hasUsername: !!requestBody.username,
      hasPassword: !!requestBody.password,
      hasThirdPartyToken: !!requestBody.ThirdPartyToken,
      hasThirdPartyAuthType: !!requestBody.ThirdPartyAuthType
    });
    const response = await postWithoutAuth(Api.signIn, requestBody);
    console.log("[identity:loginUser] signIn response", { hasAccessToken: !!response?.access_token, rolesCount: response?.roles?.length || 0, employeeStoreId: response?.employeeStoreId });
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
    if (credentials.thirdPartyToken) {
      console.log("[identity:loginUser] caching tp_id cookie for AUTO re-auth");
      cookieStore.set("tp_id", credentials.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600
        // 1 hour typical Firebase token lifetime
      });
    }
    if (authMode === "auto") {
      const isUser = !!(response.roles && response.roles.length > 0);
      console.log("[identity:loginUser] AUTO mode set isUser", { isUser });
      cookieStore.set("isUser", String(isUser), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    if (authMode === "strict") {
      console.log("[identity:loginUser] STRICT mode: writing detailed cookies");
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
    }
    return response;
  }
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  console.log("[identity:loginUser] client-side login completed", { status: res.status });
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
    const { getWithAuth } = await import("../fetcher-KMVB5KUG.js");
    const { Api: Api2 } = await import("../api-RO5SLBPK.js");
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
    console.log("[identity:handler:login] POST body", { hasUsername: !!body.username, hasPassword: !!body.password, hasThirdPartyToken: !!body.thirdPartyToken });
    const config = getAuthConfig();
    const credentials = {
      clientId: body.clientId ?? config.clientId,
      clientSecret: body.clientSecret ?? config.clientSecret,
      username: body.username ?? config.username,
      password: body.password ?? config.password,
      Language: body.Language ?? config.language ?? 0,
      GMT: body.GMT ?? config.gmt ?? 3,
      IsFromNotification: false,
      thirdPartyToken: body.thirdPartyToken ?? config.thirdPartyToken
    };
    console.log("[identity:handler:login] credentials prepared", { hasUsername: !!credentials.username, hasPassword: !!credentials.password, hasThirdPartyToken: !!credentials.thirdPartyToken });
    const response = await loginUser(credentials);
    console.log("[identity:handler:login] loginUser response", { ok: !!response?.access_token, rolesCount: response?.roles?.length || 0 });
    if (body.thirdPartyToken) {
      console.log("[identity:handler:login] setting tp_id cookie in store");
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      cookieStore.set("tp_id", body.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600
      });
    }
    const res = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null
      },
      { status: 200 }
    );
    if (body.thirdPartyToken) {
      res.cookies.set("tp_id", body.thirdPartyToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600
      });
    }
    return res;
  } catch (error) {
    if (error instanceof ApiError) {
      const status = error.status || 401;
      const serverBody = error.body;
      let serverMessage = "Login failed";
      try {
        serverMessage = typeof serverBody === "string" ? serverBody : serverBody?.message || serverBody?.error || JSON.stringify(serverBody);
      } catch {
      }
      console.error("[identity:handler:login] ApiError", { status, serverMessage });
      return NextResponse.json(
        { success: false, error: serverMessage, status },
        { status }
      );
    }
    const message = error?.message || "Login failed unexpectedly";
    console.error("[identity:handler:login] Unexpected error", { message });
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
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

// src/identity/handler/token.ts
import { NextResponse as NextResponse4 } from "next/server";
async function GET2(request) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log("[identity:handler:token] GET checking existing token");
    const existingToken = cookieStore.get("access_token")?.value;
    if (existingToken) {
      console.log("[identity:handler:token] returning existing token from cookie");
      return NextResponse4.json(
        { access_token: existingToken },
        {
          headers: {
            "Cache-Control": "private, max-age=3600"
            // Cache for 1 hour
          }
        }
      );
    }
    const tpId = cookieStore.get("tp_id")?.value;
    const authConfig = getAuthConfig();
    const requestBody = {
      clientId: authConfig.clientId,
      clientSecret: authConfig.clientSecret,
      Language: authConfig.language ?? 0,
      GMT: authConfig.gmt ?? 3,
      IsFromNotification: false
    };
    if (tpId) {
      console.log("[identity:handler:token] using tp_id for sign-in");
      requestBody["ThirdPartyToken"] = tpId;
    } else if (authConfig.thirdPartyToken) {
      console.log("[identity:handler:token] using config thirdPartyToken");
      requestBody["ThirdPartyToken"] = authConfig.thirdPartyToken;
    } else {
      console.log("[identity:handler:token] signing in with clientId/clientSecret");
    }
    const response = await fetch(Api.signIn, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...requestBody,
        ...requestBody["ThirdPartyToken"] ? { ThirdPartyAuthType: 100 } : {}
      })
    });
    if (!response.ok) {
      console.error("[identity:handler:token] sign-in failed", response.status);
      return NextResponse4.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }
    const data = await response.json();
    if (!data.access_token) {
      return NextResponse4.json(
        { error: "Token missing in response" },
        { status: 500 }
      );
    }
    console.log("[identity:handler:token] new token obtained, setting cookie");
    const res = NextResponse4.json({ access_token: data.access_token });
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600
      // 1 hour
    });
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token fetch failed";
    console.error("[identity:handler:token] error:", message);
    return NextResponse4.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/identity/client.ts
var keepAliveTimer = null;
function startSessionKeepAlive(options) {
  if (typeof window === "undefined") {
    console.warn("[identity:startSessionKeepAlive] must be called in the browser");
    return () => {
    };
  }
  const endpoint = options?.endpoint || "/api/auth/token";
  const intervalMs = options?.intervalMs ?? 45 * 60 * 1e3;
  const ping = async () => {
    try {
      await fetch(endpoint, { method: "GET" });
      console.log("[identity:startSessionKeepAlive] pinged", endpoint);
    } catch (e) {
      console.warn("[identity:startSessionKeepAlive] ping failed", e);
      options?.onError?.(e);
    }
  };
  if (keepAliveTimer) {
    try {
      clearInterval(keepAliveTimer);
    } catch {
    }
    keepAliveTimer = null;
  }
  ping();
  keepAliveTimer = setInterval(ping, intervalMs);
  return () => {
    try {
      clearInterval(keepAliveTimer);
    } catch {
    }
    keepAliveTimer = null;
  };
}
export {
  GET as CustomersDropdownGET,
  POST as LoginPOST,
  POST2 as LogoutPOST,
  PUT as PutUserInfoPUT,
  GET2 as TokenGET,
  getCustomersDropdown,
  loginUser,
  logoutUser,
  putUserInfo,
  startSessionKeepAlive,
  toIsoBirthdate
};
