# Firebase Phone Auth Integration (ERP Core SDK)

This guide explains how to use Firebase Phone Authentication with the ERP Core SDK to create a backend session using a Firebase ID token. It also shows how AUTO mode re-authenticates using the Firebase token when the backend session expires.

## What you get

- Client-side helpers to perform phone auth via Firebase
- Backend login that accepts `thirdPartyToken` (Firebase ID token)
- Server-side token cache: `access_token` (ERP backend) and obfuscated third-party token (`tp_id`) for AUTO re-auth
- AUTO mode: reuses Firebase ID token to regenerate backend session if `access_token` is missing

## Modules

- `erp-core/firebase`
  - `getFirebaseApp()` — initializes Firebase app (client-only)
  - `startPhoneSignIn(phoneNumber, recaptchaContainerId?)` — starts phone auth
  - `confirmPhoneCode(confirmation, code)` — confirms SMS code, returns Firebase ID token
  - `getFirebaseIdToken(forceRefresh?)` — returns current user's Firebase ID token
  - `signOutFirebase()` — signs out from Firebase
- `erp-core/identity`
  - `loginUser({ thirdPartyToken?, username?, password? })` — logs in to ERP; sets cookies
  - `LoginPOST` — Next.js route handler for `/api/auth/login`
- `erp-core/token`
  - `getToken()` — obtains ERP access token; AUTO uses `firebase_id_token` when needed

## Environment Variables

Firebase (client):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Optional: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- Optional: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- Optional: `NEXT_PUBLIC_FIREBASE_APP_ID`
- Optional: `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

ERP backend (server):

- `STOREAK_CLIENT_ID`
- `STOREAK_CLIENT_SECRET`
- Optional: `STOREAK_USERNAME`, `STOREAK_PASSWORD` (non-Firebase login)
- Optional: `STOREAK_THIRD_PARTY_TOKEN` (fallback)

Brand-aware support is enabled via `STOREAK_BRAND` or `BRAND`.

## AUTH_MODE

- `AUTH_MODE=auto` — Minimal cookies; only `access_token` and `isUser` (based on roles). If `access_token` expires/missing, server tries `tp_id` (third-party token) to re-login.
- `AUTH_MODE=strict` — Full cookies: `access_token`, `roles`, `username`, `employee_store_id`.

## Client Usage

```ts
import { startPhoneSignIn, confirmPhoneCode } from "erp-core/firebase";

async function loginWithPhone(phoneNumber: string, smsCode: string) {
  // Make sure an element with this id exists in your DOM if you want visible reCAPTCHA
  // <div id="recaptcha-container"></div>
  const confirmation = await startPhoneSignIn(phoneNumber, "recaptcha-container");
  const idToken = await confirmPhoneCode(confirmation, smsCode);

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ thirdPartyToken: idToken }),
  });
  if (!res.ok) throw new Error("Backend login failed");
}
```

## Server Behavior

- `loginUser()` (server-side):
  - Accepts `thirdPartyToken` (Firebase ID token)
  - Sets cookies:
    - `access_token` (ERP session) — httpOnly, 1 hour
  - `tp_id` — httpOnly, 1 hour (if provided)
    - `isUser` in AUTO mode (based on roles)
    - `roles`, `username`, `employee_store_id` in STRICT mode

- `getToken()` (server-side):
  - Returns `access_token` from cookie when present
  - If missing and `AUTH_MODE=auto`, reads `tp_id` and re-signs using `ThirdPartyToken`, then caches `access_token` for 1 hour

## Optional: Cache revalidation

The SDK supports Next.js fetch revalidation via `getWithAuth` and `getWithoutAuth`:

```ts
import { getWithAuth } from "erp-core/core";
import { Api } from "erp-core/api";

// Example: cache brands for 1 hour and tag as "brands"
const brands = await getWithAuth(Api.getBrands, undefined, undefined, {
  revalidate: 3600,
  tags: ["brands"],
});
```

## Security Notes

- `firebase_id_token` is stored as httpOnly to ensure server-only usage for AUTO re-auth.
- Consider verifying Firebase ID tokens server-side using Firebase Admin SDK in your own app if you require stronger guarantees.

## Troubleshooting

- If you see `Module not found: erp-core/firebase`, ensure you updated to the latest SDK and reinstalled.
- If builds fail with memory errors, run with `NODE_OPTIONS="--max-old-space-size=4096"`.
- If phone auth reCAPTCHA fails to render, ensure the container id exists or use invisible mode by omitting the id.

## Example Route Wiring

In your Next.js app:

```ts
// app/api/auth/login/route.ts
export { POST } from "erp-core/identity"; // re-exports LoginPOST
```

## License

MIT
