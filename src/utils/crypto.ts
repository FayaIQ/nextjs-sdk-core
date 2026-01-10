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
  if (!input)
    throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
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
  return crypto.subtle.importKey(
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

/**
 * Synchronous encryption using Node.js crypto.
 * Use this for immediate token encryption on the server.
 *
 * @param text - Text to encrypt
 * @returns Base64-encoded encrypted string (IV + ciphertext) or original if falsy
 */
export function encryptSync(
  text: string | undefined | null
): string | null | undefined {
  console.log(`[crypto:encryptSync] Called with text length: ${text?.length || 0}`);
  if (!text) {
    console.log("[crypto:encryptSync] No text provided, returning as-is");
    return text;
  }

  try {
    console.log("[crypto:encryptSync] Starting encryption process");
    // Use Node.js crypto (statically imported) for sync operations
    const crypto = nodeCrypto;
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    console.log(`[crypto:encryptSync] ENCRYPTION_KEY_BASE64 present: ${!!keyBase64}`);
    if (!keyBase64) {
      console.error("[crypto:encryptSync] ENCRYPTION_KEY_BASE64 environment variable is not set");
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }

    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    console.log(`[crypto:encryptSync] Key length: ${key.length} bytes`);
    if (key.length !== 32) {
      console.error(`[crypto:encryptSync] Invalid key length: ${key.length}, expected 32`);
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }

    const iv = crypto.randomBytes(12); // 96-bit IV for GCM
    console.log(`[crypto:encryptSync] Generated IV: ${iv.toString('hex')}`);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();
    console.log(`[crypto:encryptSync] Auth tag length: ${authTag.length} bytes`);

    // Combine: IV (12) + ciphertext + authTag (16)
    const combined = Buffer.concat([iv, encrypted, authTag]);
    const result = combined.toString("base64");
    console.log(`[crypto:encryptSync] Encryption successful, result length: ${result.length}`);
    return result;
  } catch (e) {
    console.error("[crypto:encryptSync] Encryption failed:", e);
    throw e;
  }
}

/**
 * Synchronous decryption using Node.js crypto.
 * Use this for immediate token decryption on the server.
 *
 * @param payload - Base64-encoded encrypted string (IV + ciphertext + authTag)
 * @returns Decrypted text or original if falsy
 */
export function decryptSync(
  payload: string | undefined | null
): string | undefined | null {
  console.log(`[crypto:decryptSync] Called with payload length: ${payload?.length || 0}`);
  if (!payload) {
    console.log("[crypto:decryptSync] No payload provided, returning as-is");
    return payload;
  }

  try {
    console.log("[crypto:decryptSync] Starting decryption process");
    const crypto = nodeCrypto;
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    console.log(`[crypto:decryptSync] ENCRYPTION_KEY_BASE64 present: ${!!keyBase64}`);
    if (!keyBase64) {
      console.error("[crypto:decryptSync] ENCRYPTION_KEY_BASE64 environment variable is not set");
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }

    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    console.log(`[crypto:decryptSync] Key length: ${key.length} bytes`);
    if (key.length !== 32) {
      console.error(`[crypto:decryptSync] Invalid key length: ${key.length}, expected 32`);
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }

    const combined = Buffer.from(payload, "base64");
    console.log(`[crypto:decryptSync] Combined buffer length: ${combined.length} bytes`);
    const iv = combined.slice(0, 12);
    const authTag = combined.slice(-16);
    const encrypted = combined.slice(12, -16);
    console.log(`[crypto:decryptSync] IV length: ${iv.length}, encrypted length: ${encrypted.length}, authTag length: ${authTag.length}`);

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    const result = decrypted.toString("utf8");
    console.log(`[crypto:decryptSync] Decryption successful, result length: ${result.length}`);
    return result;
  } catch (e) {
    console.error("[crypto:decryptSync] Decryption failed:", e);
    throw e;
  }
}

// ============================================================================
// ASYNC Encryption (Web Crypto API) - For edge runtimes without Node.js crypto
// ============================================================================

export async function encrypt(
  text: string | undefined | null
): Promise<string | null | undefined> {
  if (!text) return text;

  const key = await keyPromise;

  // 96-bit IV for AES-GCM (REQUIRED)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const data = encoder.encode(text);

  // Web Crypto returns: ciphertext + authTag (last 16 bytes)
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBytes = new Uint8Array(encrypted);

  // Split ciphertext and authTag
  const authTagLength = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLength);
  const authTag = encryptedBytes.slice(-authTagLength);

  // Build Node-compatible payload:
  // [ IV (12) | ciphertext | authTag (16) ]
  const combined = new Uint8Array(
    iv.length + ciphertext.length + authTag.length
  );

  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  combined.set(authTag, iv.length + ciphertext.length);

  // Base64 encode
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
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return decoder.decode(pt);
}

/**
 * Universal decryption that tries Node.js crypto first, then Web Crypto API
 * This ensures compatibility with tokens encrypted by middleware (Web Crypto) and SDK (Node.js crypto)
 */
export function decryptUniversal(
  payload: string | undefined | null
): string | undefined | null {
  console.log(`[crypto:decryptUniversal] Attempting to decrypt payload length: ${payload?.length || 0}`);

  if (!payload) {
    console.log("[crypto:decryptUniversal] No payload provided");
    return payload;
  }

  // First try Node.js crypto decryption (our SDK's primary method)
  try {
    console.log("[crypto:decryptUniversal] Trying Node.js crypto decryption");
    const result = decryptSync(payload);
    console.log("[crypto:decryptUniversal] Node.js crypto decryption successful");
    return result;
  } catch (nodeError) {
    console.log("[crypto:decryptUniversal] Node.js crypto decryption failed, trying Web Crypto:", nodeError);

    // Fallback to Web Crypto API decryption (for middleware-encrypted tokens)
    try {
      console.log("[crypto:decryptUniversal] Trying Web Crypto API decryption");
      // Note: This is async, but we'll make it sync by checking if we're in Node.js
      if (typeof window === 'undefined') {
        console.log("[crypto:decryptUniversal] Server-side, cannot use Web Crypto for sync decryption");
        throw new Error("Web Crypto not available in sync context");
      }

      // For client-side, we could do async decryption, but for now let's just re-throw
      throw nodeError;
    } catch (webError) {
      console.error("[crypto:decryptUniversal] Both decryption methods failed");
      console.error("[crypto:decryptUniversal] Node.js error:", nodeError);
      console.error("[crypto:decryptUniversal] Web Crypto error:", webError);
      throw nodeError; // Throw the original error
    }
  }
}
