# NPM Package Development & Testing Guide

This repository contains:
- `npm/` - The npm package source code
- `test-app/` - A Next.js app for testing the package locally

## 🚀 Quick Start

### 1. Build the Package

```bash
cd npm
npm install
npm run build
```

This creates the `dist/` folder with compiled code.

### 2. Test Locally

The package is already installed in `test-app` using a local reference.

```bash
cd test-app
npm install
```

### 3. Configure Credentials

Edit `test-app/.env.local`:

```env
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password
```

### 4. Run Test App

```bash
cd test-app
npm run dev
```

Visit http://localhost:3000

## 📦 Package Usage

Developers using your package will simply:

### Install
```bash
npm install my-next-core
```

### Use in Server Components
```typescript
import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const storeInfo = await getStoreInfo();
  return <div>{storeInfo.name}</div>;
}
```

### Use in Client Components
```typescript
'use client';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

// In useEffect or async function
const filters = new ItemsFilterParameters();
const products = await getProducts({ filterParams: filters });
```

## 🔄 Development Workflow

### 1. Make changes in `npm/src/`

### 2. Rebuild the package
```bash
cd npm
npm run build
```

### 3. Test changes (package auto-updates in test-app)
```bash
cd test-app
npm run dev
```

## 📤 Publishing

When ready to publish to npm:

```bash
cd npm
npm login
npm publish
```

## 📁 Package Structure

```
npm/
├── src/              # Source TypeScript files
│   ├── index.ts      # Main exports
│   ├── storeInfo.ts  # Get store info
│   ├── getProducts.ts
│   ├── types.ts
│   └── ...
├── dist/             # Built files (generated)
├── package.json
└── tsconfig.json
```

## 🎯 Key Features

✅ Works in Server Components (SSR)
✅ Works in Client Components (CSR)
✅ Full TypeScript support
✅ Simple API - just function names
✅ Automatic environment detection
✅ Comprehensive filtering options

## 🔒 Security

- Credentials are only used server-side
- Client components use API routes as proxies
- Never expose credentials in client code
