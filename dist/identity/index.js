import {
  PUT,
  putUserInfo,
  toIsoBirthdate
} from "../chunk-BGLDR6FN.js";
import {
  Api
} from "../chunk-B7VMWVKJ.js";
import {
  ApiError,
  postWithoutAuth
} from "../chunk-DU5RCNSK.js";
import "../chunk-FBLW4A4O.js";

// src/core/config.ts
var getEnvVar = (key, brand) => {
  if (typeof process === "undefined" || !process.env) return void 0;
  if (brand) {
    const brandKey = `${brand.toUpperCase()}_${key}`;
    if (process.env[brandKey]) return process.env[brandKey];
  }
  return process.env[key];
};
var getAuthConfig = () => {
  if (typeof process !== "undefined" && process.env) {
    const brand2 = process.env.STOREAK_BRAND || process.env.BRAND;
    const envConfig = {
      clientId: getEnvVar("STOREAK_CLIENT_ID", brand2),
      clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand2),
      username: getEnvVar("STOREAK_USERNAME", brand2),
      password: getEnvVar("STOREAK_PASSWORD", brand2)
    };
    if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
      return {
        ...envConfig,
        language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand2) || "0"),
        gmt: parseInt(getEnvVar("STOREAK_GMT", brand2) || "3")
      };
    }
  }
  const brand = process.env?.STOREAK_BRAND || process.env?.BRAND;
  const prefix = brand ? `${brand.toUpperCase()}_` : "";
  const missing = [];
  const required = [
    `${prefix}STOREAK_CLIENT_ID`,
    `${prefix}STOREAK_CLIENT_SECRET`
  ];
  required.forEach((name) => {
    if (!process.env?.[name]) missing.push(name);
  });
  if (missing.length > 0) {
    const hint = brand ? ` (for brand: ${brand}. Set ${prefix}* variables or use standard STOREAK_* variables)` : "";
    throw new Error(
      `Missing required environment variables for authentication: ${missing.join(", ")}${hint}`
    );
  }
  return {
    clientId: getEnvVar("STOREAK_CLIENT_ID", brand),
    clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand),
    username: getEnvVar("STOREAK_USERNAME", brand),
    password: getEnvVar("STOREAK_PASSWORD", brand),
    language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
    gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3")
  };
};

