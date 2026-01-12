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

// Edge runtime (middleware) — AES-256-GCM, produces base64(iv || tag || ciphertext)
// Compatible with Node decrypt that expects base64(iv|tag|ciphertext).
export async function encryptForCookie(secret: string, plain: string): Promise<string> {
  const enc = new TextEncoder();

  // 1) derive 32-byte key (SHA-256 of secret)
  // Warn when secret is empty — middleware may still produce an encrypted blob
  // but the server will not attempt to decrypt if no key is configured.
  try {
    // eslint-disable-next-line no-console
    if (!secret) console.warn('[crypto:encryptForCookie] no secret provided; middleware will encrypt with empty key — ensure server has the same key configured');
  } catch {}
  const secretBytes = enc.encode(secret);
  const hash = await crypto.subtle.digest("SHA-256", secretBytes); // ArrayBuffer(32)
  const key = await crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // 2) generate 12-byte IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 3) encrypt (Web Crypto returns ciphertext||tag)
  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plain)
  );
  const cipherArr = new Uint8Array(cipherBuf); // ciphertext + tag (tag is last 16 bytes)
  const tag = cipherArr.slice(-16);
  const ciphertext = cipherArr.slice(0, cipherArr.length - 16);

  // 4) assemble iv || tag || ciphertext to match Node format
  const out = new Uint8Array(iv.length + tag.length + ciphertext.length);
  out.set(iv, 0);
  out.set(tag, iv.length);
  out.set(ciphertext, iv.length + tag.length);

  // 5) base64 encode
  // safe base64 helper for Uint8Array
  let binary = "";
  for (let i = 0; i < out.length; i += 0x8000) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(out.subarray(i, i + 0x8000))
    );
  }
  return btoa(binary);
}