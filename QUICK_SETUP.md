# 🚀 Ultra-Simple Setup - One-Liner API Routes!

## The Problem (Before)

Users had to write boilerplate API routes:

```typescript
// ❌ Too much boilerplate!
import { NextRequest, NextResponse } from "next/server";
import { getProducts, ItemsFilterParameters } from "my-next-core";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

## The Solution (Now)

Just **ONE LINE**! Re-export our pre-built handler:

```typescript
// ✅ One line - done!
export { GET } from "my-next-core/handlers/getProducts";
```

---

## 📦 Setup Guide

### 1. Install Package

```bash
npm install my-next-core
```

### 2. Add Environment Variables

```env
# .env.local
STOREAK_USERNAME=your-username
STOREAK_PASSWORD=your-password
```

### 3. Create API Routes (One-Liners!)

#### Store Info Route
```typescript
// app/api/storeInfo/route.ts
export { GET } from "my-next-core/handlers/storeInfo";
```

#### Products Route
```typescript
// app/api/getProducts/route.ts
export { GET } from "my-next-core/handlers/getProducts";
```

#### Product Info Route
```typescript
// app/api/productInfo/[id]/route.ts
export { GET } from "my-next-core/handlers/productInfo";
```

**That's it!** No boilerplate, no error handling, no parsing - all handled for you!

---

## 💻 Usage Examples

### Server Component (No API Route Needed!)

```typescript
import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const store = await getStoreInfo(); // Direct call!
  return <h1>{store.name}</h1>;
}
```

### Client Component (Uses the One-Liner Route)

```typescript
'use client';
import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function Products() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    const filters = new ItemsFilterParameters();
    getProducts({ filterParams: filters }).then(setProducts);
  }, []);
  
  return <div>{products?.items.length} products</div>;
}
```

---

## 🎯 Complete Example

### File Structure
```
app/
├── page.tsx                    ← Your component
├── components/
│   └── Products.tsx           ← Client component
└── api/
    ├── storeInfo/
    │   └── route.ts           ← One line!
    ├── getProducts/
    │   └── route.ts           ← One line!
    └── productInfo/
        └── [id]/
            └── route.ts       ← One line!
```

### Complete Code

#### 1. API Routes (3 files, 3 lines total!)

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

#### 2. Server Component

```typescript
// app/page.tsx
import { getStoreInfo, getProducts, ItemsFilterParameters } from 'my-next-core';

export default async function Home() {
  const store = await getStoreInfo();
  const products = await getProducts({ 
    filterParams: new ItemsFilterParameters() 
  });
  
  return (
    <div>
      <h1>{store.name}</h1>
      <div>
        {products.items.map(p => (
          <div key={p.id}>{p.name} - ${p.price}</div>
        ))}
      </div>
    </div>
  );
}
```

#### 3. Client Component

```typescript
// app/components/Products.tsx
'use client';
import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function Products() {
  const [products, setProducts] = useState(null);
  
  useEffect(() => {
    getProducts({ filterParams: new ItemsFilterParameters() })
      .then(setProducts);
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

## ✨ Benefits

### ✅ Minimal Boilerplate
- **Before**: ~20 lines per route
- **After**: **1 line** per route!

### ✅ Built-in Features
- Error handling
- Type safety
- Request parsing
- Response formatting

### ✅ Consistent API
All handlers work the same way - just re-export!

### ✅ Easy Updates
When we update handlers, you get improvements automatically!

---

## 🔧 Advanced: Custom Routes

Need custom logic? You can still write your own:

```typescript
// app/api/custom/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProducts, ItemsFilterParameters } from "my-next-core";

export async function GET(request: NextRequest) {
  // Add custom logic here
  const filters = new ItemsFilterParameters({ minPrice: 50 });
  const products = await getProducts({ filterParams: filters });
  
  // Custom response
  return NextResponse.json({
    success: true,
    data: products,
    timestamp: new Date().toISOString()
  });
}
```

---

## 📚 All Available Handlers

| Handler | Import Path | Route File |
|---------|------------|------------|
| Store Info | `my-next-core/handlers/storeInfo` | `app/api/storeInfo/route.ts` |
| Products | `my-next-core/handlers/getProducts` | `app/api/getProducts/route.ts` |
| Product Info | `my-next-core/handlers/productInfo` | `app/api/productInfo/[id]/route.ts` |

---

## 🎉 Summary

### What You Do:
1. Install package
2. Add 3 one-liner route files
3. Use functions in your components

### What You Get:
- ✅ Full API functionality
- ✅ Server & client support
- ✅ Type safety
- ✅ Error handling
- ✅ Zero boilerplate!

**Total setup time: < 2 minutes!** 🚀
