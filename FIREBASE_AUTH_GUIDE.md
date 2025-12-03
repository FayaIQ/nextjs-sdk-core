# Firebase Phone Authentication with Custom Tokens

Complete guide for implementing secure phone authentication using dual Firebase projects, Cloud Functions, and encrypted token storage.

## Architecture Overview

### Dual Firebase Setup

This SDK uses **two Firebase projects** for enhanced security:

1. **Primary Project**: Authentication via custom tokens (`signInWithCustomToken`)
2. **Secondary Project**: Cloud Functions for OTP verification

### Authentication Flow

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐      ┌──────────────┐
│   Client    │─────▶│ sendOTP()        │─────▶│ Secondary   │─────▶│ SMS Gateway  │
│             │      │ (Secondary App)  │      │ Firebase    │      │              │
└─────────────┘      └──────────────────┘      └─────────────┘      └──────────────┘
       │
       │ User enters OTP code
       │
       ▼
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   Client    │─────▶│ verifyOTP()      │─────▶│ Secondary   │
│             │      │ (Secondary App)  │      │ Firebase    │
└─────────────┘      └──────────────────┘      └─────────────┘
       │                                              │
       │                                              │ Returns custom token
       │                                              ▼
       │                                        ┌─────────────┐
       │                                        │ Primary     │
       │◀──────────────────────────────────────│ Firebase    │
       │                                        │ (Custom     │
       │ signInWithCustomToken()                │  Token)     │
       │                                        └─────────────┘
       │
       ▼
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   Client    │─────▶│ /api/auth/login  │─────▶│ ERP Backend │
│             │      │ (ThirdPartyToken)│      │             │
│             │◀─────│ (Encrypted crf)  │◀─────│ access_token│
└─────────────┘      └──────────────────┘      └─────────────┘
```

## Environment Variables

### Required Variables

#### Primary Firebase Project
```bash
# Primary Firebase (used for Auth)
NEXT_PUBLIC_FIREBASE_API_KEY=your-primary-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-primary.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-primary-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-primary.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

#### Secondary Firebase Project
```bash
# Secondary Firebase (used for Cloud Functions)
NEXT_PUBLIC_FIREBASE_API_KEY_SECONDARY=your-secondary-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_SECONDARY=your-secondary.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY=your-secondary-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SECONDARY=your-secondary.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_SECONDARY=987654321
NEXT_PUBLIC_FIREBASE_APP_ID_SECONDARY=1:987654321:web:fedcba
```

#### Cookie Encryption
```bash
# AES-256-GCM encryption key (32 bytes, base64-encoded)
COOKIE_CRYPTO_KEY=your-base64-encoded-key

# Generate a key with:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Cloud Function Names (Optional)
```bash
# Default: "sendOTP" and "verifyOTP"
NEXT_PUBLIC_FIREBASE_SEND_OTP_FUNCTION=sendOTP
NEXT_PUBLIC_FIREBASE_VERIFY_OTP_FUNCTION=verifyOTP
```

#### ERP Backend
```bash
# Your ERP backend credentials
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
AUTH_MODE=auto
USE_TOKEN_ROUTE=true
```

## Cloud Functions Setup

Deploy these functions to your **Secondary Firebase Project**:

### sendOTP Function

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendOTP = functions.https.onCall(async (data, context) => {
  const { phoneNumber } = data;

  if (!phoneNumber) {
    throw new functions.https.HttpsError('invalid-argument', 'Phone number is required');
  }

  try {
    // Create verification session
    const verificationId = await admin.auth().createCustomToken(phoneNumber);
    
    // Send SMS via your preferred provider (Twilio, AWS SNS, etc.)
    await sendSMSViaProvider(phoneNumber, generateOTP());

    return {
      success: true,
      verificationId,
      message: 'OTP sent successfully',
    };
  } catch (error) {
    console.error('sendOTP error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send OTP');
  }
});

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendSMSViaProvider(phoneNumber: string, otp: string): Promise<void> {
  // Implement your SMS provider integration
  // Example: Twilio, AWS SNS, Firebase SMS, etc.
}
```

### verifyOTP Function

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const verifyOTP = functions.https.onCall(async (data, context) => {
  const { verificationId, code } = data;

  if (!verificationId || !code) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Verification ID and code are required'
    );
  }

  try {
    // Verify OTP code (implement your verification logic)
    const isValid = await verifyOTPCode(verificationId, code);

    if (!isValid) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid OTP code');
    }

    // Generate custom token for primary Firebase project
    const customToken = await admin.auth().createCustomToken(verificationId);

    return {
      success: true,
      customToken,
      message: 'OTP verified successfully',
    };
  } catch (error) {
    console.error('verifyOTP error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to verify OTP');
  }
});

async function verifyOTPCode(verificationId: string, code: string): Promise<boolean> {
  // Implement your OTP verification logic
  // Check code against stored session data
  return true; // Replace with actual verification
}
```

### Deploy Functions

```bash
cd functions
firebase deploy --only functions:sendOTP,functions:verifyOTP --project your-secondary-project
```

## Client Implementation

### 1. Create Auth Provider

Create a client-side auth provider to manage Firebase state:

```typescript
// app/providers/auth-provider.tsx
'use client';

