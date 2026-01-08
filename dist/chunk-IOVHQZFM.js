import {
  __require
} from "./chunk-3RG5ZIWI.js";

// src/utils/crypto.ts
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
  if (!text) return text;
  try {
    const crypto2 = __require("crypto");
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    if (!keyBase64) {
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }
    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    if (key.length !== 32) {
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }
    const iv = crypto2.randomBytes(12);
    const cipher = crypto2.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();
    const combined = Buffer.concat([iv, encrypted, authTag]);
    return combined.toString("base64");
  } catch (e) {
    console.error("[crypto:encryptSync] failed", e);
    throw e;
  }
}
function decryptSync(payload) {
  if (!payload) return payload;
  try {
    const crypto2 = __require("crypto");
    const keyBase64 = process.env.ENCRYPTION_KEY_BASE64;
    if (!keyBase64) {
      throw new Error("ENCRYPTION_KEY_BASE64 environment variable is not set");
    }
    const key = Buffer.from(normalizeBase64(keyBase64), "base64");
    if (key.length !== 32) {
      throw new Error("Encryption key must be 32 bytes (256 bits)");
    }
    const combined = Buffer.from(payload, "base64");
    const iv = combined.slice(0, 12);
    const authTag = combined.slice(-16);
    const encrypted = combined.slice(12, -16);
    const decipher = crypto2.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  } catch (e) {
    console.error("[crypto:decryptSync] failed", e);
    throw e;
  }
}
async function encrypt(text) {
  if (!text) return text;
  const key = await keyPromise;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = encoder.encode(text);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
  const buf = new Uint8Array(iv.byteLength + ct.byteLength);
  buf.set(iv, 0);
  buf.set(new Uint8Array(ct), iv.byteLength);
  let binary = "";
  buf.forEach((b) => binary += String.fromCharCode(b));
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

export {
  encryptSync,
  decryptSync,
  encrypt,
  decrypt
};
