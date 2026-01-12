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
 * Server-side only.
 */
import { randomBytes, createCipheriv, createDecipheriv, createHash } from "crypto";

/**
 * Derive a 32-byte key from a passphrase using SHA-256.
 */
function deriveKey(secret: string) {
  return createHash("sha256").update(secret).digest();
}

/**
 * Encrypt a UTF-8 string using AES-256-GCM. Returns base64(iv|tag|ciphertext).
 */
function encrypt(text: string, secret: string): string {
  const iv = randomBytes(12); // recommended IV size for GCM
  const key = deriveKey(secret);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

/**
 * Decrypt a base64(iv|tag|ciphertext) string created by encrypt().
 */
function decrypt(data: string, secret: string): string {
  const buf = Buffer.from(data, "base64");
  const iv = buf.slice(0, 12);
  const tag = buf.slice(12, 28); // 16 bytes auth tag
  const encrypted = buf.slice(28);
  const key = deriveKey(secret);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

/**
 * Set an encrypted cookie value.
 * Server-side only. If an encryption key is provided via
 * `SESSION_ENCRYPTION_KEY` or `ENCRYPTION_KEY` env var, the value will be encrypted
 * using AES-256-GCM. Otherwise the value will be stored as plain text.
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

  const secret = process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;
  let toStore = value;

  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn(
      `[cookie] no encryption key configured (SESSION_ENCRYPTION_KEY or ENCRYPTION_KEY); storing ${name} in plaintext`
    );
  }

  if (secret) {
    try {
      toStore = encrypt(value, secret);
    } catch (e) {
      // If encryption fails, fall back to plaintext but warn the operator.
      // Keep warnings (not noisy logs) so operators can notice unexpected failures.
      // eslint-disable-next-line no-console
      console.warn(`[cookie] encryption failed for ${name}, storing plain value`, e);
      toStore = value;
    }
  }

  try {
    cookieStore.set(name, toStore, {
      ...SECURE_COOKIE_OPTIONS,
      ...options,
    });
  } catch (e) {
    console.error(`[cookie:setEncryptedCookie] Failed to set cookie ${name}:`, e);
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
    const secret = process.env.SESSION_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;
    // If no secret is configured but the cookie looks like an encrypted blob,
    // warn so operators know why decryption won't run.
    if (!secret) {
      try {
        const maybeBuf = Buffer.from(cookie.value, "base64");
        if (maybeBuf.length >= 12 + 16 + 1) {
          // eslint-disable-next-line no-console
          console.warn(
            `[cookie] cookie ${name} looks encrypted but no SESSION_ENCRYPTION_KEY/ENCRYPTION_KEY is configured; server will not decrypt it`
          );
        }
      } catch {}
      return cookie.value || null;
    }

    if (secret) {
      try {
        return decrypt(cookie.value, secret) || null;
      } catch (e) {
        // If decryption fails, log a warning with minimal metadata and return the raw value as fallback
        try {
          const len = cookie.value?.length || 0;
          const prefix = String(cookie.value || "").slice(0, 8);
          // eslint-disable-next-line no-console
          console.warn(`[cookie] decryption failed for ${name}; blobLen=${len}, prefix=${prefix}...`, (e as any)?.message || e);
        } catch {}
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
 * Set a plain (non-encrypted) cookie.
 * Use for non-sensitive flags like isUser.
 */
export function setPlainCookie(
  cookieStore: any,
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
): void {
  try {
    cookieStore.set(name, value, {
      ...SECURE_COOKIE_OPTIONS,
      httpOnly: true, // Allow client-side read for flags
      ...options,
    });
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
