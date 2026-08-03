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
  /** Opaque browser identity. This is never an ERP access token. */
  ERP_BROWSER_ID: "erp_browser_id",
  /** Legacy ERP-token cookie. Read only for cleanup; never use as authentication. */
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
  maxAge: 60 * 60 * 24 * 365,
};

/**
 * Set an encrypted cookie value.
 * Server-side only. If an encryption key is provided via
 * `SESSION_ENCRYPTION_KEY` or `ENCRYPTION_KEY` env var, the value will be encrypted
 * using AES-256-GCM. Sensitive values are never written when encryption is
 * unavailable; a plaintext fallback turns a server-only secret into an XSS
 * credential.
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
  if (!secret) {
    throw new Error(`Cannot set sensitive cookie ${name}: cookie encryption key is missing`);
  }

  const toStore = await encryptForCookie(secret, value);

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

    if (!secret) {
      return null;
    }

    if (secret) {
      try {
        const decrypted = await decryptForCookie(cookie.value, secret);
        return decrypted || null;
      } catch (e) {
        // An undecryptable value is not a valid credential.
        try {
          const len = cookie.value?.length || 0;
          const prefix = String(cookie.value || "").slice(0, 8);
          // eslint-disable-next-line no-console
          console.warn(
            `[cookie] decryption failed for ${name}; blobLen=${len}, prefix=${prefix}...`,
            (e as any)?.message || e,
          );
        } catch { }
        return null;
      }
    }
    return cookie.value || null;
  } catch (e) {
    console.error(`[cookie:getEncryptedCookie] Failed to read ${name}:`, e);
    return null;
  }
}

function secureRandomId(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Resolve an opaque, HttpOnly browser identity. It deliberately contains no
 * ERP token material and is safe to share across tabs through the cookie jar.
 */
export function ensureErpBrowserId(cookieStore: any, maxAge: number): string {
  const existing = cookieStore.get(COOKIE_NAMES.ERP_BROWSER_ID)?.value;
  if (existing && /^[a-f0-9]{64}$/.test(existing)) return existing;
  const browserId = secureRandomId();
  cookieStore.set(COOKIE_NAMES.ERP_BROWSER_ID, browserId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return browserId;
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
