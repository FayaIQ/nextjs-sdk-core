import {
  decryptSync,
  encryptSync
} from "./chunk-YK22JPDO.js";

// src/utils/cookie.ts
var COOKIE_NAMES = {
  /** Encrypted backend access token (httpOnly) */
  CRF: "crf",
  /** User authentication flag */
  IS_USER: "isUser",
  /** Legacy: third-party token (for migration) */
  TP_ID: "tp_id",
  /** Legacy: access token (for migration) */
  ACCESS_TOKEN: "access_token"
};
var SECURE_COOKIE_OPTIONS = {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
  // 7 days
};
function setEncryptedCookie(cookieStore, name, value, options) {
  if (typeof window !== "undefined") {
    throw new Error("setEncryptedCookie must only be called server-side");
  }
  const encrypted = encryptSync(value);
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
    console.log(cookie.value);
    try {
      const decrypted = decryptSync(cookie.value);
      console.log(decrypted);
      return decrypted ?? null;
    } catch (e) {
      throw e;
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

export {
  COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS,
  setEncryptedCookie,
  getEncryptedCookie,
  setPlainCookie,
  deleteCookie
};
