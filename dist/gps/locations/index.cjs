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
var crypto_exports = {};
__export(crypto_exports, {
  decrypt: () => decrypt,
  decryptSync: () => decryptSync,
  decryptUniversal: () => decryptUniversal,
  encrypt: () => encrypt,
  encryptSync: () => encryptSync
});
function normalizeBase64(input) {
  if (!input)
    throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  return b64;
}
function base64ToBytes(b64) {
  const normalized = normalizeBase64(b64);
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(normalized, "base64");
    const arr = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) arr[i] = buf[i];
    return arr;
  }
  if (typeof atob === "function") {
    const binary = atob(normalized);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  throw new Error(
    "No available base64 decoder (Buffer or atob). Cannot decode encryption key."
  );
}
function encryptSync(text) {
  console.log(`[crypto:encryptSync] Called with text length: ${text?.length || 0}`);
  if (!text) {
    console.log("[crypto:encryptSync] No text provided, returning as-is");
    return text;
  }
  try {
    console.log("[crypto:encryptSync] Starting encryption process");
    const crypto2 = nodeCrypto;
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    console.log(`[crypto:encryptSync] ENCRYPTION_KEY_BASE64 present: ${!!keyBase64}`);
    if (!keyBase64) {
      console.error("[crypto:encryptSync] ENCRYPTION_KEY_BASE64 environment variable is not set");
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }
    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    console.log(`[crypto:encryptSync] Key length: ${key.length} bytes`);
    if (key.length !== 32) {
      console.error(`[crypto:encryptSync] Invalid key length: ${key.length}, expected 32`);
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }
    const iv = crypto2.randomBytes(12);
    console.log(`[crypto:encryptSync] Generated IV: ${iv.toString("hex")}`);
    const cipher = crypto2.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();
    console.log(`[crypto:encryptSync] Auth tag length: ${authTag.length} bytes`);
    const combined = Buffer.concat([iv, encrypted, authTag]);
    const result = combined.toString("base64");
    console.log(`[crypto:encryptSync] Encryption successful, result length: ${result.length}`);
    return result;
  } catch (e) {
    console.error("[crypto:encryptSync] Encryption failed:", e);
    throw e;
  }
}
function decryptSync(payload) {
  console.log(`[crypto:decryptSync] Called with payload length: ${payload?.length || 0}`);
  if (!payload) {
    console.log("[crypto:decryptSync] No payload provided, returning as-is");
    return payload;
  }
  try {
    console.log("[crypto:decryptSync] Starting decryption process");
    const crypto2 = nodeCrypto;
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    console.log(`[crypto:decryptSync] ENCRYPTION_KEY_BASE64 present: ${!!keyBase64}`);
    if (!keyBase64) {
      console.error("[crypto:decryptSync] ENCRYPTION_KEY_BASE64 environment variable is not set");
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }
    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    console.log(`[crypto:decryptSync] Key length: ${key.length} bytes`);
    if (key.length !== 32) {
      console.error(`[crypto:decryptSync] Invalid key length: ${key.length}, expected 32`);
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }
    const combined = Buffer.from(payload, "base64");
    console.log(`[crypto:decryptSync] Combined buffer length: ${combined.length} bytes`);
    const iv = combined.slice(0, 12);
    const authTag = combined.slice(-16);
    const encrypted = combined.slice(12, -16);
    console.log(`[crypto:decryptSync] IV length: ${iv.length}, encrypted length: ${encrypted.length}, authTag length: ${authTag.length}`);
    const decipher = crypto2.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const result = decrypted.toString("utf8");
    console.log(`[crypto:decryptSync] Decryption successful, result length: ${result.length}`);
    return result;
  } catch (e) {
    console.error("[crypto:decryptSync] Decryption failed:", e);
    throw e;
  }
}
async function encrypt(text) {
  if (!text) return text;
  const key = await keyPromise;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = encoder.encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  const encryptedBytes = new Uint8Array(encrypted);
  const authTagLength = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLength);
  const authTag = encryptedBytes.slice(-authTagLength);
  const combined = new Uint8Array(
    iv.length + ciphertext.length + authTag.length
  );
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  combined.set(authTag, iv.length + ciphertext.length);
  let binary = "";
  combined.forEach((b) => binary += String.fromCharCode(b));
  return btoa(binary);
}
async function decrypt(payload) {
  if (!payload) return payload;
  const combined = base64ToBytes(payload);
  const iv = combined.slice(0, 12);
  const ct = combined.slice(12);
  const key = await keyPromise;
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return decoder.decode(pt);
}
async function decryptUniversal(payload) {
  console.log(`[crypto:decryptUniversal] Attempting to decrypt payload length: ${payload?.length || 0}`);
  if (!payload) {
    console.log("[crypto:decryptUniversal] No payload provided");
    return payload;
  }
  try {
    console.log("[crypto:decryptUniversal] Trying Node.js crypto decryption");
    const result = decryptSync(payload);
    console.log("[crypto:decryptUniversal] Node.js crypto decryption successful");
    return result;
  } catch (nodeError) {
    console.log("[crypto:decryptUniversal] Node.js crypto decryption failed, trying Web Crypto:", nodeError);
    try {
      console.log("[crypto:decryptUniversal] Trying Web Crypto API decryption");
      const result = await decrypt(payload);
      console.log("[crypto:decryptUniversal] Web Crypto API decryption successful");
      return result;
    } catch (webError) {
      console.error("[crypto:decryptUniversal] Both decryption methods failed");
      console.error("[crypto:decryptUniversal] Node.js error:", nodeError);
      console.error("[crypto:decryptUniversal] Web Crypto error:", webError);
      throw nodeError;
    }
  }
}
var nodeCrypto, keyPromise, encoder, decoder;
var init_crypto = __esm({
  "src/utils/crypto.ts"() {
    "use strict";
    nodeCrypto = __toESM(require("crypto"), 1);
    keyPromise = (async () => {
      const raw = base64ToBytes(process.env.ENCRYPTION_KEY_BASE64);
      return crypto.subtle.importKey(
        "raw",
        raw.buffer,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
      );
    })();
    encoder = new TextEncoder();
    decoder = new TextDecoder();
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
  console.log(`[cookie:setEncryptedCookie] Setting encrypted cookie: ${name}, value length: ${value?.length || 0}`);
  if (typeof window !== "undefined") {
    console.error("[cookie:setEncryptedCookie] ERROR: Called on client-side");
    throw new Error("setEncryptedCookie must only be called server-side");
  }
  try {
    const encrypted = encryptSync(value);
    console.log(`[cookie:setEncryptedCookie] Encryption successful for ${name}, encrypted length: ${encrypted?.length || 0}`);
    cookieStore.set(name, encrypted, {
      ...SECURE_COOKIE_OPTIONS,
      ...options
    });
    console.log(`[cookie:setEncryptedCookie] Cookie ${name} set successfully`);
  } catch (e) {
    console.error(`[cookie:setEncryptedCookie] Failed to set encrypted cookie ${name}:`, e);
    throw e;
  }
}
async function getEncryptedCookie(cookieStore, name) {
  console.log(`[cookie:getEncryptedCookie] Attempting to get encrypted cookie: ${name}`);
  if (typeof window !== "undefined") {
    console.error("[cookie:getEncryptedCookie] ERROR: Called on client-side");
    throw new Error("getEncryptedCookie must only be called server-side");
  }
  try {
    const cookie = cookieStore.get(name);
    console.log(`[cookie:getEncryptedCookie] Cookie ${name} exists: ${!!cookie}, has value: ${!!cookie?.value}`);
    if (!cookie?.value) {
      console.log(`[cookie:getEncryptedCookie] No value found for cookie ${name}`);
      return null;
    }
    console.log(`[cookie:getEncryptedCookie] Raw cookie value length: ${cookie.value.length}`);
    console.log(`[cookie:getEncryptedCookie] Raw cookie value (first 50 chars): ${cookie.value.substring(0, 50)}...`);
    try {
      const decrypted = await decryptUniversal(cookie.value);
      console.log(`[cookie:getEncryptedCookie] Universal decryption successful for ${name}, decrypted length: ${decrypted?.length || 0}`);
      if (decrypted) {
        console.log(`[cookie:getEncryptedCookie] Decrypted value (first 20 chars): ${decrypted.substring(0, 20)}...`);
      }
      return decrypted ?? null;
    } catch (e) {
      console.error(`[cookie:getEncryptedCookie] Universal decryption failed for ${name}:`, e);
      throw e;
    }
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to get/decrypt cookie ${name}:`, e);
    return null;
  }
}
function setPlainCookie(cookieStore, name, value, options) {
  console.log(`[cookie:setPlainCookie] Setting plain cookie: ${name}, value length: ${value?.length || 0}`);
  try {
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      httpOnly: false,
      // Allow client-side read for flags
      ...options
    });
    console.log(`[cookie:setPlainCookie] Plain cookie ${name} set successfully`);
  } catch (e) {
    console.error(`[cookie:setPlainCookie] Failed to set plain cookie ${name}:`, e);
    throw e;
  }
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
      /** Primary session token (encrypted when possible) */
      SESSION_ID: "session_id",
      /** User authentication flag */
      IS_USER: "isUser",
      /** Legacy: third-party token (for migration) */
      TP_ID: "tp_id",
      /** Legacy: crf cookie (for migration - deprecated) */
      CRF: "crf",
      /** Legacy: access token (for migration - deprecated) */
      ACCESS_TOKEN: "access_token"
    };
    SECURE_COOKIE_OPTIONS = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    };
  }
});

// src/token.ts
async function getTokenImpl() {
  console.log(`[token:getTokenImpl] Starting token retrieval. AUTH_MODE: ${AUTH_MODE}, USE_TOKEN_ROUTE: ${USE_TOKEN_ROUTE}, isServer: ${typeof window === "undefined"}`);
  if (typeof window === "undefined") {
    console.log("[token:getTokenImpl] Server-side execution, checking x-access-token header");
    const { headers } = await import("next/headers");
    const headerToken = (await headers()).get("x-access-token");
    console.log(`[token:getTokenImpl] x-access-token header present: ${!!headerToken}`);
    if (headerToken) {
      console.log(`[token:getTokenImpl] Raw header token length: ${headerToken.length}`);
      console.log(`[token:getTokenImpl] Header token preview: ${headerToken.substring(0, 50)}...`);
      const { decryptUniversal: decryptUniversal2 } = await Promise.resolve().then(() => (init_crypto(), crypto_exports));
      try {
        console.log("[token:getTokenImpl] Attempting to decrypt header token");
        const decryptedToken = await decryptUniversal2(headerToken);
        if (decryptedToken) {
          console.log(`[token:getTokenImpl] Header token decrypted successfully, length: ${decryptedToken.length}`);
          console.log(`[token:getTokenImpl] Decrypted token preview: ${decryptedToken.substring(0, 20)}...${decryptedToken.substring(decryptedToken.length - 20)}`);
          try {
            const trimmed = decryptedToken.trim();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
              try {
                const parsed = JSON.parse(trimmed);
                if (parsed) {
                  const candidate = parsed.session_id || parsed.access_token || parsed.token || parsed.accessToken;
                  if (candidate && typeof candidate === "string") {
                    console.log("[token:getTokenImpl] Extracted token from decrypted JSON payload");
                    return candidate;
                  }
                }
              } catch (jsonErr) {
              }
            }
            const looksLikeJWT = trimmed.includes(".") && trimmed.split(".").length === 3;
            if (!looksLikeJWT) {
              const base64Pattern = /^[A-Za-z0-9+/=\n\r]+$/;
              if (base64Pattern.test(trimmed)) {
                try {
                  const decoded = Buffer.from(trimmed.replace(/\s+/g, ""), "base64").toString("utf8");
                  if (decoded && decoded.includes(".") && decoded.split(".").length === 3) {
                    console.log("[token:getTokenImpl] Base64-decoded decrypted payload into JWT");
                    return decoded;
                  }
                } catch (b64Err) {
                }
              }
            }
            return decryptedToken;
          } catch (extractErr) {
            console.log("[token:getTokenImpl] Error extracting token from decrypted payload, returning decrypted string", extractErr);
            return decryptedToken;
          }
        } else {
          console.log("[token:getTokenImpl] Decryption returned null/undefined, using original token");
          return headerToken;
        }
      } catch (e) {
        console.log("[token:getTokenImpl] Header token decryption failed, using as-is (might be plain JWT)");
        return headerToken;
      }
    }
  }
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    console.log("[token:getTokenImpl] Strict mode server-side, checking cookies");
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log(`[token:getTokenImpl] Available cookies: ${cookieStore.getAll().map((c) => c.name).join(", ")}`);
    let token = null;
    const { getEncryptedCookie: getEncryptedCookie2, COOKIE_NAMES: COOKIE_NAMES2 } = await Promise.resolve().then(() => (init_cookie(), cookie_exports));
    console.log("[token:getTokenImpl] Trying encrypted session_id");
    try {
      token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.SESSION_ID);
      if (token) {
        console.log("[token:getTokenImpl] Found encrypted session_id");
        console.log(`[token:getTokenImpl] Token preview: ${token.substring(0, 20)}...${token.substring(token.length - 20)}`);
        console.log(`[token:getTokenImpl] Token length: ${token.length}`);
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] session_id decryption failed, trying plain");
    }
    console.log("[token:getTokenImpl] Trying plain session_id");
    token = cookieStore.get(COOKIE_NAMES2.SESSION_ID)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found plain session_id, returning token");
      return token;
    }
    console.log("[token:getTokenImpl] Trying middleware access_token cookie");
    try {
      token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.ACCESS_TOKEN);
      if (token) {
        console.log("[token:getTokenImpl] Found encrypted access_token (middleware), returning token");
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] access_token decryption failed, trying plain");
    }
    token = cookieStore.get(COOKIE_NAMES2.ACCESS_TOKEN)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found plain access_token (middleware), returning token");
      return token;
    }
    console.log("[token:getTokenImpl] Trying legacy cookie names");
    try {
      token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.CRF);
      if (token) {
        console.log("[token:getTokenImpl] Found legacy encrypted crf, returning token");
        return token;
      }
    } catch (e) {
      console.log("[token:getTokenImpl] Legacy crf decryption failed");
    }
    token = cookieStore.get(COOKIE_NAMES2.ACCESS_TOKEN)?.value || null;
    if (token) {
      console.log("[token:getTokenImpl] Found legacy plain access_token, returning token");
      return token;
    }
    console.error(
      "[token:getTokenImpl] No token found in strict mode. Available cookies:",
      cookieStore.getAll().map((c) => c.name)
    );
    const err = new Error("Unauthorized: Access token missing (strict mode)");
    err.status = 401;
    console.error("[token:getTokenImpl] Throwing 401 error:", err.message);
    throw err;
  }
  if (typeof window === "undefined") {
    console.log("[token:getTokenImpl] Auto mode server-side, checking cookies");
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      console.log(`[token:getTokenImpl:auto] Available cookies: ${cookieStore.getAll().map((c) => c.name).join(", ")}`);
      const { getEncryptedCookie: getEncryptedCookie2, COOKIE_NAMES: COOKIE_NAMES2 } = await Promise.resolve().then(() => (init_cookie(), cookie_exports));
      let token = null;
      console.log("[token:getTokenImpl:auto] Trying encrypted session_id");
      try {
        token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.SESSION_ID);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found encrypted session_id");
          console.log(`[token:getTokenImpl:auto] Token preview: ${token.substring(0, 20)}...${token.substring(token.length - 20)}`);
          console.log(`[token:getTokenImpl:auto] Token length: ${token.length}`);
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] session_id decryption failed, trying plain");
      }
      console.log("[token:getTokenImpl:auto] Trying plain session_id");
      token = cookieStore.get(COOKIE_NAMES2.SESSION_ID)?.value || null;
      if (token) {
        console.log("[token:getTokenImpl:auto] Found plain session_id, returning token");
        return token;
      }
      console.log("[token:getTokenImpl:auto] Trying middleware access_token cookie");
      try {
        token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.ACCESS_TOKEN);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found encrypted access_token (middleware), returning token");
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] access_token decryption failed, trying plain");
      }
      token = cookieStore.get(COOKIE_NAMES2.ACCESS_TOKEN)?.value || null;
      if (token) {
        console.log("[token:getTokenImpl:auto] Found plain access_token (middleware), returning token");
        return token;
      }
      console.log("[token:getTokenImpl:auto] Trying legacy cookie names");
      try {
        token = await getEncryptedCookie2(cookieStore, COOKIE_NAMES2.CRF);
        if (token) {
          console.log("[token:getTokenImpl:auto] Found legacy encrypted crf, returning token");
          return token;
        }
      } catch (e) {
        console.log("[token:getTokenImpl:auto] Legacy crf decryption failed");
      }
      console.warn(
        "[token:getTokenImpl:auto] No token found. Available cookies:",
        cookieStore.getAll().map((c) => c.name)
      );
    } catch (e) {
      console.error("[token:getTokenImpl:auto] Error reading cookies:", e);
    }
  }
  if (typeof window !== "undefined") {
    console.log("[token:getTokenImpl] Client-side execution, checking cookies");
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    };
    console.log("[token:getTokenImpl] Checking for session_id cookie");
    const sessionIdToken = getCookie("session_id");
    console.log(`[token:getTokenImpl] session_id cookie found: ${!!sessionIdToken}`);
    if (sessionIdToken) {
      console.log("[token:getTokenImpl] Returning token from session_id cookie");
      return sessionIdToken;
    }
    console.log("[token:getTokenImpl] Checking for legacy access_token cookie");
    const accessToken = getCookie("access_token");
    console.log(`[token:getTokenImpl] access_token cookie found: ${!!accessToken}`);
    if (accessToken) {
      console.log("[token:getTokenImpl] Returning token from legacy access_token cookie");
      return accessToken;
    }
    console.error("[token:getTokenImpl] No token available on client side");
    throw new Error("No token available on client side");
  }
  console.error("[token:getTokenImpl] No token available (server-side fallback)");
  throw new Error("No token available");
}
function getToken() {
  return getTokenImpl();
}
var AUTH_MODE, USE_TOKEN_ROUTE;
var init_token = __esm({
  "src/token.ts"() {
    "use strict";
    AUTH_MODE = process.env.AUTH_MODE || "strict";
    USE_TOKEN_ROUTE = process.env.USE_TOKEN_ROUTE === "true";
  }
});

// src/core/fetcher.ts
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
    let authToken = token;
    try {
      const { decryptUniversal: decryptUniversal2 } = await Promise.resolve().then(() => (init_crypto(), crypto_exports));
      const maybe = await decryptUniversal2(token);
      if (maybe) {
        authToken = maybe;
        console.log("[apiFetch] Token decrypted before use");
      } else {
        console.log("[apiFetch] decryptUniversal returned null/undefined, using original token");
      }
    } catch (err) {
      console.log("[apiFetch] Token decryption skipped/failed, using provided token as-is");
    }
    requestHeaders["Authorization"] = `Bearer ${authToken}`;
    try {
      console.log(`[apiFetch] Authorization header set with token preview: ${authToken.substring(0, 20)}...${authToken.substring(authToken.length - 20)}`);
    } catch {
      console.log("[apiFetch] Authorization header set (token preview unavailable)");
    }
  } else {
    console.log("[apiFetch] No token provided, skipping Authorization header");
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
  console.log(`[apiFetch] ${method} ${endpoint} -> Status: ${response.status} ${response.statusText}`);
  if (!response.ok) {
    console.log(`[apiFetch] Request failed with status ${response.status}`);
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
var ApiError;
var init_fetcher = __esm({
  "src/core/fetcher.ts"() {
    "use strict";
    init_token();
    ApiError = class _ApiError extends Error {
      constructor(status, body, message) {
        super(message || `Request failed with status ${status}`);
        this.status = status;
        this.body = body;
        Object.setPrototypeOf(this, _ApiError.prototype);
      }
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
var init_core = __esm({
  "src/core/index.ts"() {
    "use strict";
    init_fetcher();
  }
});

// src/api/api.ts
var api_exports = {};
__export(api_exports, {
  Api: () => Api
});
var _Api, Api;
var init_api = __esm({
  "src/api/api.ts"() {
    "use strict";
    _Api = class _Api {
      static getStoreDeliveryZones(storeId) {
        return `${_Api.GPS_BASE}/v1/Stores/${storeId}/DeliveryZones`;
      }
      static getProductInfo(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
      }
      static getProductInfoV2(id) {
        return `${_Api.INVENTORY_BASE}/v2/Items/${id}/FullInfo`;
      }
      static getMenuById(id) {
        return `${_Api.INVENTORY_BASE}/v1/Menus/${id}`;
      }
      static getOfferById(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}`;
      }
      static deleteOffer(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}`;
      }
      static getStoreInvoiceDiscount(storeId, coupon) {
        return `${_Api.STORES_BASE}/v1/Stores/${storeId}/Offers/InvoiceDiscount/${encodeURIComponent(
          String(coupon)
        )}`;
      }
      static getOffersDeliveryZones(deliveryZoneId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/DeliveryZoneDiscount/${deliveryZoneId}`;
      }
      static postOffersAddItemsByFilter(offerId, forceUpdate) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/AddItemsByFilter/${encodeURIComponent(
          String(forceUpdate)
        )}`;
      }
      static postOffersDeliveryZones(offerId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/DeliveryZones`;
      }
      static getOffersGroups(offerId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups`;
      }
      static putOffersGroup(offerId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
      }
      static deleteOffersGroup(offerId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
      }
      static putOffersCustomerDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/CustomerDiscount`;
      }
      static putOffersExtraItemDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ExtraItemDiscount`;
      }
      static putOffersInvoiceDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/InvoiceDiscount`;
      }
      static putOffersItemsDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount`;
      }
      static putOffersItemsDiscountCustomers(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount/Customers`;
      }
      static putOffersShippingDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ShippingDiscount`;
      }
      static putOffersPointDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/PointDiscount`;
      }
      static putOffersItemCollectionDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemCollectionDiscount`;
      }
      static putOffersMultiCouponDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/MultiCouponDiscount`;
      }
      static putOffersDarkDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/DarkDiscount`;
      }
      static getStoreById(id) {
        return `${_Api.STORES_BASE}/v1/Stores/${id}`;
      }
      static putOrderPayment(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Payment`;
      }
      static putOrderPaymentStatus(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Payment/Status`;
      }
      // Payments endpoints
      static getStorePayments(storeId) {
        return `${_Api.INVENTORY_BASE}/v1/Stores/${storeId}/Payments`;
      }
      static getPayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static putPayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static deletePayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static getItemById(id) {
        return `${_Api.INVENTORY_BASE}/v3/Items/${id}`;
      }
      // Dynamic endpoints with IDs
      // Wishlist endpoints (lowercase per spec)
      static postWish(id) {
        return `${_Api.INVENTORY_BASE}/v1/items/${id}/wish`;
      }
      static deleteWish(id) {
        return `${_Api.INVENTORY_BASE}/v1/items/${id}/unwish`;
      }
      static getCategoryProducts(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?CurrentPage=1&PageSize=1000&menuId=${id}`;
      }
      static getOrder(id) {
        return `${_Api.INVENTORY_BASE}/v3/Orders/${id}`;
      }
      static getAddress(id) {
        return `${_Api.GPS_BASE}/v1/Addresses/${id}`;
      }
      // Order item endpoints (v3)
      static getOrderItem(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Items/${itemId}`;
      }
      static postOrderItem(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems`;
      }
      static putOrderItemCancel(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/cancel`;
      }
      static putOrderCancel(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Cancel`;
      }
      static putOrderItemUndoCancel(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/UndoCancel`;
      }
      static putOrderItemUpdate(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/update`;
      }
      static putOrderApprove(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ApproveDeliveryOrder`;
      }
      static putOrderDisapprove(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/DisapproveDeliveryOrder`;
      }
      static putChangeStatusOrder(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ChangeDeliveryOrderStatus`;
      }
      static cancelOrder(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
      }
      static getOrdersDelagates(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
      }
      static postOrdersDelagates(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
      }
      static putOrdersDelagatesLoggedIn(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates/LoggedInUser`;
      }
      static deleteDelagate(orderId, delegateId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Delagates/${delegateId}`;
      }
      static putOrderDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Discount`;
      }
      static putOrderReferenceId(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceId`;
      }
      static putOrderReferenceDeliveryId(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceDeliveryId`;
      }
      // Copy items to a specific child store
      static postCopyToStore(childStoreId) {
        return `${_Api.INVENTORY_BASE}/v1/Items/Copy/Store/${childStoreId}`;
      }
      // Sync parent store data to child store for a given item
      static putItemParentStoreSync(itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${itemId}/Parent/Store/Sync`;
      }
      // Item activation endpoints
      static putItemActivate(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/Activate`;
      }
      static putItemDeactivate(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/Deactivate`;
      }
      // Item collections activate/deactivate by filter
      static putItemsCollectionsActivateByFilter() {
        return `${_Api.INVENTORY_BASE}/v1/Items/Collections/ActivateByFilter`;
      }
      static putItemsCollectionsDeactivateByFilter() {
        return `${_Api.INVENTORY_BASE}/v1/Items/Collections/DeActivateByFilter`;
      }
      // Item update endpoint
      static putItem(id) {
        return `${_Api.INVENTORY_BASE}/v3/Items/${id}`;
      }
      static deleteItem(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}`;
      }
      // Item collection endpoint (update a specific collection for an item)
      static putItemCollection(itemId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${itemId}/Collections/${id}`;
      }
      // Activate / Deactivate an item collection
      static putItemCollectionActivate(itemId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${itemId}/Collections/${id}/Activate`;
      }
      static putItemCollectionDeactivate(itemId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${itemId}/Collections/${id}/Deactivate`;
      }
      static getLocationChildren(parentId) {
        return `${_Api.GPS_BASE}/v1/Locations/${parentId}/Children/Dropdown`;
      }
      //
      static getInvoiceDiscount(code) {
        const clean = encodeURIComponent(code);
        return `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
      }
      static patchCartItem(id) {
        return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
          String(id)
        )}`;
      }
      static deleteCartItem(id) {
        return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
          String(id)
        )}`;
      }
    };
    _Api.LOCAL_BASE = "http://localhost:3000";
    _Api.IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
    _Api.NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
    _Api.STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
    _Api.GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
    _Api.THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
    _Api.INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
    _Api.CRM_BASE = `https://storeak-crm-service.azurewebsites.net/api`;
    _Api.IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;
    _Api.signIn = `${_Api.IDENTITY_BASE}/v1/token`;
    _Api.refreshToken = `${_Api.IDENTITY_BASE}/v1/token/refresh`;
    _Api.sessionLogout = `${_Api.IDENTITY_BASE}/v1/session/logout`;
    _Api.clearCart = `${_Api.INVENTORY_BASE}/v1/Carts/Clear`;
    _Api.getUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
    _Api.postUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
    _Api.putUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
    _Api.patchUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
    _Api.putUserAvatar = `${_Api.IDENTITY_BASE}/v1/Users/avatar`;
    _Api.putUserPassword = `${_Api.IDENTITY_BASE}/v1/Users/password`;
    _Api.getUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
    _Api.putUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
    _Api.phoneVerificationSend = `${_Api.IDENTITY_BASE}/v1/verification/phone/send`;
    _Api.phoneVerificationVerify = `${_Api.IDENTITY_BASE}/v1/verification/phone/verify`;
    // stores
    _Api.getStores = `${_Api.STORES_BASE}/v1/Stores/Dropdown`;
    // Store users
    _Api.getStoreUsersPaging = `${_Api.IDENTITY_BASE}/v1/StoreUsers/Paging`;
    // Other services
    _Api.getProducts = `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile`;
    _Api.getItemsPaging = `${_Api.INVENTORY_BASE}/v2/Items/Paging`;
    _Api.getMenus = `${_Api.INVENTORY_BASE}/v1/Menus/Search/true`;
    _Api.getMenusDropdown = `${_Api.INVENTORY_BASE}/v1/Menus/Dropdown`;
    // Offers endpoints
    _Api.getOffersPaging = `${_Api.INVENTORY_BASE}/v1/Offers/Paging`;
    _Api.getOffersCustomerItemLoggedIn = `${_Api.INVENTORY_BASE}/v1/Offers/CustomerItem/LoggedIn`;
    _Api.getOffersItemsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Items/DropDown`;
    _Api.getOffersSlideShowsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/SlideShows/DropDown`;
    _Api.getOffersItemsStores = `${_Api.INVENTORY_BASE}/v1/Offers/Items/Stores`;
    _Api.getOffersPointsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Points/DropDown`;
    _Api.getOffersNewsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/News/DropDown`;
    _Api.getOffersCouponsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
    _Api.postOffersItemsDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount`;
    _Api.postOffersItemsDiscountCustomers = `${_Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount/Customers`;
    _Api.postOffersExtraItemDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ExtraItemDiscount`;
    _Api.postOffersCustomerDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/CustomerDiscount`;
    _Api.postOffersInvoiceDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount`;
    _Api.postOffersMultiCouponDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/MultiCouponDiscount`;
    _Api.postOffersShippingDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ShippingDiscount`;
    _Api.postOffersPointDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/PointDiscount`;
    _Api.postOffersItemCollectionDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ItemCollectionDiscount`;
    _Api.postOffersDarkDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/DarkDiscount`;
    _Api.getOffersCustomers = `${_Api.INVENTORY_BASE}/v1/Offers/Customers`;
    _Api.getCouponOffers = `${_Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
    _Api.getBranches = `${_Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
    _Api.getBrands = `${_Api.INVENTORY_BASE}/v1/Complex/MenuBrand`;
    _Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
    _Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
    // CRM - Clients
    _Api.getClientsPaging = `${_Api.CRM_BASE}/v1/Clients/Paging`;
    _Api.getClients = `${_Api.CRM_BASE}/v1/Clients`;
    _Api.postClients = `${_Api.CRM_BASE}/v1/Clients`;
    _Api.postOrders = `${_Api.INVENTORY_BASE}/v2/Orders`;
    _Api.getStoreInfo = `${_Api.STORES_BASE}/v1/Stores/Info`;
    _Api.getCities = `${_Api.GPS_BASE}/v1/Locations`;
    _Api.getDeliveryZones = `${_Api.GPS_BASE}/v1/DeliveryZones`;
    _Api.getReportsCustomerOrders = `${_Api.INVENTORY_BASE}/v1/Reports/CustomerOrders`;
    _Api.getReportsOrderSales = `${_Api.INVENTORY_BASE}/v1/Reports/OrderSales`;
    _Api.postPayments = `${_Api.INVENTORY_BASE}/v1/Payments`;
    _Api.getPayments = `${_Api.INVENTORY_BASE}/v1/Payments`;
    _Api.getPaymentsReport = `${_Api.INVENTORY_BASE}/v1/Payments/Report`;
    _Api.getSlideShows = `${_Api.THEME_BASE}/v1/SlideShows/Paging?pageSize=20`;
    // orders endpoints
    _Api.getOrderFullInfo = `${_Api.INVENTORY_BASE}/v1/Orders/List/FullInfo`;
    _Api.putOrderApproveList = `${_Api.INVENTORY_BASE}/v1/Orders/ApproveDeliveryOrder/List`;
    _Api.putOrderDisapproveList = `${_Api.INVENTORY_BASE}/v1/Orders/DisapproveDeliveryOrder/List`;
    _Api.postOrderDelagatesList = `${_Api.INVENTORY_BASE}/v1/Orders/Delagates/List`;
    // category
    _Api.getCatigories = `${_Api.INVENTORY_BASE}/v1/Categories/Dropdown`;
    // identity
    _Api.getApplicationsStores = `${_Api.IDENTITY_BASE}/v1/Applications/Store/DropDown`;
    _Api.getCustomersDropdown = `${_Api.IDENTITY_BASE}/v1/Users/Customers/DropDown`;
    _Api.getItemsSource = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Dropdown`;
    /////////////////////////////////////////
    //GPS
    _Api.getCountries = `${_Api.GPS_BASE}/v1/Locations/Countries/Dropdown`;
    _Api.getParentProducts = `${_Api.INVENTORY_BASE}/v1/Items/ParentStore/Paging`;
    // Items copy endpoints
    _Api.postCopyParentStore = `${_Api.INVENTORY_BASE}/v1/Items/Copy/ParentStore`;
    // Copy from parent to child stores (bulk)
    _Api.postCopyParentToChildStores = `${_Api.INVENTORY_BASE}/v1/Items/Copy/Parent/To/Child/Stores`;
    _Api.getCheckoutQuote = `${_Api.INVENTORY_BASE}/v1/Checkout/Quote`;
    // Cart endpoints
    _Api.getCurrentCart = `${_Api.INVENTORY_BASE}/v1/Carts/Current`;
    _Api.postCartItems = `${_Api.INVENTORY_BASE}/v1/Carts/Items`;
    Api = _Api;
  }
});

