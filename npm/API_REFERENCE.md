# Package Structure & API Reference

## 📁 Package Structure

```
my-next-core/
├── dist/                   # Compiled output
│   ├── index.js           # CommonJS
│   ├── index.mjs          # ES Module
│   ├── index.d.ts         # TypeScript definitions
│   └── index.d.mts
├── src/                    # Source files
│   ├── index.ts           # Main exports
│   ├── storeInfo.ts       # Store info API
│   ├── getProducts.ts     # Products API
│   ├── getProductInfo.ts  # Single product API
│   ├── types.ts           # TypeScript types
│   ├── filter-models.ts   # Filtering classes
│   ├── fetcher.ts         # API fetch utility
│   ├── token.ts           # Authentication
│   └── serverApi.ts       # Server-side utilities
└── package.json
```

## 🔧 Exported Functions

### Main Functions

#### `getStoreInfo(): Promise<StoreInfo>`
Fetches complete store information including address, contact, and settings.

**Usage:**
```typescript
const storeInfo = await getStoreInfo();
console.log(storeInfo.name, storeInfo.address);
```

**Returns:** `StoreInfo` object with store details

---

#### `getProducts({ filterParams }): Promise<Product>`
Fetches products with optional filtering and sorting.

**Parameters:**
- `filterParams`: `ItemsFilterParameters` - Filter and sort options

**Usage:**
```typescript
const filters = new ItemsFilterParameters();
const products = await getProducts({ filterParams: filters });
```

**Returns:** `Product` object with items array and pagination info

---

#### `getProductInfo(id: number): Promise<ProductDetails>`
Fetches detailed information for a specific product.

**Parameters:**
- `id`: `number` - Product ID

**Usage:**
```typescript
const product = await getProductInfo(123);
```

---

## 🎨 Filter & Sort Classes

### `ItemsFilterParameters`

Comprehensive filtering class for products.

**Constructor Options:**
```typescript
new ItemsFilterParameters({
  // Pagination
  pagingParameters?: PagingParameters,
  
  // Sorting
  sortType?: SortType,
  
  // Category
  menuId?: number,
  categoryId?: number,
  
  // Price
  minPrice?: number,
  maxPrice?: number,
  
  // Search
  name?: string,
  
  // Demographics
  gender?: Gender,
  age?: AgeGroup,
  
  // Time-based
  newArrival?: NewArrivalPeriod,
  
  // Other
  sourceId?: number,
  offerId?: number
})
```

**Methods:**
- `toURLSearchParams()`: Convert to URL params
- `static fromURLSearchParams(params)`: Create from URL params

---

### `PagingParameters`

Pagination configuration.

```typescript
new PagingParameters({
  currentPage?: number,  // Default: 1
  pageSize?: number,     // Default: 20
  sortField?: string     // Optional sort field
})
```

---

### `SortType` Enum

```typescript
enum SortType {
  None = "None",
  Newest = "Newest",
  LowPrice = "LowPrice",
  HighPrice = "HighPrice",
  BestSelling = "BestSelling",
  MostViewed = "MostViewed",
  Name = "Name"  // A-Z
}
```

---

### `Gender` Enum

```typescript
enum Gender {
  Male = 1,
  Female = 2,
  Unisex = 3
}
```

---

### `AgeGroup` Enum

```typescript
enum AgeGroup {
  Baby = 1,
  Kids = 2,
  Teens = 3,
  Adults = 4,
  Seniors = 5
}
```

---

### `NewArrivalPeriod` Enum

```typescript
enum NewArrivalPeriod {
  Last_7_Days = "Last_7_Days",
  Last_30_Days = "Last_30_Days",
  Last_90_Days = "Last_90_Days"
}
```

---

## 📊 TypeScript Types

### `StoreInfo`

```typescript
interface StoreInfo {
  id: number;
  name: string;
  description: string;
  address: Address;
  // ... and more
}
```

### `Product`

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  picturePath: string;
  isAvailable: boolean;
  // ... and more
}
```

### `Address`

```typescript
interface Address {
  id: number;
  country: Country;
  city: City;
  district: District;
  building: string | null;
  gps: string | null;
}
```

---

## 🔐 Environment Variables

Required in `.env.local`:

```env
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password

# Optional (has defaults):
# STOREAK_API_URL=https://storeak-stores-service.azurewebsites.net
```

---

## 🌐 Environment Detection

The package automatically detects whether it's running on server or client:

**Server-side (SSR):**
- Uses environment variables directly
- Fetches from API with authentication
- No API routes needed

**Client-side (CSR):**
- Fetches through `/api/*` routes
- Proxies requests to avoid exposing credentials
- Requires API routes in your Next.js app

---

## 📝 Complete Example

### Server Component
```typescript
import { 
  getStoreInfo, 
  getProducts, 
  ItemsFilterParameters,
  SortType 
} from 'my-next-core';

export default async function StorePage() {
  // Get store info
  const store = await getStoreInfo();
  
  // Get filtered products
  const filters = new ItemsFilterParameters({
    sortType: SortType.LowPrice,
    minPrice: 10,
    maxPrice: 100,
    pagingParameters: {
      currentPage: 1,
      pageSize: 20
    }
  });
  
  const products = await getProducts({ filterParams: filters });
  
  return (
    <div>
      <h1>{store.name}</h1>
      <div>
        {products.items.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Client Component with API Routes
```typescript
// app/api/getProducts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProducts, ItemsFilterParameters } from "my-next-core";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
```

```typescript
// app/components/Products.tsx
'use client';
import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function Products() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    async function loadProducts() {
      const filters = new ItemsFilterParameters();
      const data = await getProducts({ filterParams: filters });
      setProducts(data);
    }
    loadProducts();
  }, []);
  
  if (!products) return <div>Loading...</div>;
  
  return (
    <div>
      {products.items.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
```

---

## 🚀 Advanced Usage

### Custom Fetcher

```typescript
import { apiFetch, ApiRequestOptions } from 'my-next-core';

const customFetch = async () => {
  const options: ApiRequestOptions = {
    token: 'your-token',
    method: 'GET'
  };
  
  const data = await apiFetch('/custom/endpoint', options);
  return data;
};
```

### Token Management

```typescript
import getToken from 'my-next-core';

const token = await getToken();
// Use token for custom API calls
```

---

## 📚 Additional Exports

All types are exported for TypeScript support:

```typescript
export type {
  StoreInfo,
  Product,
  Address,
  Country,
  City,
  District,
  UnitInfo,
  ApiRequestOptions
};

export {
  SortType,
  Gender,
  AgeGroup,
  NewArrivalPeriod,
  ItemsFilterParameters,
  PagingParameters
};
```
