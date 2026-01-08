import {
  decryptUniversal,
  encryptSync
} from "./chunk-ZHQCSR7B.js";

// src/utils/cookie.ts
var COOKIE_NAMES = {
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
var SECURE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
  // 7 days
};
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
function getEncryptedCookie(cookieStore, name) {
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
      const decrypted = decryptUniversal(cookie.value);
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

export {
  COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS,
  setEncryptedCookie,
  getEncryptedCookie,
  setPlainCookie,
  deleteCookie
};
