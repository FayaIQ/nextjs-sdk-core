# Implementation Guide - Modular Architecture

## 🎯 Step-by-Step Implementation

This guide will help you implement the modular architecture for the npm package.

---

## Phase 1: Core Foundation

### Step 1: Create Core Directory Structure

```bash
mkdir -p src/core
mkdir -p src/types
mkdir -p src/services/{identity,inventory,stores,gps,theme,news}
mkdir -p src/models
mkdir -p src/handlers/{identity,inventory,stores}
```

### Step 2: Move Core Files

**Core utilities:**
- `src/fetcher.ts` → `src/core/fetcher.ts`
- `src/token.ts` → `src/core/auth.ts` (rename)
- `src/config.ts` → `src/core/config.ts`

**Type definitions:**
- `src/types.ts` → `src/types/inventory.ts`
- Create new: `src/types/common.ts`, `src/types/identity.ts`, etc.

**Models:**
- `src/filter-models.ts` → `src/models/filter-models.ts`
- `src/order-models.ts` → `src/models/order-models.ts`

---

## Phase 2: Service Modules

### Identity Service Structure

```
services/identity/
├── index.ts              # Export all identity functions
├── config.ts             # Identity API endpoints
├── auth.ts               # login(), logout(), refresh()
├── users.ts              # getUser(), updateUser(), deleteUser()
└── verification.ts       # sendPhoneVerification(), verifyPhone()
```

**Example: `services/identity/auth.ts`**
```typescript
import { postWithoutAuth, postWithAuth } from '../../core/fetcher';
import { IDENTITY_ENDPOINTS } from './config';
import type { LoginResponse, TokenResponse } from '../../types/identity';

export async function login(username: string, password: string): Promise<LoginResponse> {
  return postWithoutAuth<LoginResponse>(IDENTITY_ENDPOINTS.token, {
    username,
    password,
    clientId: process.env.STOREAK_CLIENT_ID,
    clientSecret: process.env.STOREAK_CLIENT_SECRET,
  });
}

export async function logout(token: string): Promise<void> {
  await postWithAuth<void>(IDENTITY_ENDPOINTS.logout, token);
}

export async function refreshToken(refreshToken: string): Promise<TokenResponse> {
  return postWithoutAuth<TokenResponse>(IDENTITY_ENDPOINTS.refresh, {
    refreshToken,
  });
}
```

### Inventory Service Structure

```
services/inventory/
├── index.ts              # Export all inventory functions
├── config.ts             # Inventory API endpoints
├── items.ts              # getProducts(), getProductInfo()
├── orders.ts             # getOrders(), createOrder(), updateOrder()
├── order-items.ts        # Order item operations
├── carts.ts              # Cart operations
├── menus.ts              # Categories/menus
├── wishes.ts             # Wishlist operations
└── sources.ts            # Brands/sources
```

**Example: `services/inventory/items.ts`**
```typescript
import { getWithAuth } from '../../core/fetcher';
import { getToken } from '../../core/auth';
import { INVENTORY_ENDPOINTS } from './config';
import type { Product, ProductListResponse } from '../../types/inventory';
import type { ItemsFilterParameters } from '../../models/filter-models';

export async function getProducts(
  filterParams: ItemsFilterParameters
): Promise<ProductListResponse> {
  const token = await getToken();
  const params = filterParams.toURLSearchParams();
  
  return getWithAuth<ProductListResponse>(
    INVENTORY_ENDPOINTS.items,
    token,
    Object.fromEntries(params)
  );
}

export async function getProductInfo(id: string): Promise<Product> {
  const token = await getToken();
  return getWithAuth<Product>(
    INVENTORY_ENDPOINTS.itemInfo(id),
    token
  );
}
```

---

## Phase 3: Configuration Management

### Core Config (`src/core/config.ts`)

