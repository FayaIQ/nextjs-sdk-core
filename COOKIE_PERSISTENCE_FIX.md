# Cookie Persistence Fix

## Problem
The SDK's route handlers (token and login) were setting cookies only in the HTTP response headers via `NextResponse.cookies.set()`. When these routes were called server-side via `fetch()`, the cookies weren't being stored in the Next.js cookies store, causing subsequent calls to not see the cookies.

## Root Cause
In Next.js App Router:
- `NextResponse.cookies.set()` - Sets cookies in the HTTP response headers (for client/browser)
- `cookies().set()` from `next/headers` - Sets cookies in the server-side cookies store

When a server component calls `/api/auth/token` via `fetch()`, it's a server-to-server call. The response headers are returned, but the cookies don't automatically propagate to the Next.js cookies store that's used by `cookies()` in subsequent calls.

## Solution
Set cookies in **both places**:

1. **In the cookies store** (for immediate server-side access):
```typescript
const { cookies } = await import("next/headers");
const cookieStore = await cookies();
cookieStore.set("access_token", token, options);
```

2. **In the response** (for client/browser):
```typescript
const res = NextResponse.json({ ... });
res.cookies.set("access_token", token, options);
```

## Files Fixed

### 1. `src/identity/handler/token.ts`
**Before:**
```typescript
// Return response with cookie
const res = NextResponse.json({ access_token: data.access_token });
res.cookies.set("access_token", data.access_token, cookieOptions);
```

**After:**
```typescript
// Set cookie directly in the cookies store (for server-side access)
cookieStore.set("access_token", data.access_token, cookieOptions);

// Return response with cookie (for client/browser)
const res = NextResponse.json({ access_token: data.access_token });
res.cookies.set("access_token", data.access_token, cookieOptions);
```

### 2. `src/identity/handler/login.ts`
**Before:**
```typescript
const res = NextResponse.json({ success: true, ... });

// Set tp_id only in response
if (body.thirdPartyToken) {
  res.cookies.set("tp_id", body.thirdPartyToken, cookieOptions);
}
```

**After:**
```typescript
// Set tp_id in cookies store first
if (body.thirdPartyToken) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set("tp_id", body.thirdPartyToken, cookieOptions);
}

const res = NextResponse.json({ success: true, ... });

// Also set in response for client
if (body.thirdPartyToken) {
  res.cookies.set("tp_id", body.thirdPartyToken, cookieOptions);
}
```

## Expected Behavior After Fix

### First Request
```
[token:getToken] no cookie found, calling /api/auth/token ONCE to set cookie
[identity:handler:token] new token obtained, setting cookie
  ✅ Cookie set in server store via cookieStore.set()
  ✅ Cookie set in response via res.cookies.set()
[token:getToken] token route set cookie, returning token
```

### Subsequent Requests (within 1 hour)
```
[token:getToken] using existing access_token from cookie
  ✅ Cookie found in server store immediately
  ✅ No backend call needed
```

## Testing
1. Clear all cookies
2. Make a request that triggers `getToken()`
3. Check logs - should see "setting cookie" once
4. Make another request immediately
5. Should see "using existing access_token from cookie"
6. No duplicate token fetches within the same request or subsequent requests

## Key Takeaway
In Next.js App Router server-side contexts, always set cookies in both:
- The cookies store (`cookieStore.set()`) for immediate server-side availability
- The response (`res.cookies.set()`) for client/browser persistence
