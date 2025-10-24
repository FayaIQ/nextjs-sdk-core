# Quick Start Examples

## 🎯 The Simplest Possible Usage

### Server Component (3 lines!)

```typescript
import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const store = await getStoreInfo(); // That's it!
  return <h1>{store.name}</h1>;
}
```

### Get Products (4 lines!)

```typescript
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default async function Products() {
  const products = await getProducts({ filterParams: new ItemsFilterParameters() });
  return <div>{products.items.length} products found</div>;
}
```

---

## 🔍 With Filtering

```typescript
import { getProducts, ItemsFilterParameters, SortType } from 'my-next-core';

export default async function FilteredProducts() {
  const filters = new ItemsFilterParameters({
    sortType: SortType.LowPrice,  // Sort by price
    minPrice: 10,                  // Min $10
    maxPrice: 100                  // Max $100
  });
  
  const products = await getProducts({ filterParams: filters });
  
  return (
    <div>
      {products.items.map(p => (
        <div key={p.id}>{p.name} - ${p.price}</div>
      ))}
    </div>
  );
}
```

---

## 💻 Client Component

### 1. Create API Route

```typescript
// app/api/getProducts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProducts, ItemsFilterParameters } from "my-next-core";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
  const products = await getProducts({ filterParams });
  return NextResponse.json(products);
}
```

### 2. Use in Client Component

```typescript
'use client';
import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function ClientProducts() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    getProducts({ filterParams: new ItemsFilterParameters() })
      .then(setProducts);
  }, []);
  
  if (!products) return <div>Loading...</div>;
  return <div>{products.items.length} products</div>;
}
```

---

## 🎨 Real-World Examples

### E-commerce Product List

```typescript
import { getProducts, ItemsFilterParameters, SortType } from 'my-next-core';

export default async function Shop({ searchParams }) {
  const filters = new ItemsFilterParameters({
    sortType: searchParams.sort || SortType.Newest,
    name: searchParams.search || null,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : null,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : null,
    pagingParameters: {
      currentPage: searchParams.page ? Number(searchParams.page) : 1,
      pageSize: 12
    }
  });
  
  const { items, totalCount } = await getProducts({ filterParams: filters });
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Store Header

```typescript
import { getStoreInfo } from 'my-next-core';
import Image from 'next/image';

export default async function StoreHeader() {
  const store = await getStoreInfo();
  
  return (
    <header>
      {store.logoPath && (
        <Image src={store.logoPath} alt={store.name} width={200} height={60} />
      )}
      <h1>{store.name}</h1>
      <p>{store.description}</p>
      <address>
        {store.address.city.name}, {store.address.country.name}
      </address>
    </header>
  );
}
```

### Product Detail Page

```typescript
import { getProductInfo } from 'my-next-core';

export default async function ProductPage({ params }) {
  const product = await getProductInfo(params.id);
  
  return (
    <div>
      <img src={product.picturePath} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="price">${product.price}</p>
      <p>{product.description}</p>
      <button disabled={!product.isAvailable}>
        {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
```

---

## 🔄 Dynamic Filtering

```typescript
'use client';
import { useState, useEffect } from 'react';
import { getProducts, ItemsFilterParameters, SortType } from 'my-next-core';

export default function FilteredProducts() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(SortType.Newest);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  
  useEffect(() => {
    const filters = new ItemsFilterParameters({
      sortType: sortBy,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });
    
    getProducts({ filterParams: filters })
      .then(data => setProducts(data.items));
  }, [sortBy, priceRange]);
  
  return (
    <div>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value={SortType.Newest}>Newest</option>
        <option value={SortType.LowPrice}>Price: Low to High</option>
        <option value={SortType.HighPrice}>Price: High to Low</option>
      </select>
      
      <div>
        <input 
          type="range" 
          min="0" 
          max="1000"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
        />
      </div>
      
      <div className="products">
        {products.map(p => (
          <div key={p.id}>{p.name} - ${p.price}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📱 Mobile-Friendly Pagination

```typescript
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default async function PaginatedProducts({ searchParams }) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 20;
  
  const filters = new ItemsFilterParameters({
    pagingParameters: {
      currentPage,
      pageSize
    }
  });
  
  const { items, totalCount } = await getProducts({ filterParams: filters });
  const totalPages = Math.ceil(totalCount / pageSize);
  
  return (
    <div>
      <div className="products">{/* render items */}</div>
      
      <nav className="pagination">
        {currentPage > 1 && (
          <a href={`?page=${currentPage - 1}`}>Previous</a>
        )}
        
        <span>Page {currentPage} of {totalPages}</span>
        
        {currentPage < totalPages && (
          <a href={`?page=${currentPage + 1}`}>Next</a>
        )}
      </nav>
    </div>
  );
}
```

---

## 💡 Pro Tips

### 1. Type Safety
Always import types for better IntelliSense:
```typescript
import type { StoreInfo, Product } from 'my-next-core';
```

### 2. Error Handling
```typescript
try {
  const products = await getProducts({ filterParams: new ItemsFilterParameters() });
} catch (error) {
  console.error('Failed to fetch products:', error);
}
```

### 3. Loading States
```typescript
export default async function Products() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductList />
    </Suspense>
  );
}
```

### 4. Revalidation
```typescript
export const revalidate = 3600; // Revalidate every hour

export default async function Products() {
  const products = await getProducts({ filterParams: new ItemsFilterParameters() });
  // ...
}
```
