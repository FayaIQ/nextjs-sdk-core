/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 */

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Cookie names used by the SDK
 */
export const COOKIE_NAMES = {
  /** Primary session token (encrypted when possible) */
  SESSION_ID: "session_id",
  /** User authentication flag */
  IS_USER: "isUser",
  /** Legacy: third-party token (for migration) */
  TP_ID: "tp_id",
  /** Legacy: crf cookie (for migration - deprecated) */
  CRF: "crf",
  /** Legacy: access token (for migration - deprecated) */
  // ACCESS_TOKEN: 'access_token',
} as const;

/**
 * Default cookie options for secure httpOnly cookies
 */
export const SECURE_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Set an encrypted cookie value.
 * Server-side only.
 */
export function setEncryptedCookie(
  cookieStore: any,
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
): void {
  if (typeof window !== "undefined") {
    throw new Error("setEncryptedCookie must only be called server-side");
  }

  try {
    // Encryption removed: store plain value
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      ...options,
    });
  } catch (e) {
    console.error(
      `[cookie:setEncryptedCookie] Failed to set cookie ${name}:`,
      e
    );
    throw e;
  }
}

/**
 * Get and decrypt a cookie value.
 * Server-side only.
 * Returns null if cookie doesn't exist or decryption fails.
 */
export function getEncryptedCookie(
  cookieStore: any,
  name: string
): string | null {
  if (typeof window !== "undefined") {
    throw new Error("getEncryptedCookie must only be called server-side");
  }

  try {
    const cookie = cookieStore.get(name);
    if (!cookie?.value) return null;
    // Encryption removed — return plain cookie value
    return cookie.value || null;
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to read ${name}:`, e);
    return null;
  }
}

/**
 * Set a plain (non-encrypted) cookie.
 * Use for non-sensitive flags like isUser.
 */
export function setPlainCookie(
  cookieStore: any,
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
): void {
  console.log(
    `[cookie:setPlainCookie] Setting plain cookie: ${name}, value length: ${
      value?.length || 0
    }`
  );
  try {
    cookieStore.set(name, decodeURIComponent(value), {
      ...SECURE_COOKIE_OPTIONS,
      httpOnly: true, // Allow client-side read for flags
      ...options,
    });
    console.log(
      `[cookie:setPlainCookie] Plain cookie ${name} set successfully`
    );
  } catch (e) {
    console.error(
      `[cookie:setPlainCookie] Failed to set plain cookie ${name}:`,
      e
    );
    throw e;
  }
}

/**
 * Delete a cookie by name.
 */
export function deleteCookie(cookieStore: any, name: string): void {
  cookieStore.delete(name);
}
