// src/utils/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
var ALGORITHM = "aes-256-gcm";
var IV_LENGTH = 16;
var AUTH_TAG_LENGTH = 16;
function getEncryptionKey() {
  const keyB64 = process.env.COOKIE_CRYPTO_KEY;
  if (!keyB64) {
    throw new Error(
      `COOKIE_CRYPTO_KEY environment variable not set. Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
    );
  }
  try {
    const key = Buffer.from(keyB64, "base64");
    if (key.length !== 32) {
      throw new Error(`COOKIE_CRYPTO_KEY must be 32 bytes, got ${key.length}`);
    }
    return key;
  } catch (e) {
    throw new Error(`Invalid COOKIE_CRYPTO_KEY: ${e.message}`);
  }
}
function encrypt(plaintext) {
  if (typeof window !== "undefined") {
    throw new Error("encrypt() must only be called server-side");
  }
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final()
  ]);
  const authTag = cipher.getAuthTag();
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString("base64");
}
function decrypt(encryptedData) {
  if (typeof window !== "undefined") {
    throw new Error("decrypt() must only be called server-side");
  }
  const key = getEncryptionKey();
  const combined = Buffer.from(encryptedData, "base64");
  if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error("Invalid encrypted data: too short");
  }
  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}
function validateEncryptionKey() {
  getEncryptionKey();
}

export {
  encrypt,
  decrypt,
  validateEncryptionKey
};
