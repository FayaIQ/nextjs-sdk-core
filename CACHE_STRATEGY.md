# Token Caching Strategy

## The Problem
In Next.js App Router, you **cannot set cookies during component rendering**. Cookies can only be set in:
- Route Handlers (`app/api/*/route.ts`)
- Server Actions
- Middleware

## Current Behavior (AUTO mode)

### Without Firebase Login
1. User visits page → component calls `getWithAuth()` → calls `getToken()`
2. `getToken()` checks `access_token` cookie → not found
3. Calls backend `/signin` with `clientId` + `clientSecret`
4. Returns token (but cannot save to cookie during render)
5. **Next.js caches the fetch** for 1 hour via `revalidate: 3600`
6. Multiple calls within same request → Next.js dedupes automatically
7. **Each new page load** → repeats process (but uses Next.js Data Cache)

### With Firebase Login
1. User logs in via Firebase → calls `/api/auth/login` route handler
2. Route handler sets `access_token` and `tp_id` cookies
3. Future requests use `access_token` from cookie
4. When cookie expires, `getToken()` uses `tp_id` to re-auth

## Solutions

### Option 1: Use Next.js Data Cache (Current)
- Relies on `revalidate: 3600` in fetch options
- Works for server-side rendering
- **Limitation**: Each deployment/restart loses cache
- **Benefit**: Simpler, no cookie management needed

### Option 2: Dedicated Token Route Handler
Create `/api/auth/token/route.ts`:
```ts
export async function GET() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  
  // Check existing token
  const existingToken = cookieStore.get("access_token")?.value;
  if (existingToken) {
    return NextResponse.json({ access_token: existingToken });
  }
  
  // Fetch new token
  const token = await fetchTokenFromBackend();
  
  // Set cookie
  const res = NextResponse.json({ access_token: token });
  res.cookies.set("access_token", token, {
    httpOnly: true,
    maxAge: 3600,
    path: "/",
  });
  
  return res;
}
```

Then update `getToken()` to call this route:
```ts
const res = await fetch('/api/auth/token', { next: { revalidate: 3600 } });
const { access_token } = await res.json();
```

### Option 3: Middleware (Recommended for production)
Create `middleware.ts` in your consumer app:
```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  
  if (!token) {
    // Fetch token and set cookie
    const newToken = await fetchToken();
    const response = NextResponse.next();
    response.cookies.set('access_token', newToken, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    });
    return response;
  }
  
  return NextResponse.next();
}
```

## Recommendation

For your use case (AUTO mode with guest users):

1. **Short term**: Current approach works fine with Next.js Data Cache
   - Fetches are cached for 1 hour
   - Multiple calls in same request are deduped
   - Simple to implement

2. **Production**: Add a token route handler
   - More reliable cookie management
   - Works across deployments
   - Explicit cache control

3. **Enterprise**: Use middleware
   - Centralized auth logic
   - Works for all routes automatically
   - Better performance
