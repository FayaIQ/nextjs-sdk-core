/**
 * @fileoverview Edge Runtime compatible crypto utilities
 * @description Provides encryption and decryption compatible with Web Crypto API used in Edge Runtime (middleware).
 * Format: IV(12 bytes) + TAG(16 bytes) + CIPHERTEXT, base64 encoded.
 */

export function encryptSync(
  text: string | undefined | null,
): string | null | undefined {
  return text;
}

export function decryptSync(
  payload: string | undefined | null,
): string | null | undefined {
  return payload;
}

export async function encrypt(
  text: string | undefined | null,
): Promise<string | null | undefined> {
  return text;
}

export async function decrypt(
  payload: string | undefined | null,
): Promise<string | null | undefined> {
  return payload;
}

export function decryptUniversal(
  payload: string | undefined | null,
): string | null | undefined {
  return payload;
}

/**
 * Encrypts a string using AES-256-GCM, compatible with Edge Runtime.
 * Works in both Node.js and Edge Runtime environments.
 * Format: base64(IV(12 bytes) + TAG(16 bytes) + CIPHERTEXT)
 *
 * @param secret The encryption secret (will be hashed with SHA-256)
 * @param plain The plain text to encrypt
 * @returns Base64 encoded encrypted string
 */
export async function encryptForCookie(
  secret: string,
  plain: string,
): Promise<string> {
  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn(
      "[crypto:encryptForCookie] no secret provided; encryption requires a secret",
    );
    throw new Error("Encryption secret is required");
  }

  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Derive 32-byte key using SHA-256
  const keyHash = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
  const key = await crypto.subtle.importKey("raw", keyHash, "AES-GCM", false, [
    "encrypt",
  ]);

  // Encrypt using AES-256-GCM
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(plain),
  );

  // Extract tag (last 16 bytes) and ciphertext from encrypted result
  const encryptedArray = new Uint8Array(encrypted);
  const tag = encryptedArray.slice(-16);
  const ciphertext = encryptedArray.slice(0, -16);

  // Assemble: IV(12) + TAG(16) + CIPHERTEXT
  const result = new Uint8Array(iv.length + tag.length + ciphertext.length);
  result.set(iv);
  result.set(tag, iv.length);
  result.set(ciphertext, iv.length + tag.length);

  // Base64 encode
  return btoa(String.fromCharCode(...result));
}

/**
 * Decrypts a base64 encoded AES-256-GCM encrypted string.
 * Compatible with encryptForCookie output format: IV(12 bytes) + TAG(16 bytes) + CIPHERTEXT
 *
 * @param value Base64 encoded encrypted string
 * @param secret The encryption secret (same as used in encryptForCookie)
 * @returns Decrypted string or null if decryption fails
 */
export async function decryptForCookie(
  value: string,
  secret: string,
): Promise<string | null> {
  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn(
      "[crypto:decryptForCookie] no secret provided; cannot decrypt",
    );
    return null;
  }

  try {
    // 1. Decode base64 to bytes
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    if (bytes.length < 28) {
      // Minimum: 12 (IV) + 16 (TAG) + at least 0 bytes ciphertext
      return null;
    }

    // 2. Extract components: IV(12) + TAG(16) + CIPHERTEXT
    const iv = bytes.slice(0, 12);
    const tag = bytes.slice(12, 28);
    const ciphertext = bytes.slice(28);

    // 3. Derive key using SHA-256
    const encoder = new TextEncoder();
    const keyHash = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(secret),
    );
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyHash,
      "AES-GCM",
      false,
      ["decrypt"],
    );

    // 4. Decrypt using Web Crypto
    // crypto.subtle.decrypt expects: ciphertext + auth tag appended
    const dataWithTag = new Uint8Array(ciphertext.length + tag.length);
    dataWithTag.set(ciphertext);
    dataWithTag.set(tag, ciphertext.length);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128, // 16 bytes = 128 bits
      },
      cryptoKey,
      dataWithTag,
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      "[crypto:decryptForCookie] decryption failed:",
      (e as any)?.message || e,
    );
    return null;
  }
}
