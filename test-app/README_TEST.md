# my-next-core Test App

This is a test application demonstrating the usage of the `my-next-core` npm package.

## 🚀 Getting Started

### 1. Configure Environment Variables

Edit `.env.local` and add your credentials:

```env
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password
```

### 2. Install Dependencies

The package is already installed locally from `../npm`:

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## 📋 What's Demonstrated

### Server Component Example
- Shows how to fetch store info on the server
- Located in `app/page.tsx`
- Simple function call: `await getStoreInfo()`

### Client Component Example
- Shows how to fetch products on the client
- Located in `app/components/ClientProducts.tsx`
- Uses React hooks with `getProducts()`

### API Routes
- `app/api/storeInfo/route.ts` - Proxy for store info
- `app/api/getProducts/route.ts` - Proxy for products

## 🎯 Key Features Shown

1. **Simple API** - Just call the function name
2. **Server & Client** - Works in both environments
3. **TypeScript Support** - Full type safety
4. **Filtering** - Comprehensive filter parameters
5. **Local Package** - Testing before publishing

## 📦 Package Location

The package is installed from: `../npm` (local development version)

To use the published version later, run:
```bash
npm install my-next-core
```
