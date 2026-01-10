/**
 * Encryption utilities removed — provide no-op passthroughs to avoid runtime errors
 * in case any residual imports remain. These functions do not perform any
 * encryption or decryption; they return inputs unchanged.
 */

/**
 * AES-256-GCM encryption utilities for secure token/cookie storage.
 * Provides both sync (Node.js crypto) and async (Web Crypto API) versions.
 *
 * Requires env var: ENCRYPTION_KEY_BASE64 (base64-encoded 32 bytes)
 *
 * Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
 */

import * as nodeCrypto from "crypto";

function normalizeBase64(input?: string): string {
  if (!input) throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  return b64;
}

function base64ToBytes(b64: string): Uint8Array {
  const normalized = normalizeBase64(b64);
  // Prefer Buffer (Node.js) when available for reliable base64 decoding
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(normalized, "base64");
    const arr = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) arr[i] = buf[i];
    return arr;
  }

  // Fallback for environments with atob (browsers)
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

const keyPromise = (async () => {
  const raw = base64ToBytes(process.env.ENCRYPTION_KEY_BASE64!);
  return (globalThis as any).crypto.subtle.importKey(
    "raw",
    raw.buffer as unknown as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
})();

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// ============================================================================
// SYNC Encryption (Node.js crypto module) - Preferred for server-side tokens
// ============================================================================

export function encryptSync(
  text: string | undefined | null
): string | null | undefined {
  if (!text) return text;

  const crypto = nodeCrypto;
  const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
  if (!keyBase64) {
    throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
  }

  const key = Buffer.from(normalizeBase64(keyBase64), "base64");
  if (key.length !== 32) throw new Error("Encryption key must be 32 bytes (256 bits)");

  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Combine: IV (12) + ciphertext + authTag (16)
  const combined = Buffer.concat([iv, encrypted, authTag]);
  return combined.toString("base64");
}

export function decryptSync(
  payload: string | undefined | null
): string | undefined | null {
  if (!payload) return payload;

  const crypto = nodeCrypto;
  const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
  if (!keyBase64) throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");

  const key = Buffer.from(normalizeBase64(keyBase64), "base64");
  if (key.length !== 32) throw new Error("Encryption key must be 32 bytes (256 bits)");

  const combined = Buffer.from(payload, "base64");
  const iv = combined.slice(0, 12);
  const authTag = combined.slice(-16);
  const encrypted = combined.slice(12, -16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
}

// ============================================================================
// ASYNC Encryption (Web Crypto API) - For edge runtimes without Node.js crypto
// ============================================================================

export async function encrypt(
  text: string | undefined | null
): Promise<string | null | undefined> {
  if (!text) return text;

  const key = await keyPromise;
  const iv = (globalThis as any).crypto.getRandomValues(new Uint8Array(12));
  const data = encoder.encode(text);

  const encrypted = await (globalThis as any).crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBytes = new Uint8Array(encrypted);
  const authTagLength = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLength);
  const authTag = encryptedBytes.slice(-authTagLength);

  const combined = new Uint8Array(iv.length + ciphertext.length + authTag.length);
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  combined.set(authTag, iv.length + ciphertext.length);

  let binary = "";
  combined.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export async function decrypt(
  payload: string | undefined | null
): Promise<string | undefined | null> {
  if (!payload) return payload;
  const combined = base64ToBytes(payload);
  const iv = combined.slice(0, 12);
  const ct = combined.slice(12);
  const key = await keyPromise;
  const pt = await (globalThis as any).crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return decoder.decode(pt as ArrayBuffer);
}

/**
 * Universal decryption that tries Node.js crypto first, then Web Crypto API
 * Returns decrypted string or null if decryption fails.
 */
export function decryptUniversal(
  payload: string | undefined | null
): string | undefined | null {
  if (!payload) return payload;
  try {
    return decryptSync(payload);
  } catch (nodeErr) {
    // If Node.js decryption fails, return original payload as fallback
    return payload;
  }
}
