/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 * Uses Edge Runtime compatible Web Crypto API.
 */

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { encryptForCookie, decryptForCookie } from "./crypto";

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
 * `secure` should only be true in production environments where HTTPS is used.
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
 * Server-side only. If an encryption key is provided via
 * `SESSION_ENCRYPTION_KEY` or `ENCRYPTION_KEY` env var, the value will be encrypted
 * using AES-256-GCM. Otherwise the value will be stored as plain text.
 */
export async function setEncryptedCookie(
  cookieStore: any,
  name: string,
  value: string,
  options?: Partial<ResponseCookie>,
): Promise<void> {
  if (typeof window !== "undefined") {
    throw new Error("setEncryptedCookie must only be called server-side");
  }

  const secret =
    process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || process.env.COOKIE_CRYPTO_KEY;
  let toStore = value;

  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn(
      `[cookie] no encryption key configured (SESSION_ENCRYPTION_KEY or ENCRYPTION_KEY); storing ${name} in plaintext`,
    );
  } else {
    try {
      toStore = await encryptForCookie(secret, value);
    } catch (e) {
      // If encryption fails, fall back to plaintext but warn the operator.
      // eslint-disable-next-line no-console
      console.warn(
        `[cookie] encryption failed for ${name}, storing plain value`,
        e,
      );
      toStore = value;
    }
  }

  try {
    cookieStore.set(name, toStore, {
      ...SECURE_COOKIE_OPTIONS,
      ...options,
    });
  } catch (e) {
    console.error(
      `[cookie:setEncryptedCookie] Failed to set cookie ${name}:`,
      e,
    );
    throw e;
  }
}

/**
 * Get and decrypt a cookie value.
 * Server-side only.
 * Returns null if cookie doesn't exist or decryption fails.
 */
export async function getEncryptedCookie(
  cookieStore: any,
  name: string,
): Promise<string | null> {
  if (typeof window !== "undefined") {
    throw new Error("getEncryptedCookie must only be called server-side");
  }

  try {
    const cookie = cookieStore.get(name);
    if (!cookie?.value) return null;

    const secret =
      process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || process.env.COOKIE_CRYPTO_KEY;

    // If no secret is configured but the cookie looks like an encrypted blob, warn
    if (!secret) {
      try {
        const maybeBuf = Buffer.from(cookie.value, "base64");
        if (maybeBuf.length >= 12 + 16 + 1) {
          // eslint-disable-next-line no-console
          console.warn(
            `[cookie] cookie ${name} looks encrypted but no SESSION_ENCRYPTION_KEY/ENCRYPTION_KEY is configured; server will not decrypt it`,
          );
        }
      } catch { }
      return cookie.value || null;
    }

    if (secret) {
      try {
        const decrypted = await decryptForCookie(cookie.value, secret);
        return decrypted || null;
      } catch (e) {
        // If decryption fails, log a warning and return the raw value as fallback
        try {
          const len = cookie.value?.length || 0;
          const prefix = String(cookie.value || "").slice(0, 8);
          // eslint-disable-next-line no-console
          console.warn(
            `[cookie] decryption failed for ${name}; blobLen=${len}, prefix=${prefix}...`,
            (e as any)?.message || e,
          );
        } catch { }
        return cookie.value || null;
      }
    }
    return cookie.value || null;
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to read ${name}:`, e);
    return null;
  }
}

/**
 * Try to decrypt an arbitrary string that may be an encrypted cookie blob.
 * Returns the decrypted string on success, or null on failure / if no key.
 * Safe for server-side and Edge Runtime use.
 */
export async function tryDecryptString(value: string): Promise<string | null> {
  if (typeof window !== "undefined") {
    throw new Error("tryDecryptString must only be called server-side");
  }

  const secret =
    process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || process.env.COOKIE_CRYPTO_KEY;

  if (!secret) {
    // Basic heuristic to check if it looks like encrypted data
    try {
      if (value.length > 40) {
        // minimum length for IV+Tag+some data
        // eslint-disable-next-line no-console
        console.warn(
          `[cookie] tryDecryptString: value looks encrypted but no SESSION_ENCRYPTION_KEY/ENCRYPTION_KEY is configured; cannot decrypt`,
        );
      }
    } catch { }
    return null;
  }

  try {
    return await decryptForCookie(value, secret);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      "[cookie] tryDecryptString decryption failed",
      (e as any)?.message || e,
    );
    return null;
  }
}

/**
 * Try to encrypt an arbitrary string using the configured secret.
 * Returns the encrypted blob (base64 iv|tag|ciphertext) on success, or null
 * if no key is configured or encryption fails.
 * Server-side and Edge Runtime compatible.
 */
export async function tryEncryptString(value: string): Promise<string | null> {
  if (typeof window !== "undefined") {
    throw new Error("tryEncryptString must only be called server-side");
  }

  const secret =
    process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || process.env.COOKIE_CRYPTO_KEY;

  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn(
      "[cookie] tryEncryptString: no encryption key configured; cannot encrypt",
    );
    return null;
  }

  try {
    return await encryptForCookie(secret, value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      "[cookie] tryEncryptString: encryption failed",
      (e as any)?.message || e,
    );
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
  options?: Partial<ResponseCookie>,
): void {
  try {
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      httpOnly: false, // Allow client-side read for flags
      ...options,
    });
  } catch (e) {
    console.error(
      `[cookie:setPlainCookie] Failed to set plain cookie ${name}:`,
      e,
    );
    throw e;
  }
}
