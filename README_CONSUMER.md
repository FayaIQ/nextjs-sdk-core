# Using ERP Core SDK with Firebase Phone Login (Consumer App Guide)

This guide shows how to integrate phone-based Firebase login in your Next.js app using ERP Core SDK, and how AUTO mode keeps your ERP session refreshed automatically.

## Prerequisites

- Next.js App Router (app/ directory)
- Installed ERP Core SDK (from your repo or npm):

```bash
npm install FayaIQ/nextjs-sdk-core#prod
```

- Firebase project configured and web app credentials available

## 1) Environment Variables

Create `.env.local` in your consumer app with:

```bash
# ERP backend auth
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
# Optional (non-Firebase login fallback)
STOREAK_USERNAME=user@example.com
STOREAK_PASSWORD=supersecret

# Auth mode: auto or strict
AUTH_MODE=auto

# Firebase client config
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
# Optional
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

Tips:
- For brand-specific envs, you can set `STOREAK_BRAND=brandA` and provide prefixed variables in your server environment if needed.

## 2) Wire the login API route

Create `app/api/auth/login/route.ts`:

```ts
export { POST } from "erp-core/identity"; // exposes LoginPOST handler
```

**IMPORTANT: For persistent token cookies in AUTO mode**, also create `app/api/auth/token/route.ts`:

```ts
export { GET } from "erp-core/identity"; // exposes TokenGET handler
```

Then add to your `.env.local`:

```bash
USE_TOKEN_ROUTE=true
```

This route handler can set cookies (unlike during component rendering), ensuring your `access_token` persists across page loads.

This route accepts:
- `thirdPartyToken` (Firebase ID token) for phone login
- Optional `username`/`password` for non-Firebase login

On success, the server sets httpOnly cookies:
- `access_token` (ERP session)
- `tp_id` (third-party token) when provided, used for AUTO re-auth
- In AUTO mode, `isUser` boolean (based on roles)
- In STRICT mode, `roles`, `username`, `employee_store_id`

## 3) Client-side phone login

Add a reCAPTCHA container to a page where you’ll trigger sign-in:

```tsx
// Somewhere in your page/component JSX
<div id="recaptcha-container" />
```

Use ERP Core Firebase helpers:

```ts
'use client';
import { startPhoneSignIn, confirmPhoneCode } from 'erp-core/firebase';

export async function loginWithPhone(phoneNumber: string, smsCode: string) {
  // Step 1: Start the phone auth flow (visible reCAPTCHA)
  const confirmation = await startPhoneSignIn(phoneNumber, 'recaptcha-container');

  // Step 2: Confirm the SMS code to sign in with Firebase
  const idToken = await confirmPhoneCode(confirmation, smsCode);

  // Step 3: Send the Firebase ID token to your backend login route
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ thirdPartyToken: idToken }),
  });

  if (!res.ok) throw new Error('Backend login failed');
}
```

Notes:
- If you don’t want a visible reCAPTCHA element, omit the container ID and the SDK will use invisible mode.

## 4) AUTO vs STRICT mode

- `AUTH_MODE=auto`:
  - Minimal cookies: `access_token` and `isUser`.
  - When `access_token` expires/missing, server-side `getToken()` uses `tp_id` to re-sign automatically and refresh `access_token` for 1 hour.
- `AUTH_MODE=strict`:
  - Full cookies: `access_token`, `roles`, `username`, `employee_store_id`.
  - Strict rules for credential requirements in server login.

## 5) Using SDK functions in your app

Example: fetch brands with caching (server component):

```ts
import { getWithAuth } from 'erp-core/core';
import { Api } from 'erp-core/api';

export async function getBrandsCached() {
  return getWithAuth(Api.getBrands, undefined, undefined, {
    revalidate: 3600, // 1 hour Next.js cache
    tags: ['brands'],
  });
}
```

Example: using token implicitly (server component):

```ts
import { getWithAuth } from 'erp-core/core';
import { Api } from 'erp-core/api';

export async function getMenus() {
  return getWithAuth(Api.getMenus);
}
```

## 6) Handling session expiry gracefully

- In AUTO mode, you generally don’t need to do anything — the server refreshes ERP token automatically using `tp_id` if present.
- If the Firebase session is no longer valid (rare), call the client flow again to obtain a fresh Firebase ID token and POST it to `/api/auth/login`.

## 7) Troubleshooting

- If you get `Module not found: erp-core/firebase`:
  - Ensure your consumer app reinstalled the latest SDK:
    ```bash
    npm uninstall erp-core
    npm install FayaIQ/nextjs-sdk-core#prod
    ```
- **If tokens are not persisting across page loads (keeps re-fetching)**:
  - Make sure you created `app/api/auth/token/route.ts` (see step 2)
  - Add `USE_TOKEN_ROUTE=true` to your `.env.local`
  - This route handler can set httpOnly cookies properly
- If builds fail during install (heap OOM), try:
  ```bash
  NODE_OPTIONS="--max-old-space-size=4096" npm install
  ```
- Ensure your Firebase site domain is authorized in the Firebase console (Authentication > Settings > Authorized domains).
- reCAPTCHA not rendering? Make sure the container id exists or use invisible mode.

## 8) Optional: Sign out

```ts
import { signOutFirebase } from 'erp-core/firebase';

export async function signOutAll() {
  await signOutFirebase();
  // Optionally call your app’s logout route
  await fetch('/api/auth/logout', { method: 'POST' });
}
```

## 9) Security considerations

- Tokens are stored as httpOnly cookies on the server. Client code does not see the raw ERP token.
- The third-party token cookie name is obfuscated as `tp_id` and is also httpOnly.
- For stricter validation, you can add a server-side Firebase Admin token verify step in your app.

## 10) Verify it works

- Run your Next.js app, trigger phone login, check subsequent server requests succeed without manual token management.
- Inspect response cookies in your browser’s dev tools (though httpOnly cookies won’t be visible to JS).

That’s it — you’re set up with phone auth + automatic ERP session refresh!
