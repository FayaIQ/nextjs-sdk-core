# WhatsApp OTP Authentication - Usage Example

This SDK now supports WhatsApp-based OTP authentication using your existing Cloud Functions setup.

## Prerequisites

1. **Firebase Functions Deployed**:
   - `whatsapp` - Sends OTP via WhatsApp
   - `verifySMS` - Verifies OTP code and returns custom token

2. **Environment Variables**:
```bash
# Firebase (single project)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
# ... other Firebase config

# Cookie encryption
COOKIE_CRYPTO_KEY=your-base64-key

# ERP Backend
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
AUTH_MODE=auto
USE_TOKEN_ROUTE=true
```

## Basic Usage

```typescript
import { startPhoneSignIn } from 'erp-core';

// Send OTP via WhatsApp
const confirmation = await startPhoneSignIn('+9647XXXXXXXXX', {
  projectName: 'ozoon',
});

// User receives WhatsApp message with OTP

// Verify OTP code
const firebaseToken = await confirmation.confirm('123456');

// Done! User is authenticated and token synced to backend
```

## Full Component Example

```typescript
'use client';

import { useState } from 'react';
import { startPhoneSignIn } from 'erp-core';
import type { StartPhoneSignInResult } from 'erp-core';

export function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmation, setConfirmation] = useState<StartPhoneSignInResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      // Normalize phone number (remove leading 0 if present)
      const normalizedPhone = phoneNumber.replace(/^0/, '');
      
      const result = await startPhoneSignIn(`+964${normalizedPhone}`, {
        projectName: 'ozoon', // Your project name
      });
      
      setConfirmation(result);
      alert('OTP sent via WhatsApp!');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    if (!confirmation) return;

    setLoading(true);
    setError('');

    try {
      const firebaseToken = await confirmation.confirm(otpCode);
      
      // Token is automatically synced to backend via startAuthStateSync
      console.log('Firebase token:', firebaseToken);
      
      // Redirect to dashboard or reload
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  if (!confirmation) {
    // Phone number input
    return (
      <div>
        <h2>Login with WhatsApp</h2>
        <input
          type="tel"
          placeholder="07XXXXXXXXX"
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

  // OTP verification
  return (
    <div>
      <h2>Enter OTP Code</h2>
      <p>Code sent to +964{phoneNumber.replace(/^0/, '')}</p>
      <input
        type="text"
        placeholder="000000"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        maxLength={6}
      />
      <button onClick={handleVerifyOTP} disabled={loading || otpCode.length !== 6}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

## Advanced Options

```typescript
const confirmation = await startPhoneSignIn('+9647XXXXXXXXX', {
  // Custom project name
  projectName: 'your-project',
  
  // Custom Cloud Function names
  sendFunctionName: 'whatsapp',      // Function that sends OTP
  verifyFunctionName: 'verifySMS',   // Function that verifies OTP
  
  // Use different Firebase app (optional)
  app: customFirebaseApp,
});
```

## Setup Auth Provider

Create a provider to initialize token sync:

```typescript
// app/providers/auth-provider.tsx
'use client';

import { useEffect } from 'react';
import { startAuthStateSync } from 'erp-core';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth state sync
    startAuthStateSync({
      loginEndpoint: '/api/auth/login',
      onError: (error) => {
        console.error('Auth sync error:', error);
      },
    });
  }, []);

  return <>{children}</>;
}
```

Add to your layout:

```typescript
// app/layout.tsx
import { AuthProvider } from './providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## API Routes

Create these route handlers:

```typescript
// app/api/auth/login/route.ts
export { POST } from 'erp-core/identity/handler/login';

// app/api/auth/token/route.ts
export { GET } from 'erp-core/identity/handler/token';
```

## How It Works

1. **Send OTP**: `startPhoneSignIn()` calls your `whatsapp` Cloud Function
2. **User Receives**: WhatsApp message with 6-digit code
3. **Verify Code**: `confirmation.confirm()` calls `verifySMS` Cloud Function
4. **Get Token**: Cloud Function returns custom token
5. **Sign In**: SDK signs in with custom token via Firebase Auth
6. **Sync Backend**: `startAuthStateSync()` automatically sends Firebase token to your ERP backend
7. **Store Cookie**: Backend returns encrypted `crf` cookie with access token

## Differences from Your App

Your current app code:
```typescript
// Manual approach
const functions2 = getFunctions(app2);
const sendOtpFunction = httpsCallable(functions2, "whatsapp");
await sendOtpFunction({ phoneNumber, projectName: "ozoon" });

const verifyOtpFunction = httpsCallable(functions2, "verifySMS");
const response = await verifyOtpFunction({ phoneNumber, code, projectName: "ozoon" });
const token = response.data.token;
await signInWithCustomToken(auth, token);
```

SDK simplified approach:
```typescript
// One-liner approach
const confirmation = await startPhoneSignIn(phoneNumber, { projectName: 'ozoon' });
const firebaseToken = await confirmation.confirm(code);
```

The SDK handles:
- ✅ Cloud Function calls
- ✅ Custom token sign-in
- ✅ Waiting for auth state
- ✅ Getting ID token
- ✅ Auto-sync to backend
- ✅ Cookie encryption
- ✅ Error handling

## Testing

1. **Ensure Cloud Functions are deployed**:
```bash
firebase deploy --only functions:whatsapp,functions:verifySMS
```

2. **Test with real phone number**:
```typescript
const confirmation = await startPhoneSignIn('+9647XXXXXXXXX');
// Check WhatsApp for OTP
await confirmation.confirm('123456');
```

3. **Check cookies**:
   - Open DevTools → Application → Cookies
   - Should see `crf` (encrypted), `isUser`, `tp_id`

## Troubleshooting

### "Function not found"
- Ensure Cloud Functions are deployed
- Check function names match: `whatsapp` and `verifySMS`

### "Invalid custom token"
- Verify your Cloud Function returns `{ token: string }`
- Check Firebase project is correct

### "No OTP received"
- Check WhatsApp Business API configuration
- Verify phone number format: `+964` prefix

### "Token not syncing to backend"
- Ensure `startAuthStateSync()` is called in provider
- Check `/api/auth/login` route exists
- Verify `COOKIE_CRYPTO_KEY` is set

## Migration from Your App

Replace this:
```typescript
const functions2 = getFunctions(app2);
const sendOtpFunction = httpsCallable(functions2, "whatsapp");
await sendOtpFunction({ phoneNumber: "+964" + normalizedPhone, projectName: "ozoon" });
```

With this:
```typescript
import { startPhoneSignIn } from 'erp-core';
const confirmation = await startPhoneSignIn("+964" + normalizedPhone, { 
  projectName: "ozoon" 
});
```

Replace this:
```typescript
const verifyOtpFunction = httpsCallable(functions2, "verifySMS");
const response = await verifyOtpFunction({ phoneNumber, code, projectName });
const token = response.data.token;
await signInWithCustomToken(auth, token);
const firebaseToken = await auth.currentUser!.getIdToken(true);
```

With this:
```typescript
const firebaseToken = await confirmation.confirm(code);
```

**That's it!** The SDK handles everything else automatically.
