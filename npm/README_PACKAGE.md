# my-next-core

A simple, powerful npm package for Next.js applications that provides easy access to Storeak API functions in both server and client components.

## 🚀 Installation

```bash
npm install my-next-core
# or
yarn add my-next-core
# or
pnpm add my-next-core
```

## 🔧 Quick Setup

### Automatic Setup (Recommended)

Run the setup command to automatically create all API routes:

```bash
npx my-next-core setup
```

This will create:
- `app/api/storeInfo/route.ts`
- `app/api/getProducts/route.ts`
- `app/api/productInfo/[id]/route.ts`

### Manual Setup

#### 1. Environment Variables (Optional but Recommended)

Create a `.env.local` file in your Next.js project root to override default credentials:

```env
# Storeak API Credentials
STOREAK_CLIENT_ID=your-client-id
STOREAK_CLIENT_SECRET=your-client-secret
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password

# Optional settings
STOREAK_LANGUAGE=0
STOREAK_GMT=3
```

⚠️ **Note:** If you don't provide environment variables, the package will use default credentials (for backward compatibility). However, it's recommended to use your own credentials in production.

#### 2. API Routes (One-Liners!)

If you didn't use the automatic setup, create these API routes manually:

```typescript
// app/api/storeInfo/route.ts
export { GET } from "my-next-core/handlers/storeInfo";
```

```typescript
// app/api/getProducts/route.ts
export { GET } from "my-next-core/handlers/getProducts";
```

```typescript
// app/api/productInfo/[id]/route.ts
export { GET } from "my-next-core/handlers/productInfo";
```

**That's it!** All error handling, parsing, and response formatting is built-in!

## 📖 Usage

### Server Components (Recommended)

Just import and call the function - that's it!

```typescript
// app/page.tsx
import { getStoreInfo } from "my-next-core";

export default async function Page() {
  // Just call the function name!
  const storeInfo = await getStoreInfo();
  
  return (
    <div>
      <h1>{storeInfo.name}</h1>
      <p>{storeInfo.description}</p>
    </div>
  );
}
```

### Get Products

```typescript
import { getProducts, ItemsFilterParameters } from "my-next-core";

export default async function ProductsPage() {
  // Create filter parameters
  const filters = new ItemsFilterParameters();
  
  // Get products - just call the function!
  const products = await getProducts({ filterParams: filters });
  
  return (
    <div>
      {products.items.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Client Components

For client-side data fetching:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function ClientProducts() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const filters = new ItemsFilterParameters();
      const data = await getProducts({ filterParams: filters });
      setProducts(data);
    }
    fetchData();
  }, []);
  
  // Render your data...
}
```

## 🎯 Available Functions

### `getStoreInfo()`
Fetches store information.

```typescript
const storeInfo = await getStoreInfo();
```

### `getProducts({ filterParams })`
Fetches products with optional filtering.

```typescript
const filters = new ItemsFilterParameters({
  sortType: SortType.LowPrice,
  minPrice: 10,
  maxPrice: 100
});

const products = await getProducts({ filterParams: filters });
```

### `getProductInfo(id)`
Fetches information for a specific product.

```typescript
const product = await getProductInfo(123);
```

## 🎨 Filter Parameters

The `ItemsFilterParameters` class provides comprehensive filtering:

```typescript
import { ItemsFilterParameters, SortType } from "my-next-core";

const filters = new ItemsFilterParameters({
  // Sorting
  sortType: SortType.LowPrice, // None, Newest, LowPrice, HighPrice, BestSelling, MostViewed, Name
  
  // Pagination
  pagingParameters: {
    currentPage: 1,
    pageSize: 20
  },
  
  // Price range
  minPrice: 10,
  maxPrice: 100,
  
  // Search
  name: "product name",
  
  // Category
  menuId: 5,
  
  // And many more options...
});
```

## 📦 TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
  StoreInfo, 
  Product, 
  ItemsFilterParameters,
  SortType 
} from "my-next-core";
```

## 🔒 Security

- Never expose your credentials in client-side code
- Environment variables are only used server-side
- API routes act as a secure proxy for client components

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
