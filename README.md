# ERP Core SDK

Enterprise Resource Planning SDK for Next.js with Firebase Phone Authentication.

## 🚀 Quick Start

```bash
npm install erp-core
# or
yarn add erp-core
# or
pnpm add erp-core
```

## 📖 Documentation

### Core Features
- **Inventory Management**: Products, orders, menus, categories
- **Identity & Auth**: User management, role-based access
- **GPS & Locations**: Store locations, delivery zones
- **CRM**: Customer management
- **Reports & Analytics**: Sales reports, inventory tracking

### Firebase Phone Authentication

**Secure phone authentication via WhatsApp OTP with encrypted token storage.**

👉 **[WhatsApp OTP Integration Guide](./WHATSAPP_AUTH_EXAMPLE.md)**

Key features:
- ✅ **WhatsApp OTP**: Send verification codes via WhatsApp
- ✅ **Simple Setup**: Single Firebase project with Cloud Functions
- ✅ **No Billing Required**: Uses your own Cloud Functions (no Firebase Phone Auth billing)
- ✅ **Encrypted Tokens**: AES-256-GCM encryption for cookie storage
- ✅ **Auto Token Sync**: Seamless token refresh and backend sync
- ✅ **Type-Safe**: Full TypeScript support

Quick example:
```typescript
import { startPhoneSignIn } from 'erp-core';

// Send OTP via WhatsApp
const confirmation = await startPhoneSignIn('+9647XXXXXXXXX', {
  projectName: 'ozoon',
});

// Verify OTP
await confirmation.confirm('123456');
// User is now authenticated!
```

See [WHATSAPP_AUTH_EXAMPLE.md](./WHATSAPP_AUTH_EXAMPLE.md) for detailed setup instructions.

## 🔧 Environment Variables

### Firebase
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Cookie Encryption
```bash
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
COOKIE_CRYPTO_KEY=your-base64-encoded-key
```

### ERP Backend
```bash
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
AUTH_MODE=auto
USE_TOKEN_ROUTE=true
```

## 📦 Installation & Setup

### 1. Install Package
```bash
npm install erp-core
```

### 2. Create API Routes

```typescript
// app/api/auth/login/route.ts
export { POST } from 'erp-core/identity/handler/login';

// app/api/auth/token/route.ts
export { GET } from 'erp-core/identity/handler/token';
```

### 3. Add Auth Provider

```typescript
// app/providers/auth-provider.tsx
'use client';

import { useEffect } from 'react';
import { startAuthStateSync } from 'erp-core';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startAuthStateSync();
  }, []);

  return <>{children}</>;
}
```

### 4. Use in Layout

```typescript
// app/layout.tsx
import { AuthProvider } from './providers/auth-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

## 🔐 Security

- **AES-256-GCM Encryption**: All tokens encrypted before storage
- **httpOnly Cookies**: Prevents XSS attacks
- **Server-Side Decryption**: Tokens never exposed to client
- **Custom Token Flow**: Enhanced security with dual Firebase projects

## 🧪 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test
npm test
```

## 📚 API Reference

### Firebase Auth
- `startPhoneSignIn(phoneNumber)` - Send OTP via Cloud Function
- `confirmPhoneCode(verificationId, code)` - Verify OTP and sign in
- `getFirebaseIdToken(forceRefresh?)` - Get current Firebase ID token
- `signOutFirebase()` - Sign out user
- `startAuthStateSync(options?)` - Start automatic token sync

### Token Management
- `getToken()` - Get backend access token (auto-refreshes)
- `encrypt(plaintext)` - Encrypt string (server-side only)
- `decrypt(ciphertext)` - Decrypt string (server-side only)

### Cookie Utilities
- `setEncryptedCookie(store, name, value)` - Set encrypted cookie
- `getEncryptedCookie(store, name)` - Get and decrypt cookie
- `COOKIE_NAMES` - Constants for cookie names

### Inventory
- `getProducts(params?)` - Get product list
- `getProductInfo(productId)` - Get product details
- `getMenus(params?)` - Get menu list
- `getOrders(params?)` - Get order list

See [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md) for complete documentation.

## 📝 Migration Guide

Upgrading from previous version? See migration steps in [FIREBASE_AUTH_GUIDE.md](./FIREBASE_AUTH_GUIDE.md#migration-guide).

## 🆘 Support

For issues or questions, please check:
1. [Firebase Auth Guide](./FIREBASE_AUTH_GUIDE.md)
2. Browser DevTools Console for errors
3. Server logs for encryption/decryption errors

## 📄 License

MIT

