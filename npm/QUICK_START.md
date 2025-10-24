# Quick Start Guide - my-next-core

## 🚀 Get Started in 3 Steps

### Step 1: Install
```bash
npm install my-next-core
```

### Step 2: Setup API Routes
```bash
npx my-next-core setup
```

This automatically creates:
- ✅ `app/api/storeInfo/route.ts`
- ✅ `app/api/getProducts/route.ts`
- ✅ `app/api/productInfo/[id]/route.ts`

### Step 3: Start Using!

**Server Component:**
```typescript
import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const storeInfo = await getStoreInfo();
  return <h1>{storeInfo.name}</h1>;
}
```

**Client Component:**
```typescript
'use client';
import { useEffect, useState } from 'react';
import { getStoreInfo } from 'my-next-core';

export default function Page() {
  const [storeInfo, setStoreInfo] = useState(null);
  
  useEffect(() => {
    getStoreInfo().then(setStoreInfo);
  }, []);
  
  return <h1>{storeInfo?.name}</h1>;
}
```

## 🔐 Optional: Configure Credentials

Create `.env.local`:
```env
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password
```

## 📖 Available Functions

- `getStoreInfo()` - Get store information
- `getProducts({ filterParams })` - Get products list with filtering
- `getProductInfo(id)` - Get specific product details

## 🛠️ CLI Commands

- `npx my-next-core setup` - Auto-create all API routes
- `npx my-next-core help` - Show help information

## 📚 Full Documentation

See [README_PACKAGE.md](./README_PACKAGE.md) for complete documentation.

---

**That's it!** You're ready to build amazing things! 🎉