// src/gps/locations/index.ts
var locations_exports = {};
__export(locations_exports, {
  getAddressById: () => getAddressById,
  getAddressByIdHandler: () => GET3,
  getCities: () => getCities,
  getCountries: () => getCountries,
  getCountriesHandler: () => GET,
  getDistricts: () => getDistricts,
  getLocationChildren: () => getLocationChildren,
  getLocationChildrenHandler: () => GET2
});
module.exports = __toCommonJS(locations_exports);

// src/gps/locations/getCountries.ts
async function getCountries() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_core(), core_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getCountries);
  }
  const response = await fetch(`/api/locations/countries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

// src/gps/locations/getLocationChildren.ts
async function getLocationChildren(parentId) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_core(), core_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(
      `${Api2.getLocationChildren(parentId)}`
    );
  }
  const response = await fetch(`/api/locations/${parentId}/children`);
  if (!response.ok) {
    throw new Error(`Failed to fetch location children: ${response.statusText}`);
  }
  return response.json();
}
async function getCities(countryId) {
  return getLocationChildren(countryId);
}
async function getDistricts(cityId) {
  return getLocationChildren(cityId);
}

// src/gps/locations/handler/countries.ts
var import_server = require("next/server");
async function GET(request) {
  try {
    const countries = await getCountries();
    return import_server.NextResponse.json(countries);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch countries";
    console.error("countries error:", message);
    return import_server.NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/gps/locations/handler/children.ts
var import_server2 = require("next/server");
async function GET2(request, { params }) {
  try {
    const { parentId: parentIdStr } = await params;
    const parentId = parseInt(parentIdStr, 10);
    if (isNaN(parentId)) {
      return import_server2.NextResponse.json(
        { error: "Invalid parent ID" },
        { status: 400 }
      );
    }
    const children = await getLocationChildren(parentId);
    return import_server2.NextResponse.json(children);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch location children";
    console.error("location children error:", message);
    return import_server2.NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/gps/locations/getAddressById.ts
async function getAddressById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_core(), core_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getAddress(id));
  }
  const res = await fetch(`/api/addresses/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch address ${id}: ${res.statusText}`);
  }
  return res.json();
}

// src/gps/locations/handler/getAddressById.ts
var import_server4 = require("next/server");

// src/core/errorResponse.ts
var import_server3 = require("next/server");
init_fetcher();
function toNextResponseFromError(err) {
  if (err instanceof ApiError) {
    const body = err.body ?? { message: err.message };
    const status = err.status && typeof err.status === "number" ? err.status : 500;
    return import_server3.NextResponse.json(body, { status });
  }
  if (err instanceof Error) {
    return import_server3.NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
  try {
    return import_server3.NextResponse.json(err, { status: 500 });
  } catch {
    return import_server3.NextResponse.json({ message: String(err) }, { status: 500 });
  }
}

// src/gps/locations/handler/getAddressById.ts
async function GET3(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return import_server4.NextResponse.json(address);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAddressById,
  getAddressByIdHandler,
  getCities,
  getCountries,
  getCountriesHandler,
  getDistricts,
  getLocationChildren,
  getLocationChildrenHandler
});
