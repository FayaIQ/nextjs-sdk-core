// src/utils/crypto.ts
import * as nodeCrypto from "crypto";
function normalizeBase64(input) {
  if (!input)
    throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) {
    b64 += "=";
  }
  return b64;
}
function base64ToBytes(b64) {
  const normalized = normalizeBase64(b64);
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(normalized, "base64");
    const arr = new Uint8Array(buf.length);
    for (let i = 0; i < buf.length; i++) arr[i] = buf[i];
    return arr;
  }
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
var keyPromise = (async () => {
  const raw = base64ToBytes(process.env.ENCRYPTION_KEY_BASE64);
  return crypto.subtle.importKey(
    "raw",
    raw.buffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
})();
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function encryptSync(text) {
  console.log(`[crypto:encryptSync] Called with text length: ${text?.length || 0}`);
  if (!text) {
    console.log("[crypto:encryptSync] No text provided, returning as-is");
    return text;
  }
  try {
    console.log("[crypto:encryptSync] Starting encryption process");
    const crypto2 = nodeCrypto;
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
    const iv = crypto2.randomBytes(12);
    console.log(`[crypto:encryptSync] Generated IV: ${iv.toString("hex")}`);
    const cipher = crypto2.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();
    console.log(`[crypto:encryptSync] Auth tag length: ${authTag.length} bytes`);
    const combined = Buffer.concat([iv, encrypted, authTag]);
    const result = combined.toString("base64");
    console.log(`[crypto:encryptSync] Encryption successful, result length: ${result.length}`);
    return result;
  } catch (e) {
    console.error("[crypto:encryptSync] Encryption failed:", e);
    throw e;
  }
}
function decryptSync(payload) {
  console.log(`[crypto:decryptSync] Called with payload length: ${payload?.length || 0}`);
  if (!payload) {
    console.log("[crypto:decryptSync] No payload provided, returning as-is");
    return payload;
  }
  try {
    console.log("[crypto:decryptSync] Starting decryption process");
    const crypto2 = nodeCrypto;
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
    const decipher = crypto2.createDecipheriv("aes-256-gcm", key, iv);
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
async function encrypt(text) {
  if (!text) return text;
  const key = await keyPromise;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = encoder.encode(text);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  const encryptedBytes = new Uint8Array(encrypted);
  const authTagLength = 16;
  const ciphertext = encryptedBytes.slice(0, -authTagLength);
  const authTag = encryptedBytes.slice(-authTagLength);
  const combined = new Uint8Array(
    iv.length + ciphertext.length + authTag.length
  );
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  combined.set(authTag, iv.length + ciphertext.length);
  let binary = "";
  combined.forEach((b) => binary += String.fromCharCode(b));
  return btoa(binary);
}
async function decrypt(payload) {
  if (!payload) return payload;
  const combined = base64ToBytes(payload);
  const iv = combined.slice(0, 12);
  const ct = combined.slice(12);
  const key = await keyPromise;
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return decoder.decode(pt);
}
function decryptUniversal(payload) {
  console.log(`[crypto:decryptUniversal] Attempting to decrypt payload length: ${payload?.length || 0}`);
  if (!payload) {
    console.log("[crypto:decryptUniversal] No payload provided");
    return payload;
  }
  try {
    console.log("[crypto:decryptUniversal] Trying Node.js crypto decryption");
    const result = decryptSync(payload);
    console.log("[crypto:decryptUniversal] Node.js crypto decryption successful");
    return result;
  } catch (nodeError) {
    console.log("[crypto:decryptUniversal] Node.js crypto decryption failed, trying Web Crypto:", nodeError);
    try {
      console.log("[crypto:decryptUniversal] Trying Web Crypto API decryption");
      if (typeof window === "undefined") {
        console.log("[crypto:decryptUniversal] Server-side, cannot use Web Crypto for sync decryption");
        throw new Error("Web Crypto not available in sync context");
      }
      throw nodeError;
    } catch (webError) {
      console.error("[crypto:decryptUniversal] Both decryption methods failed");
      console.error("[crypto:decryptUniversal] Node.js error:", nodeError);
      console.error("[crypto:decryptUniversal] Web Crypto error:", webError);
      throw nodeError;
    }
  }
}

export {
  encryptSync,
  decryptSync,
  encrypt,
  decrypt,
  decryptUniversal
};
