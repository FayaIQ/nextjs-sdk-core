/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 */

import { encryptSync, decryptSync } from './crypto';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

/**
 * Cookie names used by the SDK
 */
export const COOKIE_NAMES = {
  /** Primary session token (encrypted when possible) */
  SESSION_ID: 'session_id',
  /** User authentication flag */
  IS_USER: 'isUser',
  /** Legacy: third-party token (for migration) */
  TP_ID: 'tp_id',
  /** Legacy: crf cookie (for migration - deprecated) */
  CRF: 'crf',
  /** Legacy: access token (for migration - deprecated) */
  ACCESS_TOKEN: 'access_token',
} as const;

/**
 * Default cookie options for secure httpOnly cookies
 */
export const SECURE_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
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
  if (typeof window !== 'undefined') {
    throw new Error('setEncryptedCookie must only be called server-side');
  }

  const encrypted = encryptSync(value);
  cookieStore.set(name, encrypted, {
    ...SECURE_COOKIE_OPTIONS,
    ...options,
  });
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
  if (typeof window !== 'undefined') {
    throw new Error('getEncryptedCookie must only be called server-side');
  }

  try {
    const cookie = cookieStore.get(name);
    if (!cookie?.value) return null;
    // Try strict decrypt first; fall back to tolerant decrypt for older cookies
    try {
      const decrypted = decryptSync(cookie.value);
      return decrypted ?? null;
    } catch (e) {
      throw e; // let outer catch log original error
    }
  } catch (e) {
    console.error(`[cookie] Failed to decrypt ${name}:`, e);
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
  cookieStore.set(name, value, {
    ...SECURE_COOKIE_OPTIONS,
    httpOnly: false, // Allow client-side read for flags
    ...options,
  });
}

/**
 * Delete a cookie by name.
 */
export function deleteCookie(cookieStore: any, name: string): void {
  cookieStore.delete(name);
}
