/**
 * AES-256-GCM encryption utilities for secure cookie storage.
 * Server-side only - uses Node.js crypto module.
 * 
 * Requires env var: COOKIE_CRYPTO_KEY (base64-encoded 32 bytes)
 * 
 * Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // AES-GCM standard IV length
const AUTH_TAG_LENGTH = 16;

/**
 * Get encryption key from environment.
 * Key should be 32 bytes (256 bits) base64-encoded.
 */
function getEncryptionKey(): Buffer {
  const keyB64 = process.env.COOKIE_CRYPTO_KEY;
  if (!keyB64) {
    throw new Error(
      'COOKIE_CRYPTO_KEY environment variable not set. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"'
    );
  }

  try {
    const key = Buffer.from(keyB64, 'base64');
    if (key.length !== 32) {
      throw new Error(`COOKIE_CRYPTO_KEY must be 32 bytes, got ${key.length}`);
    }
    return key;
  } catch (e) {
    throw new Error(`Invalid COOKIE_CRYPTO_KEY: ${(e as Error).message}`);
  }
}

/**
 * Encrypt a string using AES-256-GCM.
 * Returns base64-encoded string: iv:authTag:ciphertext
 */
export function encrypt(plaintext: string): string {
  if (typeof window !== 'undefined') {
    throw new Error('encrypt() must only be called server-side');
  }

  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:ciphertext (all base64)
  const combined = Buffer.concat([iv, authTag, encrypted]);
  return combined.toString('base64');
}

/**
 * Decrypt a string encrypted with encrypt().
 * Expects base64-encoded string: iv:authTag:ciphertext
 */
export function decrypt(encryptedData: string): string {
  if (typeof window !== 'undefined') {
    throw new Error('decrypt() must only be called server-side');
  }

  const key = getEncryptionKey();
  // Normalize base64 input: support URL-safe base64 and missing padding
  const normalizeBase64 = (s: string) => {
    let t = s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    const pad = t.length % 4;
    if (pad === 2) t += '==';
    else if (pad === 3) t += '=';
    else if (pad === 1) {
      // invalid length, but still try
      t = t.slice(0, t.length - 1);
    }
    return t;
  };

  const combined = Buffer.from(normalizeBase64(encryptedData), 'base64');

  if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error('Invalid encrypted data: too short');
  }

  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

// Attempt to decrypt with tolerant strategy: some older deployments stored authTag at the end.
export function tryDecryptTolerant(encryptedData: string): string {
  try {
    return decrypt(encryptedData);
  } catch (e) {
    // Try alternate layout: [iv][ciphertext][authTag]
    try {
      const key = getEncryptionKey();
      const normalizeBase64 = (s: string) => s.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
      const combined = Buffer.from(normalizeBase64(encryptedData), 'base64');
      if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) throw e;

      const iv = combined.subarray(0, IV_LENGTH);
      const authTag = combined.subarray(combined.length - AUTH_TAG_LENGTH);
      const ciphertext = combined.subarray(IV_LENGTH, combined.length - AUTH_TAG_LENGTH);

      const decipher = createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ]);
      return decrypted.toString('utf8');
    } catch (e2) {
      // Re-throw original error for clarity
      throw e;
    }
  }
}

/**
 * Validate that encryption key is configured correctly.
 * Throws if key is missing or invalid.
 */
export function validateEncryptionKey(): void {
  getEncryptionKey();
}