```typescript
/**
 * Centralized API base URLs configuration
 */
export const API_BASE_URLS = {
  identity: process.env.STOREAK_IDENTITY_URL || 
    'https://storeak-identity-service.azurewebsites.net/api',
  inventory: process.env.STOREAK_INVENTORY_URL || 
    'https://storeak-inventory-service.azurewebsites.net/api',
  stores: process.env.STOREAK_STORES_URL || 
    'https://storeak-stores-service.azurewebsites.net/api',
  gps: process.env.STOREAK_GPS_URL || 
    'https://storeak-gps-service.azurewebsites.net/api',
  theme: process.env.STOREAK_THEME_URL || 
    'https://storeak-Theme-service.azurewebsites.net/api',
  news: process.env.STOREAK_NEWS_URL || 
    'https://storeak-news-service.azurewebsites.net/api',
} as const;

/**
 * Authentication configuration
 */
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  language?: number;
  gmt?: number;
}

export function getAuthConfig(): AuthConfig {
  // Try environment variables first
  if (process.env.STOREAK_CLIENT_ID && 
      process.env.STOREAK_CLIENT_SECRET &&
      process.env.STOREAK_USERNAME && 
      process.env.STOREAK_PASSWORD) {
    return {
      clientId: process.env.STOREAK_CLIENT_ID,
      clientSecret: process.env.STOREAK_CLIENT_SECRET,
      username: process.env.STOREAK_USERNAME,
      password: process.env.STOREAK_PASSWORD,
      language: parseInt(process.env.STOREAK_LANGUAGE || '0'),
      gmt: parseInt(process.env.STOREAK_GMT || '3'),
    };
  }
  
  // Fallback defaults
  return {
    clientId: '610262c3-b8ff-40b5-8a8e-951eadbe7a31',
    clientSecret: 'UxiTJPZguIXBxVLjxGltrHvOdEqsjndG',
    username: 'athathak',
    password: '123456',
    language: 0,
    gmt: 3,
  };
}
```

### Service Config Example (`src/services/inventory/config.ts`)

```typescript
import { API_BASE_URLS } from '../../core/config';

const BASE = API_BASE_URLS.inventory;

export const INVENTORY_ENDPOINTS = {
  // Items
  items: `${BASE}/v1/Items/Paging/Mobile`,
  itemInfo: (id: string) => `${BASE}/v1/Items/${id}/FullInfo`,
  
  // Orders
  orders: `${BASE}/v1/Orders/Paging`,
  ordersV2: `${BASE}/v2/Orders`,
  orderInfo: (id: string) => `${BASE}/v1/Orders/${id}`,
  
  // Cart
  cart: `${BASE}/v1/Carts`,
  clearCart: `${BASE}/v1/Carts/Clear`,
  
  // Menus/Categories
  menus: `${BASE}/v1/Menus/Search/true`,
  
  // Wishes
  wishes: `${BASE}/v1/wishes/paging`,
  wish: (id: string | number) => `${BASE}/v1/items/${id}/wish`,
  unwish: (id: string | number) => `${BASE}/v1/items/${id}/unwish`,
  
  // Sources/Brands
  sources: `${BASE}/v1/StoreItemSources/Paging?isFeatured=True`,
} as const;
```

---

## Phase 4: Type Definitions

### Common Types (`src/types/common.ts`)

```typescript
/**
 * Shared types used across all services
 */

export interface PaginationParams {
  currentPage: number;
  pageSize: number;
  sortField?: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
}
```

### Service-Specific Types

Create type files for each service:
- `src/types/identity.ts` - User, LoginResponse, TokenResponse
- `src/types/inventory.ts` - Product, Order, Cart
- `src/types/stores.ts` - StoreInfo, Branch
- `src/types/gps.ts` - Location, DeliveryZone

---

## Phase 5: Main Index Exports

### Root Index (`src/index.ts`)

```typescript
// Core utilities
export * from './core/fetcher';
export { getToken, type AuthConfig } from './core/auth';
export { API_BASE_URLS } from './core/config';

// Types
export * from './types';

// Models
export * from './models';

// Services - Re-export everything
export * from './services/identity';
export * from './services/inventory';
export * from './services/stores';
export * from './services/gps';
export * from './services/theme';
export * from './services/news';

// Handlers (for Next.js API routes)
export * from './handlers';
```

### Service Index Example (`src/services/inventory/index.ts`)

