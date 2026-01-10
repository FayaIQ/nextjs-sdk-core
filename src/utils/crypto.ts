/**
 * Encryption utilities removed — provide no-op passthroughs to avoid runtime errors
 * in case any residual imports remain. These functions do not perform any
 * encryption or decryption; they return inputs unchanged.
 */

export function encryptSync(text: string | undefined | null): string | null | undefined {
  return text;
}

export function decryptSync(payload: string | undefined | null): string | undefined | null {
  return payload;
}

export async function encrypt(text: string | undefined | null): Promise<string | null | undefined> {
  return text;
}

export async function decrypt(payload: string | undefined | null): Promise<string | undefined | null> {
  return payload;
}

export function decryptUniversal(payload: string | undefined | null): string | undefined | null {
  return payload;
}