import { useEffect, useState } from 'react';
import { startAuthStateSync } from 'erp-core';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize auth state sync once
    const initAuth = async () => {
      try {
        await startAuthStateSync({
          loginEndpoint: '/api/auth/login',
          onError: (error) => {
            console.error('Auth sync error:', error);
          },
        });
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}
```

### 2. Phone Login Component

```typescript
// app/components/phone-login.tsx
'use client';

import { useState } from 'react';
import { startPhoneSignIn } from 'erp-core';
import type { StartPhoneSignInResult } from 'erp-core';

export function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState<StartPhoneSignInResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await startPhoneSignIn(phoneNumber);
      setConfirmation(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmation) return;

    setLoading(true);
    setError(null);

    try {
      // This will:
      // 1. Verify OTP via Cloud Function
      // 2. Get custom token
      // 3. Sign in with custom token
      // 4. Trigger startAuthStateSync to send token to backend
      await confirmation.confirm(code);
      
      // User is now authenticated!
      // The auth provider will handle syncing to backend
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!confirmation) {
    return (
      <div>
        <h2>Phone Login</h2>
        <input
          type="tel"
          placeholder="+1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOTP} disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Enter OTP</h2>
      <p>Code sent to {phoneNumber}</p>
      <input
        type="text"
        placeholder="000000"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleVerifyOTP} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### 3. Root Layout

```typescript
// app/layout.tsx
import { AuthProvider } from './providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Server Implementation

### 1. Login Route Handler

```typescript
// app/api/auth/login/route.ts
export { POST } from 'erp-core/identity/handler/login';
```

### 2. Token Route Handler

```typescript
// app/api/auth/token/route.ts
export { GET } from 'erp-core/identity/handler/token';
```

## Security Features

### 1. Encrypted Token Storage

Backend access tokens are encrypted using AES-256-GCM before being stored in cookies:

- **Cookie Name**: `crf` (httpOnly, secure, sameSite: lax)
- **Encryption**: AES-256-GCM with 256-bit key
- **Storage**: Server-side only (httpOnly prevents client access)

### 2. Server-Side Decryption

Tokens are decrypted server-side when needed:

```typescript
import { getEncryptedCookie, COOKIE_NAMES } from 'erp-core';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = getEncryptedCookie(cookieStore, COOKIE_NAMES.CRF);
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Use token...
}
```

### 3. Backward Compatibility

During migration, both old and new cookie formats are supported:

- **New**: `crf` (encrypted)
- **Legacy**: `access_token` (plain)

The SDK checks `crf` first, then falls back to `access_token` if not found.

## Cookie Reference

| Cookie Name | Type | Content | httpOnly | Purpose |
|------------|------|---------|----------|---------|
| `crf` | Encrypted | Backend access_token | Yes | Main auth token (encrypted) |
| `isUser` | Plain | Boolean flag | No | User role indicator |
| `tp_id` | Plain | Firebase ID token | Yes | Firebase token cache |
| `access_token` | Plain | Backend token | Yes | Legacy (migration only) |

## Testing

### 1. Test Encryption

```typescript
import { encrypt, decrypt } from 'erp-core';

// Generate test key
process.env.COOKIE_CRYPTO_KEY = require('crypto').randomBytes(32).toString('base64');

const original = 'test-token-12345';
const encrypted = encrypt(original);
const decrypted = decrypt(encrypted);

console.assert(original === decrypted, 'Encryption roundtrip failed');
```

### 2. Test Auth Flow

```typescript
// Test OTP send
const confirmation = await startPhoneSignIn('+1234567890');
console.log('Verification ID:', confirmation.verificationId);

// Test OTP verify
const token = await confirmation.confirm('123456');
console.log('Firebase token:', token);
```

### 3. Test Cookie Storage

```bash
# Check cookies in browser DevTools
# Application > Cookies > localhost

# Should see:
# - crf (encrypted, httpOnly)
# - isUser (plain)
# - tp_id (Firebase token, httpOnly)
```

## Migration Guide

### From Old Architecture

If you're migrating from the previous phone auth implementation:

1. **Add Secondary Firebase Project**
   - Create new Firebase project for Cloud Functions
   - Add env vars with `_SECONDARY` suffix

2. **Deploy Cloud Functions**
   - Deploy `sendOTP` and `verifyOTP` to secondary project

3. **Generate Encryption Key**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   - Add to `COOKIE_CRYPTO_KEY` env var

4. **Update Client Code**
   - Remove `recaptchaContainerId` parameter from `startPhoneSignIn`
   - No other changes needed!

5. **Test**
   - Verify OTP flow works
   - Check encrypted `crf` cookie is set
   - Confirm backend receives valid tokens

### Rollback Plan

If issues occur, the SDK maintains backward compatibility:

- Legacy `access_token` cookies still work
- `getToken()` checks both `crf` and `access_token`
- No breaking changes for existing users

## Troubleshooting

### "COOKIE_CRYPTO_KEY not set"

Generate a key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to `.env.local`:
```bash
COOKIE_CRYPTO_KEY=your-generated-key
```

### "Failed to send OTP"

Check:
1. Secondary Firebase project env vars are correct
2. Cloud Functions are deployed
3. Firebase Functions region matches your location

### "Invalid custom token"

Verify:
1. Primary and secondary Firebase projects are different
2. `verifyOTP` function returns valid custom token
3. Custom token is signed with correct service account

### Cookies Not Being Set

Ensure:
1. Route handlers are in `app/api/auth/` directory
2. `USE_TOKEN_ROUTE=true` in env
3. Browser allows cookies (check DevTools > Application)

## Best Practices

1. **Key Rotation**: Rotate `COOKIE_CRYPTO_KEY` periodically
2. **Rate Limiting**: Implement rate limits on OTP endpoints
3. **Monitoring**: Log OTP send/verify events
4. **Error Handling**: Show user-friendly error messages
5. **Testing**: Test with real phone numbers in staging

## Support

For issues or questions:
- Check logs in browser DevTools (Console)
- Check server logs for encryption/decryption errors
- Verify all environment variables are set correctly