```typescript
// Items
export * from './items';

// Orders
export * from './orders';
export * from './order-items';

// Cart
export * from './carts';

// Menus
export * from './menus';

// Wishes
export * from './wishes';

// Sources
export * from './sources';

// Config (for advanced users)
export { INVENTORY_ENDPOINTS } from './config';
```

---

## Phase 6: Package.json Exports

Update `package.json` to support modular imports:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./services/identity": {
      "types": "./dist/services/identity/index.d.ts",
      "import": "./dist/services/identity/index.mjs",
      "require": "./dist/services/identity/index.js"
    },
    "./services/inventory": {
      "types": "./dist/services/inventory/index.d.ts",
      "import": "./dist/services/inventory/index.mjs",
      "require": "./dist/services/inventory/index.js"
    },
    "./services/stores": {
      "types": "./dist/services/stores/index.d.ts",
      "import": "./dist/services/stores/index.mjs",
      "require": "./dist/services/stores/index.js"
    },
    "./core": {
      "types": "./dist/core/index.d.ts",
      "import": "./dist/core/index.mjs",
      "require": "./dist/core/index.js"
    },
    "./types": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/types/index.mjs",
      "require": "./dist/types/index.js"
    },
    "./models": {
      "types": "./dist/models/index.d.ts",
      "import": "./dist/models/index.mjs",
      "require": "./dist/models/index.js"
    }
  }
}
```

---

## Phase 7: Build Configuration

Update build script to handle nested structure:

```json
{
  "scripts": {
    "build": "tsup src/index.ts src/services/**/index.ts src/core/index.ts src/types/index.ts src/models/index.ts --format cjs,esm --dts --clean"
  }
}
```

---

## 🎯 Implementation Checklist

### Core Setup
- [ ] Create directory structure
- [ ] Move fetcher to core/
- [ ] Move token logic to core/auth.ts
- [ ] Create core/config.ts with API_BASE_URLS
- [ ] Create core/index.ts to export all core utilities

### Type Definitions
- [ ] Create types/common.ts
- [ ] Create types/identity.ts
- [ ] Create types/inventory.ts
- [ ] Create types/stores.ts
- [ ] Create types/gps.ts
- [ ] Create types/index.ts to export all types

### Models
- [ ] Move filter-models.ts to models/
- [ ] Move order-models.ts to models/
- [ ] Create models/index.ts

### Identity Service
- [ ] Create services/identity/config.ts
- [ ] Create services/identity/auth.ts
- [ ] Create services/identity/users.ts
- [ ] Create services/identity/verification.ts
- [ ] Create services/identity/index.ts

### Inventory Service
- [ ] Create services/inventory/config.ts
- [ ] Create services/inventory/items.ts
- [ ] Create services/inventory/orders.ts
- [ ] Create services/inventory/order-items.ts
- [ ] Create services/inventory/carts.ts
- [ ] Create services/inventory/menus.ts
- [ ] Create services/inventory/wishes.ts
- [ ] Create services/inventory/sources.ts
- [ ] Create services/inventory/index.ts

### Other Services
- [ ] Create stores service
- [ ] Create GPS service
- [ ] Create theme service
- [ ] Create news service

### Handlers
- [ ] Organize handlers by service
- [ ] Update handler imports
- [ ] Create handlers/index.ts

### Package Configuration
- [ ] Update package.json exports
- [ ] Update build script
- [ ] Update tsconfig paths

### Documentation
- [ ] Update README with new import examples
- [ ] Create migration guide
- [ ] Update API reference

### Testing
- [ ] Test build process
- [ ] Test imports from different paths
- [ ] Verify tree-shaking works
- [ ] Test in actual Next.js app

---

## 🚀 Quick Start Commands

```bash
# Create structure
npm run create:structure

# Migrate files
npm run migrate:files

# Build
npm run build

# Test
npm run test
```

---

This structure will make your package:
✅ Scalable - Easy to add new services
✅ Maintainable - Clear organization
✅ Type-safe - Full TypeScript support
✅ Tree-shakeable - Import only what you need
✅ Developer-friendly - Intuitive imports
