# Token Caching - How It Works Now

## The Fix

I've implemented **React.cache()** memoization to ensure `getToken()` is only called ONCE per request, even if multiple components/API calls need a token.

## What Changed

### 1. Request-level Memoization
```ts
// Before: getToken() called multiple times per request
Component A → getToken() → fetch backend
Component B → getToken() → fetch backend again ❌
Component C → getToken() → fetch backend again ❌

// After: getToken() cached per-request with React.cache()
Component A → getToken() → fetch backend
Component B → getToken() → returns cached result ✅
Component C → getToken() → returns cached result ✅
```

### 2. Cookie-First Strategy
```ts
// On every request:
1. Check access_token cookie → if exists, return immediately
2. If no cookie and USE_TOKEN_ROUTE=true → call /api/auth/token ONCE
3. Token route sets cookie for 1 hour
4. Future requests use cookie (step 1)
```

## Expected Behavior

### First Request (No Cookie)
```
[token:getToken] checking existing access_token cookie (server)
[token:getToken] no cookie found, calling /api/auth/token ONCE to set cookie
[identity:handler:token] GET checking existing token
[identity:handler:token] signing in with clientId/clientSecret
[identity:handler:token] new token obtained, setting cookie
[token:getToken] token route set cookie, returning token
```

### Subsequent Requests (Cookie Exists)
```
[token:getToken] checking existing access_token cookie (server)
[token:getToken] using existing access_token from cookie
# No backend call, no token route call ✅
```

### Multiple Components in Same Request
```
Component A:
  [token:getToken] checking existing access_token cookie (server)
  [token:getToken] using existing access_token from cookie

Component B:
  # React.cache returns memoized result - no logs, instant return ✅

Component C:
  # React.cache returns memoized result - no logs, instant return ✅
```

## Why This Works

1. **React.cache()** ensures within a single Next.js request, `getToken()` is only executed once
2. **Cookie checking** happens first - if cookie exists, return immediately (no fetch)
3. **Token route** is only called when no cookie exists AND `USE_TOKEN_ROUTE=true`
4. **Token route sets cookie** with 1-hour expiry
5. **Next hour** - all requests use the cookie, zero backend calls

## How to Verify

Check your logs - you should see:

**Page Load 1:**
```
[token:getToken] checking existing access_token cookie (server)
[token:getToken] no cookie found, calling /api/auth/token ONCE to set cookie
[identity:handler:token] new token obtained, setting cookie
```

**Page Load 2-N (within 1 hour):**
```
[token:getToken] checking existing access_token cookie (server)
[token:getToken] using existing access_token from cookie
```

**Same page with multiple API calls:**
```
# First call logs the cookie check
[token:getToken] checking existing access_token cookie (server)
[token:getToken] using existing access_token from cookie

# Subsequent calls are memoized - NO LOGS (React.cache hit)
```

## If You Still See Repeated Calls

1. **Check cookie is actually being set**:
   - Open DevTools → Application → Cookies
   - Look for `access_token` cookie with 1-hour maxAge

2. **Verify USE_TOKEN_ROUTE is enabled**:
   ```bash
   # .env.local
   USE_TOKEN_ROUTE=true
   AUTH_MODE=auto
   ```

3. **Ensure token route exists**:
   ```ts
   // app/api/auth/token/route.ts
   export { GET } from "erp-core/identity";
   ```

4. **Check you're not in development with cache disabled**:
   - Next.js dev mode sometimes clears cookies between requests
   - Test in production build: `npm run build && npm start`

5. **Verify cookies work across your domain**:
   - Cookie path is `/` (all routes)
   - Cookie sameSite is `lax`
   - If using subdomains, you may need domain-specific config