// src/identity/login.ts
async function loginUser(credentials, userAgent) {
  const isServer = typeof window === "undefined";
  const authMode = process.env.AUTH_MODE || "auto";
  if (isServer) {
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");
    if (authMode === "strict" && (!credentials.username || !credentials.password)) {
      throw new Error("Username and password are required in STRICT mode");
    }
    const thirdPartyToken = credentials.thirdPartyToken || config.thirdPartyToken;
    let requestBody;
    if (thirdPartyToken) {
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
    if (credentials.playerId) {
      requestBody.playerId = credentials.playerId;
    }
    const headers = userAgent ? { "User-Agent": userAgent + "login in user server side in nextjs-sdk-core " } : "login in user server side in nextjs-sdk-core ";
    const response = await postWithoutAuth(
      Api.signIn,
      requestBody,
      headers || {}
    );
    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }
    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    console.log(`[login] Setting cookies. expiresIn: ${expiresIn}, access_token length: ${response.access_token?.length || 0}`);
    const { setEncryptedCookie, setPlainCookie, COOKIE_NAMES } = await import("../cookie-44NI4SKY.js");
    console.log("[login] Attempting to save session_id cookie");
    try {
      setEncryptedCookie(cookieStore, COOKIE_NAMES.SESSION_ID, response.access_token, {
        maxAge: expiresIn
      });
      console.log("[login] session_id saved (encrypted)");
    } catch (e) {
      console.warn("[login] encryption failed, saving plain session_id", e);
      setPlainCookie(cookieStore, COOKIE_NAMES.SESSION_ID, response.access_token, {
        maxAge: expiresIn
      });
    }
    if (credentials.thirdPartyToken) {
      console.log("[login] Third party token present, saving tp_id cookie");
      try {
        setEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID, credentials.thirdPartyToken, {
          maxAge: 3600
          // 1 hour typical Firebase token lifetime
        });
        console.log("[login] tp_id saved (encrypted)");
      } catch (e) {
        console.warn("[login] encryption failed for tp_id, using plain", e);
        cookieStore.set(COOKIE_NAMES.TP_ID, credentials.thirdPartyToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 3600
        });
        console.log("[login] tp_id saved (plain)");
      }
    } else {
      console.log("[login] No third party token present");
    }
    if (authMode === "auto") {
      console.log("[login] Auto mode: saving isUser flag");
      const isUser = !!(response.roles && response.roles.length > 0);
      console.log(`[login] isUser determined: ${isUser} (roles count: ${response.roles?.length || 0})`);
      setPlainCookie(cookieStore, COOKIE_NAMES.IS_USER, String(isUser), {
        maxAge: expiresIn
      });
    }
    if (authMode === "strict") {
      console.log("[login] Strict mode: saving user data");
      if (response.employeeStoreId) {
        cookieStore.set("employee_store_id", String(response.employeeStoreId), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn
        });
      }
      if (response.roles?.length) {
        cookieStore.set("roles", response.roles.join(","), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: expiresIn
        });
      }
      if (response.user?.username) {
        cookieStore.set("username", response.user.username, {
          httpOnly: true,
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
    headers: {
      "Content-Type": "application/json",
      // Browsers disallow setting User-Agent; keep a sentinel for other clients
      "User-Agent": typeof navigator !== "undefined" && navigator.userAgent || "login user"
    },
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
    const allCookies = cookieStore.getAll();
    for (const cookie of allCookies) {
      cookieStore.delete(cookie.name);
    }
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
    const { getWithAuth } = await import("../fetcher-3366SLXM.js");
    const { Api: Api2 } = await import("../api-IWWKU55Q.js");
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
    if (body.thirdPartyToken) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      let hasValidToken = false;
      try {
        const { getEncryptedCookie, COOKIE_NAMES } = await import("../cookie-44NI4SKY.js");
        const existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
        const existingTpId = getEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID);
        if (existingToken && existingTpId === body.thirdPartyToken) {
          hasValidToken = true;
        }
      } catch {
      }
      if (!hasValidToken) {
        const existingToken = cookieStore.get("access_token")?.value;
        const existingTpId = cookieStore.get("tp_id")?.value;
        if (existingToken && existingTpId === body.thirdPartyToken) {
          hasValidToken = true;
        }
      }
      if (hasValidToken) {
        console.log("[identity:handler:login] already logged in with same thirdPartyToken, skipping re-auth");
        return NextResponse.json(
          {
            success: true,
            message: "Already logged in",
            employeeStoreId: null,
            roles: [],
            user: null
          },
          { status: 200 }
        );
      }
    }
    let userAgent;
    try {
      userAgent = request?.headersList?.get?.("user-agent") || void 0;
    } catch {
    }
    if (!userAgent) {
      try {
        userAgent = request.headers.get("user-agent") || void 0;
      } catch {
      }
    }
    const response = await loginUser(credentials, userAgent + " login in user server side in nextjs-sdk-core api/login");
    console.log("[identity:handler:login] loginUser response", { ok: !!response?.access_token, rolesCount: response?.roles?.length || 0 });
    if (body.thirdPartyToken) {
      console.log("[identity:handler:login] setting encrypted tp_id cookie");
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const { setEncryptedCookie, COOKIE_NAMES } = await import("../cookie-44NI4SKY.js");
      try {
        setEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID, body.thirdPartyToken, {
          maxAge: 3600
        });
      } catch (e) {
        console.warn("[identity:handler:login] encryption failed for tp_id, using plain", e);
        cookieStore.set("tp_id", body.thirdPartyToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 3600
        });
      }
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
      try {
        const { encryptSync } = await import("../crypto-AHNJNIEG.js");
        const encrypted = encryptSync(body.thirdPartyToken);
        if (encrypted) {
          res.cookies.set("tp_id", encrypted, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 3600
          });
        }
      } catch (e) {
        console.warn("[identity:handler:login] encryption failed for response tp_id", e);
        res.cookies.set("tp_id", body.thirdPartyToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 3600
        });
      }
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
  console.log("[identity:handler:token] GET request received");
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log(`[identity:handler:token] Available cookies: ${cookieStore.getAll().map((c) => c.name).join(", ")}`);
    const { getEncryptedCookie, setEncryptedCookie, COOKIE_NAMES } = await import("../cookie-44NI4SKY.js");
    console.log("[identity:handler:token] Checking for existing token in cookies");
    let existingToken = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
    console.log(`[identity:handler:token] CRF cookie token found: ${!!existingToken}`);
    if (!existingToken) {
      existingToken = cookieStore.get(COOKIE_NAMES.SESSION_ID)?.value || null;
      console.log(`[identity:handler:token] Legacy SESSION_ID cookie found: ${!!existingToken}`);
    }
    if (existingToken) {
      console.log("[identity:handler:token] Returning existing token from cookies");
      return NextResponse4.json(
        { SESSION_ID: existingToken }
      );
    }
    console.log("[identity:handler:token] No existing token found, attempting re-auth");
    console.log("[identity:handler:token] Checking for tp_id cookie");
    let tpId = null;
    try {
      tpId = getEncryptedCookie(cookieStore, COOKIE_NAMES.TP_ID);
      console.log(`[identity:handler:token] Encrypted tp_id found: ${!!tpId}`);
    } catch (e) {
      console.log("[identity:handler:token] Encrypted tp_id decryption failed");
    }
    if (!tpId) {
      tpId = cookieStore.get(COOKIE_NAMES.TP_ID)?.value || null;
      console.log(`[identity:handler:token] Plain tp_id found: ${!!tpId}`);
    }
    const authConfig = getAuthConfig();
    const requestBody = {
      clientId: authConfig.clientId,
      clientSecret: authConfig.clientSecret,
      Language: authConfig.language ?? 0,
      GMT: authConfig.gmt ?? 3,
      IsFromNotification: false
    };
    if (tpId) {
      requestBody["ThirdPartyToken"] = tpId;
    } else if (authConfig.thirdPartyToken) {
      requestBody["ThirdPartyToken"] = authConfig.thirdPartyToken;
    } else {
      console.log("[identity:handler:token] signing in with clientId/clientSecret");
    }
    let userAgent = null;
    if (!userAgent) {
      try {
        userAgent = request.headers.get("user-agent") + " nextjs-sdk-core  handler api/auth/token" || null;
      } catch {
      }
    }
    if (!userAgent) {
      userAgent = "nextjs-sdk-core  handler api/auth/token";
    }
    const response = await fetch(Api.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": userAgent
      },
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
    console.log(`[identity:handler:token] Token response received, has access_token: ${!!data.access_token}`);
    if (!data.access_token) {
      console.error("[identity:handler:token] No access_token in response");
      return NextResponse4.json(
        { error: "Token missing in response" },
        { status: 500 }
      );
    }
    console.log(`[identity:handler:token] Access token length: ${data.access_token.length}`);
    const res = NextResponse4.json({ access_token: data.access_token });
    console.log("[identity:handler:token] Setting session_id cookie");
    try {
      const { encryptSync } = await import("../crypto-AHNJNIEG.js");
      const { COOKIE_NAMES: CN } = await import("../cookie-44NI4SKY.js");
      const encrypted = encryptSync(data.access_token);
      if (encrypted) {
        res.cookies.set(CN.SESSION_ID, encrypted, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 3600
          // 1 hour
        });
        console.log("[identity:handler:token] session_id saved (encrypted)");
      } else {
        console.warn("[identity:handler:token] encryptSync returned falsy value");
      }
    } catch (e) {
      console.warn("[identity:handler:token] encryption failed, saving plain session_id", e);
      const { COOKIE_NAMES: CN } = await import("../cookie-44NI4SKY.js");
      res.cookies.set(CN.SESSION_ID, data.access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 3600
        // 1 hour
      });
      console.log("[identity:handler:token] session_id saved (plain)");
    }
    console.log("[identity:handler:token] Returning response with new token");
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
