# Token Cookie Persistence - Solution

## Problem
In Next.js App Router, you **cannot set cookies during component rendering**. The `getToken()` function was being called during page rendering, so cookie writes were silently failing, causing the token to be re-fetched on every page load.

## Root Cause
```
Component renders → calls getWithAuth() → calls getToken() 
→ tries to set cookie → ❌ FAILS (cookies can only be set in Route Handlers/Server Actions)
→ returns token but doesn't persist → next render repeats
```

## Solution Implemented

### 1. Created Token Route Handler
**File**: `src/identity/handler/token.ts`
- Route handler that **can** set cookies (unlike rendering)
- Checks existing `access_token` cookie first
- Falls back to `tp_id` for Firebase re-auth
- Falls back to `clientId`/`clientSecret` for guest users
- **Sets httpOnly cookie** for 1 hour
- Exported as `TokenGET` from `src/identity/index.ts`

### 2. Updated `getToken()` Logic
**File**: `src/token.ts`
- Added `USE_TOKEN_ROUTE` env flag
- When enabled, calls `/api/auth/token` route handler
- Route handler sets cookie properly
- Falls back to direct sign-in if route unavailable

### 3. Updated Documentation
**Files**: `README_CONSUMER.md`, `CACHE_STRATEGY.md`
- Clear instructions to wire the token route
- Troubleshooting for cookie persistence issues

## Consumer App Setup

### Step 1: Create the token route
```ts
// app/api/auth/token/route.ts
export { GET } from "erp-core/identity";
```

### Step 2: Enable the feature
```bash
# .env.local
USE_TOKEN_ROUTE=true
AUTH_MODE=auto
```

### Step 3: Verify
Check your logs - you should see:
```
[token:getToken] using /api/auth/token route for persistent cookies
[identity:handler:token] GET checking existing token
[identity:handler:token] new token obtained, setting cookie
```

On subsequent requests:
```
[identity:handler:token] returning existing token from cookie
```

## Flow Diagram

### Without Token Route (Before)
```
Page Load → getToken() → fetch backend → return token (no cookie) ❌
Next Page Load → getToken() → fetch backend → return token (no cookie) ❌
```

### With Token Route (After)
```
Page Load → getToken() → /api/auth/token → check cookie → fetch backend → SET COOKIE ✅
Next Page Load → getToken() → /api/auth/token → return existing cookie ✅
```

## Benefits
1. ✅ Persistent cookies across page loads
2. ✅ Reduced backend calls (1 per hour instead of per page)
3. ✅ Works for all user types (Firebase, guest, username/password)
4. ✅ Proper httpOnly cookie security
5. ✅ Graceful fallback if route not wired

## Testing
```bash
# In your consumer app
npm uninstall erp-core
npm install FayaIQ/nextjs-sdk-core#prod

# Create app/api/auth/token/route.ts
echo 'export { GET } from "erp-core/identity";' > app/api/auth/token/route.ts

# Add to .env.local
echo 'USE_TOKEN_ROUTE=true' >> .env.local

# Run dev server and check logs
npm run dev
```

You should see the cookie being set and reused across page loads.
