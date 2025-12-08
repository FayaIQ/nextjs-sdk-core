# Third-Party Authentication Fix

## Problem
When logging in with Firebase ID token (thirdPartyToken), the backend was returning 401 Unauthorized. The Firebase authentication was working correctly (user signed in, idToken acquired), but the login API call was failing.

## Root Cause
The `loginUser` function was sending **both** username/password AND ThirdPartyToken in the same request. The backend likely:
1. Checks username/password first
2. Sees they are empty or invalid
3. Rejects the request with 401 before checking ThirdPartyToken

## Solution
Separate the authentication logic into two distinct paths:

### Path 1: Third-Party Authentication (Firebase)
When `thirdPartyToken` is provided:
```typescript
{
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  Language: 0,
  GMT: 3,
  IsFromNotification: false,
  ThirdPartyToken: "<firebase-id-token>",
  ThirdPartyAuthType: 100  // ← REQUIRED for Firebase auth
}
```
**No username or password sent.**

### Path 2: Standard Username/Password Authentication
When `thirdPartyToken` is NOT provided:
```typescript
{
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: "user@example.com",
  password: "password123",
  Language: 0,
  GMT: 3,
  IsFromNotification: false
}
```
**No ThirdPartyToken sent.**

## Changes Made

### `src/identity/login.ts`

**Before:**
```typescript
// ❌ Always sent username/password even with ThirdPartyToken
const fullCredentials: FullLoginCredentials = {
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: credentials.username || config.username,
  password: credentials.password || config.password,
  Language: config.language ?? 0,
  ThirdPartyToken: credentials.thirdPartyToken || config.thirdPartyToken,
  GMT: config.gmt ?? 3,
  IsFromNotification: false,
};
```

**After:**
```typescript
// ✅ Build request body based on auth type
const thirdPartyToken = credentials.thirdPartyToken || config.thirdPartyToken;

let requestBody: Record<string, any>;

if (thirdPartyToken) {
  // Third-party authentication (Firebase, etc.)
  requestBody = {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    Language: config.language ?? 0,
    GMT: config.gmt ?? 3,
    IsFromNotification: false,
    ThirdPartyToken: thirdPartyToken,
    ThirdPartyAuthType: 100, // Firebase auth type
  };
} else {
  // Standard username/password authentication
  requestBody = {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: credentials.username || config.username,
    password: credentials.password || config.password,
    Language: config.language ?? 0,
    GMT: config.gmt ?? 3,
    IsFromNotification: false,
  };
}
```

## Expected Flow

### Firebase Login (Client → Backend)
```typescript
// 1. Client: Get Firebase ID token
const idToken = await getFirebaseIdToken();

// 2. Client: Send to backend
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ thirdPartyToken: idToken })
});

// 3. Backend: loginUser builds request with ONLY ThirdPartyToken
// Request to ERP API:
{
  clientId: "...",
  clientSecret: "...",
  ThirdPartyToken: "eyJhbGciOiJSUzI1NiIs...",
  ThirdPartyAuthType: 100,
  Language: 0,
  GMT: 3
}
// ✅ No username/password sent

// 4. Backend: Sets cookies (access_token, tp_id, isUser)
```

### Standard Login
```typescript
// 1. Client: Send credentials
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ 
    username: 'user@example.com', 
    password: 'password123' 
  })
});

// 2. Backend: loginUser builds request with username/password
// Request to ERP API:
{
  clientId: "...",
  clientSecret: "...",
  username: "user@example.com",
  password: "password123",
  Language: 0,
  GMT: 3
}
// ✅ No ThirdPartyToken sent

// 3. Backend: Sets cookies (access_token, roles, username, etc.)
```

## Testing
1. **Update SDK**: `npm install FayaIQ/nextjs-sdk-core#prod`
2. **Test Firebase Login**:
   - Enter phone number → Firebase sends OTP
   - Enter OTP code → Firebase confirms
   - Get idToken → Send to `/api/auth/login`
   - Should return 200 with success
3. **Check Logs**:
   ```
   [identity:loginUser] using ThirdPartyToken authentication
   [identity:loginUser] requestBody prepared {
     hasThirdPartyToken: true,
     hasThirdPartyAuthType: true,
     hasUsername: false,  // ← Should be false
     hasPassword: false   // ← Should be false
   }
   ```

## Key Takeaway
When using third-party authentication (Firebase, Google, etc.), send **ONLY** the third-party token to the backend. Do not mix username/password with third-party tokens in the same request.
