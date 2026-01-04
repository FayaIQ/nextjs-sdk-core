"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/crypto.ts
function getEncryptionKey() {
  const keyB64 = process.env.COOKIE_CRYPTO_KEY;
  if (!keyB64) {
    throw new Error(
      `COOKIE_CRYPTO_KEY environment variable not set. Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
    );
  }
  try {
    const key = Buffer.from(keyB64, "base64");
    if (key.length !== 32) {
      throw new Error(`COOKIE_CRYPTO_KEY must be 32 bytes, got ${key.length}`);
    }
    return key;
  } catch (e) {
    throw new Error(`Invalid COOKIE_CRYPTO_KEY: ${e.message}`);
  }
}
function encrypt(plaintext) {
  if (typeof window !== "undefined") {
    throw new Error("encrypt() must only be called server-side");
  }
  const key = getEncryptionKey();
  const iv = (0, import_crypto.randomBytes)(IV_LENGTH);
  const cipher = (0, import_crypto.createCipheriv)(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final()
  ]);
  const authTag = cipher.getAuthTag();
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}
function decrypt(encryptedData) {
  if (typeof window !== "undefined") {
    throw new Error("decrypt() must only be called server-side");
  }
  const key = getEncryptionKey();
  const normalizeBase64 = (s) => {
    let t = s.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    const pad = t.length % 4;
    if (pad === 2) t += "==";
    else if (pad === 3) t += "=";
    else if (pad === 1) {
      t = t.slice(0, t.length - 1);
    }
    return t;
  };
  const combined = Buffer.from(normalizeBase64(encryptedData), "base64");
  if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error("Invalid encrypted data: too short");
  }
  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = (0, import_crypto.createDecipheriv)(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}
function tryDecryptTolerant(encryptedData) {
  try {
    return decrypt(encryptedData);
  } catch (e) {
    try {
      const key = getEncryptionKey();
      const normalizeBase64 = (s) => s.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
      const combined = Buffer.from(normalizeBase64(encryptedData), "base64");
      if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) throw e;
      const iv = combined.subarray(0, IV_LENGTH);
      const authTag = combined.subarray(combined.length - AUTH_TAG_LENGTH);
      const ciphertext = combined.subarray(IV_LENGTH, combined.length - AUTH_TAG_LENGTH);
      const decipher = (0, import_crypto.createDecipheriv)(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
      ]);
      return decrypted.toString("utf8");
    } catch (e2) {
      throw e;
    }
  }
}
var import_crypto, ALGORITHM, IV_LENGTH, AUTH_TAG_LENGTH;
var init_crypto = __esm({
  "src/utils/crypto.ts"() {
    "use strict";
    import_crypto = require("crypto");
    ALGORITHM = "aes-256-gcm";
    IV_LENGTH = 16;
    AUTH_TAG_LENGTH = 16;
  }
});

// src/utils/cookie.ts
var cookie_exports = {};
__export(cookie_exports, {
  COOKIE_NAMES: () => COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS: () => SECURE_COOKIE_OPTIONS,
  deleteCookie: () => deleteCookie,
  getEncryptedCookie: () => getEncryptedCookie,
  setEncryptedCookie: () => setEncryptedCookie,
  setPlainCookie: () => setPlainCookie
});
function setEncryptedCookie(cookieStore, name, value, options) {
  if (typeof window !== "undefined") {
    throw new Error("setEncryptedCookie must only be called server-side");
  }
  const encrypted = encrypt(value);
  cookieStore.set(name, encrypted, {
    ...SECURE_COOKIE_OPTIONS,
    ...options
  });
}
function getEncryptedCookie(cookieStore, name) {
  if (typeof window !== "undefined") {
    throw new Error("getEncryptedCookie must only be called server-side");
  }
  try {
    const cookie = cookieStore.get(name);
    if (!cookie?.value) return null;
    try {
      return decrypt(cookie.value);
    } catch (e) {
      try {
        return tryDecryptTolerant(cookie.value);
      } catch (e2) {
        throw e;
      }
    }
  } catch (e) {
    console.error(`[cookie] Failed to decrypt ${name}:`, e);
    return null;
  }
}
function setPlainCookie(cookieStore, name, value, options) {
  cookieStore.set(name, value, {
    ...SECURE_COOKIE_OPTIONS,
    httpOnly: false,
    // Allow client-side read for flags
    ...options
  });
}
function deleteCookie(cookieStore, name) {
  cookieStore.delete(name);
}
var COOKIE_NAMES, SECURE_COOKIE_OPTIONS;
var init_cookie = __esm({
  "src/utils/cookie.ts"() {
    "use strict";
    init_crypto();
    COOKIE_NAMES = {
      /** Encrypted backend access token (httpOnly) */
      CRF: "crf",
      /** User authentication flag */
      IS_USER: "isUser",
      /** Legacy: third-party token (for migration) */
      TP_ID: "tp_id",
      /** Legacy: access token (for migration) */
      ACCESS_TOKEN: "access_token"
    };
    SECURE_COOKIE_OPTIONS = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    };
  }
});

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  deleteWithAuth: () => deleteWithAuth,
  deleteWithoutAuth: () => deleteWithoutAuth,
  getWithAuth: () => getWithAuth,
  getWithoutAuth: () => getWithoutAuth,
  patchWithAuth: () => patchWithAuth,
  patchWithoutAuth: () => patchWithoutAuth,
  postWithAuth: () => postWithAuth,
  postWithoutAuth: () => postWithoutAuth,
  putWithAuth: () => putWithAuth,
  putWithoutAuth: () => putWithoutAuth
});
module.exports = __toCommonJS(core_exports);

// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";
var USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
async function getTokenImpl() {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    if (headerToken) {
      return headerToken;
    }
  }
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    let token = null;
    try {
      const { getEncryptedCookie: getEncryptedCookie2, COOKIE_NAMES: COOKIE_NAMES2 } = await Promise.resolve().then(() => (init_cookie(), cookie_exports));
      token = getEncryptedCookie2(cookieStore, COOKIE_NAMES2.CRF);
    } catch {
    }
    if (!token) {
      token = cookieStore.get("access_token")?.value || null;
    }
    if (token) return token;
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    err.status = 401;
    throw err;
  }
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const { headers } = await import("next/headers");
      const headerToken = (await headers()).get("x-access-token");
      let token = null;
      try {
        const { getEncryptedCookie: getEncryptedCookie2, COOKIE_NAMES: COOKIE_NAMES2 } = await Promise.resolve().then(() => (init_cookie(), cookie_exports));
        token = getEncryptedCookie2(cookieStore, COOKIE_NAMES2.CRF);
      } catch {
      }
      if (!token) {
        token = cookieStore.get("access_token")?.value || null;
      }
      if (headerToken) {
        return headerToken;
      }
      if (token) return token;
    } catch {
    }
  }
  if (typeof window !== "undefined") {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };
    const clientToken = getCookie("access_token");
    if (clientToken) {
      return clientToken;
    }
    throw new Error("No token available on client side");
  }
  throw new Error("No token available");
}
function getToken() {
  return getTokenImpl();
}

// src/core/fetcher.ts
var ApiError = class _ApiError extends Error {
  constructor(status, body, message) {
    super(message || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
    Object.setPrototypeOf(this, _ApiError.prototype);
  }
};
function findMessageInError(obj, depth = 0, seen = /* @__PURE__ */ new WeakSet()) {
  if (obj == null || depth > 6) return null;
  if (typeof obj === "string") {
    const s = obj.trim();
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        return findMessageInError(parsed, depth + 1, seen) || obj;
      } catch {
        return obj;
      }
    }
    return obj;
  }
  if (typeof obj !== "object") return null;
  if (seen.has(obj)) return null;
  seen.add(obj);
  if (typeof obj.message === "string" && obj.message) return obj.message;
  if (typeof obj.code === "string" && obj.code) return obj.code;
  if (typeof obj.error === "string" && obj.error) return obj.error;
  const keysToCheck = [
    "message",
    "code",
    "error",
    "body",
    "data",
    "response",
    "errors"
  ];
  for (const k of keysToCheck) {
    if (k in obj) {
      const v = obj[k];
      const found = findMessageInError(v, depth + 1, seen);
      if (found) return found;
    }
  }
  for (const k of Object.keys(obj)) {
    try {
      const found = findMessageInError(obj[k], depth + 1, seen);
      if (found) return found;
    } catch {
    }
  }
  return null;
}
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }
  const requestHeaders = { ...headers };
  function getUserAgent() {
    try {
      const base = `nextjs-sdk-core`;
      if (typeof process !== "undefined" && process?.version) {
        return `${base} (node ${process.version})`;
      }
      return base;
    } catch {
      return "nextjs-sdk-core";
    }
  }
  if (typeof window === "undefined") {
    if (!requestHeaders["User-Agent"]) {
      requestHeaders["User-Agent"] = getUserAgent();
    }
  }
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (data && !(data instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }
  let body;
  if (data) {
    body = data instanceof FormData ? data : JSON.stringify(data);
  }
  const response = await fetch(endpoint, {
    method,
    headers: requestHeaders,
    body
  });
  if (!response.ok) {
    try {
      const text2 = await response.text();
      if (text2 && text2.trim()) {
        let errorData;
        try {
          errorData = JSON.parse(text2);
        } catch {
          errorData = text2;
        }
        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
            }
          }
        }
        const derivedMessage = findMessageInError(errorData) || (typeof errorData === "string" ? errorData : response.statusText);
        throw new ApiError(response.status, errorData, derivedMessage);
      }
      throw new ApiError(
        response.status,
        null,
        `Request failed with status ${response.status} ${response.statusText}`
      );
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        response.status,
        null,
        `Request failed with status ${response.status} ${response.statusText}`
      );
    }
  }
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || !contentType && response.status === 200) {
    return {};
  }
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {};
  }
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    throw new Error(
      `Failed to parse response as JSON: ${text.substring(0, 100)}`
    );
  }
}
async function getWithAuth(url, query, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "GET",
    token,
    query,
    headers
  });
}
async function getWithoutAuth(url, query, headers) {
  return apiFetch(url, {
    method: "GET",
    query,
    headers
  });
}
async function postWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "POST",
    token,
    data,
    headers
  });
}
async function postWithoutAuth(url, data, headers = {}) {
  const effectiveHeaders = {
    "Content-Type": "application/json",
    ...headers
  };
  if (typeof window === "undefined" && !effectiveHeaders["User-Agent"]) {
    try {
      const base = `nextjs-sdk-core`;
      effectiveHeaders["User-Agent"] = typeof process !== "undefined" && process?.version ? `${base} (node ${process.version})` : base;
    } catch {
      effectiveHeaders["User-Agent"] = "nextjs-sdk-core";
    }
  }
  const response = await fetch(url, {
    method: "POST",
    headers: effectiveHeaders,
    body: data ? JSON.stringify(data) : void 0
  });
  if (!response.ok) {
    try {
      const text2 = await response.text();
      if (text2 && text2.trim()) {
        let errorData;
        try {
          errorData = JSON.parse(text2);
        } catch {
          errorData = text2;
        }
        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
            }
          }
        }
        const derivedMessage = findMessageInError(errorData) || (typeof errorData === "string" ? errorData : response.statusText);
        throw new ApiError(response.status, errorData, derivedMessage);
      }
      throw new ApiError(
        response.status,
        null,
        `POST request failed: ${response.status} ${response.statusText}`
      );
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        response.status,
        null,
        `POST request failed: ${response.status} ${response.statusText}`
      );
    }
  }
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0") {
    return {};
  }
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {};
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(
      `Failed to parse response as JSON: ${text.substring(0, 100)}`
    );
  }
}
async function putWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "PUT",
    token,
    data,
    headers
  });
}
async function putWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PUT",
    data,
    headers
  });
}
async function deleteWithAuth(url, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "DELETE",
    token,
    headers
  });
}
async function deleteWithoutAuth(url, headers) {
  return apiFetch(url, {
    method: "DELETE",
    headers
  });
}
async function patchWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "PATCH",
    token,
    data,
    headers
  });
}
async function patchWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PATCH",
    data,
    headers
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteWithAuth,
  deleteWithoutAuth,
  getWithAuth,
  getWithoutAuth,
  patchWithAuth,
  patchWithoutAuth,
  postWithAuth,
  postWithoutAuth,
  putWithAuth,
  putWithoutAuth
});
