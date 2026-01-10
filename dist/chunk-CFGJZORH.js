// src/utils/cookie.ts
var COOKIE_NAMES = {
  /** Primary session token (encrypted when possible) */
  SESSION_ID: "session_id",
  /** User authentication flag */
  IS_USER: "isUser",
  /** Legacy: third-party token (for migration) */
  TP_ID: "tp_id",
  /** Legacy: crf cookie (for migration - deprecated) */
  CRF: "crf"
  /** Legacy: access token (for migration - deprecated) */
  // ACCESS_TOKEN: 'access_token',
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
  if (typeof window !== "undefined") {
    throw new Error("setEncryptedCookie must only be called server-side");
  }
  try {
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      ...options
    });
  } catch (e) {
    console.error(`[cookie:setEncryptedCookie] Failed to set cookie ${name}:`, e);
    throw e;
  }
}
function getEncryptedCookie(cookieStore, name) {
  if (typeof window !== "undefined") {
    throw new Error("getEncryptedCookie must only be called server-side");
  }
  try {
    const cookie = cookieStore.get(name);
    if (!cookie?.value) return null;
    return cookie.value;
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to read ${name}:`, e);
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
