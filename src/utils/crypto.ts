/**
 * Encryption removed: provide no-op passthroughs so any remaining imports
 * succeed but do not perform encryption or decryption.
 */

export function encryptSync(text: string | undefined | null): string | null | undefined {
  return text;
}

export function decryptSync(payload: string | undefined | null): string | null | undefined {
  return payload;
}

export async function encrypt(text: string | undefined | null): Promise<string | null | undefined> {
  return text;
}

export async function decrypt(payload: string | undefined | null): Promise<string | null | undefined> {
  return payload;
}

export function decryptUniversal(payload: string | undefined | null): string | null | undefined {
  return payload;
}
