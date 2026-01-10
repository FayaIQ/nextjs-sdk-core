/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 */

import { encryptSync, decryptSync, decryptUniversal } from './crypto';
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Cookie names used by the SDK
 */
export const COOKIE_NAMES = {
  /** Primary session token (encrypted when possible) */
  SESSION_ID: 'session_id',
  /** User authentication flag */
  IS_USER: "isUser",
  /** Legacy: third-party token (for migration) */
  TP_ID: 'tp_id',
  /** Legacy: crf cookie (for migration - deprecated) */
  CRF: 'crf',
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
      ...options,
    });
    console.log(`[cookie:setEncryptedCookie] Cookie ${name} set successfully`);
  } catch (e) {
    console.error(`[cookie:setEncryptedCookie] Failed to set encrypted cookie ${name}:`, e);
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

    // Try universal decrypt (handles both Node.js and Web Crypto encrypted tokens)
    try {
      const decrypted = decryptUniversal(cookie.value);
      console.log(`[cookie:getEncryptedCookie] Universal decryption successful for ${name}, decrypted length: ${decrypted?.length || 0}`);
      if (decrypted) {
        console.log(`[cookie:getEncryptedCookie] Decrypted value (first 20 chars): ${decrypted.substring(0, 20)}...`);
      }
      return decrypted ?? null;
    } catch (e) {
      console.error(`[cookie:getEncryptedCookie] Universal decryption failed for ${name}:`, e);
      throw e; // let outer catch log original error
    }
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to get/decrypt cookie ${name}:`, e);
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
  console.log(`[cookie:setPlainCookie] Setting plain cookie: ${name}, value length: ${value?.length || 0}`);
  try {
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      httpOnly: false, // Allow client-side read for flags
      ...options,
    });
    console.log(`[cookie:setPlainCookie] Plain cookie ${name} set successfully`);
  } catch (e) {
    console.error(`[cookie:setPlainCookie] Failed to set plain cookie ${name}:`, e);
    throw e;
  }
}

/**
 * Delete a cookie by name.
 */
export function deleteCookie(cookieStore: any, name: string): void {
  cookieStore.delete(name);
}
