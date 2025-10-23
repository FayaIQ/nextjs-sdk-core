# 📁 Project Structure Overview

```
npm-pack/
│
├── 📦 npm/                          ← YOUR NPM PACKAGE
│   ├── src/                         ← Source code
│   │   ├── index.ts                 ← Main exports (clean API)
│   │   ├── storeInfo.ts             ← Get store info
│   │   ├── getProducts.ts           ← Get products
│   │   ├── getProductInfo.ts        ← Get single product
│   │   ├── types.ts                 ← TypeScript types
│   │   ├── filter-models.ts         ← Filtering classes
│   │   ├── fetcher.ts               ← API utility
│   │   ├── token.ts                 ← Auth token
│   │   └── serverApi.ts             ← Server utilities
│   │
│   ├── dist/                        ← Built files (generated)
│   │   ├── index.js                 ← CommonJS
│   │   ├── index.mjs                ← ES Module
│   │   ├── index.d.ts               ← TypeScript types
│   │   └── index.d.mts              
│   │
│   ├── bin/
│   │   └── setup.js                 ← CLI utility
│   │
│   ├── package.json                 ← Package config
│   ├── tsconfig.json                ← TypeScript config
│   ├── README_PACKAGE.md            ← User documentation
│   └── API_REFERENCE.md             ← API docs
│
├── 🧪 test-app/                     ← TEST APPLICATION
│   ├── app/
│   │   ├── page.tsx                 ← Demo page (SERVER)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── components/
│   │   │   └── ClientProducts.tsx   ← Demo (CLIENT)
│   │   │
│   │   └── api/                     ← API Routes (proxies)
│   │       ├── storeInfo/
│   │       │   └── route.ts         ← Store info proxy
│   │       └── getProducts/
│   │           └── route.ts         ← Products proxy
│   │
│   ├── .env.local                   ← Credentials (you add)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── README_TEST.md
│
├── 📖 Documentation/
│   ├── README.md                    ← Quick start
│   ├── DEVELOPMENT.md               ← Dev workflow
│   ├── EXAMPLES.md                  ← Code examples
│   └── SUMMARY.md                   ← This summary
│
└── .git/                            ← Git repository
```

---

## 🔄 Data Flow

### Server Component (Recommended)
```
┌─────────────────┐
│  page.tsx       │
│  (Server)       │
│                 │
│  getStoreInfo() │
└────────┬────────┘
         │
         ↓
┌────────────────────┐
│  my-next-core pkg  │
│  (auto-detects)    │
│  → uses env vars   │
│  → fetches API     │
└─────────┬──────────┘
          │
          ↓
┌─────────────────┐
│  Storeak API    │
│  (with token)   │
└─────────────────┘
```

### Client Component
```
┌─────────────────────┐
│  ClientProducts.tsx │
│  (Client)           │
│                     │
│  getProducts()      │
└──────────┬──────────┘
           │
           ↓
┌──────────────────────┐
│  /api/getProducts    │
│  (Next.js API Route) │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│  my-next-core pkg    │
│  (server-side)       │
│  → uses env vars     │
└──────────┬───────────┘
           │
           ↓
┌──────────────────┐
│  Storeak API     │
│  (with token)    │
└──────────────────┘
```

---

## 🎯 How Users Will Use It

### 1. Install
```bash
npm install my-next-core
```

### 2. Configure
```env
# .env.local
STOREAK_USERNAME=username
STOREAK_PASSWORD=password
```

### 3. Use (Server)
```typescript
import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const store = await getStoreInfo();
  return <h1>{store.name}</h1>;
}
```

### 4. Use (Client)
```typescript
'use client';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function Products() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    getProducts({ filterParams: new ItemsFilterParameters() })
      .then(setData);
  }, []);
}
```

---

## 🛠️ Development Workflow

### Make Changes
```bash
cd npm/src/
# Edit files
```

### Build
```bash
cd npm
npm run build
```

### Test
```bash
cd test-app
npm run dev
# Visit http://localhost:3000
```

### Publish (when ready)
```bash
cd npm
npm publish
```

---

## 📦 What Gets Published

When you run `npm publish`, only these files are included:

```
my-next-core/
├── dist/
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   └── index.d.mts
├── bin/
│   └── setup.js
├── package.json
└── README_PACKAGE.md
```

Everything else (src/, test-app/, etc.) stays private.

---

## 🎨 Package Exports

### Main Export
```typescript
import { 
  getStoreInfo,
  getProducts,
  getProductInfo,
  ItemsFilterParameters,
  SortType,
  Gender,
  AgeGroup
} from 'my-next-core';
```

### Type Exports
```typescript
import type {
  StoreInfo,
  Product,
  Address,
  Country,
  City
} from 'my-next-core';
```

---

## 🔍 Key Files Explained

### `npm/src/index.ts`
Main entry point - exports all functions and types

### `npm/src/storeInfo.ts`
Implements `getStoreInfo()` with server/client detection

### `npm/src/getProducts.ts`
Implements `getProducts()` with filtering

### `npm/src/filter-models.ts`
Filter classes for products (ItemsFilterParameters, etc.)

### `npm/src/types.ts`
All TypeScript type definitions

### `npm/package.json`
Package configuration:
- Exports (CommonJS + ESM)
- Peer dependencies (Next.js, React)
- Build scripts

### `test-app/app/page.tsx`
Server component demo

### `test-app/app/components/ClientProducts.tsx`
Client component demo

### `test-app/app/api/*/route.ts`
API routes for client-side fetching

---

## 🎯 Design Decisions

### 1. Environment Auto-Detection
Package detects `typeof window === 'undefined'` to determine server/client

### 2. Simple API
Just function names - no complex initialization or classes

### 3. TypeScript First
Full type safety for better DX

### 4. Dual Format
Supports both CommonJS and ES Modules

### 5. Peer Dependencies
Doesn't bundle Next.js/React - uses user's versions

---

## 📊 File Sizes

Approximate sizes after build:
- `dist/index.js` - ~19 KB (CommonJS)
- `dist/index.mjs` - ~18 KB (ES Module)
- `dist/index.d.ts` - ~8 KB (Types)

Total package size: ~45 KB (very small!)

---

## ✅ Checklist

Before publishing:
- [ ] Update package.json (author, repo, etc.)
- [ ] Test with real credentials
- [ ] Add LICENSE file
- [ ] Update README if needed
- [ ] Test installation locally
- [ ] Verify all functions work
- [ ] Check TypeScript types
- [ ] Review documentation

---

## 🚀 Ready to Use!

Your package is complete and ready for:
1. ✅ Local testing (ongoing)
2. ✅ Local development
3. 🔜 Publishing to npm

Test URL: **http://localhost:3000**
