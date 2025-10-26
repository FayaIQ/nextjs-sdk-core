# Package Architecture - Modular Structure

## 📁 Proposed Structure

```
npm/
├── src/
│   ├── index.ts                          # Main entry point (exports everything)
│   │
│   ├── core/                             # Core utilities (shared across all modules)
│   │   ├── index.ts                      # Export all core utilities
│   │   ├── fetcher.ts                    # HTTP client with helpers
│   │   ├── config.ts                     # Base configuration
│   │   └── auth.ts                       # Authentication utilities
│   │
│   ├── types/                            # Shared type definitions
│   │   ├── index.ts                      # Export all types
│   │   ├── common.ts                     # Common types (Pagination, etc.)
│   │   ├── identity.ts                   # Identity service types
│   │   ├── inventory.ts                  # Inventory service types
│   │   ├── stores.ts                     # Stores service types
│   │   ├── gps.ts                        # GPS service types
│   │   └── theme.ts                      # Theme service types
│   │
│   ├── services/                         # Service modules (API clients)
│   │   ├── index.ts                      # Export all services
│   │   │
│   │   ├── identity/                     # Identity Service
│   │   │   ├── index.ts                  # Export identity APIs
│   │   │   ├── config.ts                 # Identity endpoints
│   │   │   ├── auth.ts                   # Login, logout, token refresh
│   │   │   ├── users.ts                  # User CRUD operations
│   │   │   └── verification.ts           # Phone/email verification
│   │   │
│   │   ├── inventory/                    # Inventory Service
│   │   │   ├── index.ts                  # Export inventory APIs
│   │   │   ├── config.ts                 # Inventory endpoints
│   │   │   ├── items.ts                  # Product/item operations
│   │   │   ├── orders.ts                 # Order operations
│   │   │   ├── order-items.ts            # Order item operations
│   │   │   ├── carts.ts                  # Cart operations
│   │   │   ├── menus.ts                  # Menu/category operations
│   │   │   ├── wishes.ts                 # Wishlist operations
│   │   │   └── sources.ts                # Brands/sources
│   │   │
│   │   ├── stores/                       # Stores Service
│   │   │   ├── index.ts                  # Export store APIs
│   │   │   ├── config.ts                 # Stores endpoints
│   │   │   ├── info.ts                   # Store information
│   │   │   └── branches.ts               # Branch operations
│   │   │h
│   │   ├── gps/                          # GPS Service
│   │   │   ├── index.ts                  # Export GPS APIs
│   │   │   ├── config.ts                 # GPS endpoints
│   │   │   ├── locations.ts              # Location operations
│   │   │   └── delivery-zones.ts         # Delivery zones
│   │   │
│   │   ├── theme/                        # Theme Service
│   │   │   ├── index.ts                  # Export theme APIs
│   │   │   ├── config.ts                 # Theme endpoints
│   │   │   └── slideshows.ts             # Slideshow operations
│   │   │
│   │   └── news/                         # News Service
│   │       ├── index.ts                  # Export news APIs
│   │       ├── config.ts                 # News endpoints
│   │       └── articles.ts               # News articles
│   │
│   ├── models/                           # Data models & filters
│   │   ├── index.ts                      # Export all models
│   │   ├── filter-models.ts              # Filtering classes
│   │   ├── pagination.ts                 # Pagination models
│   │   └── order-models.ts               # Order-specific models
│   │
│   └── handlers/                         # Next.js API route handlers
│       ├── index.ts                      # Export all handlers
│       │
│       ├── identity/
│       │   ├── login.ts
│       │   ├── logout.ts
│       │   └── refresh.ts
│       │
│       ├── inventory/
│       │   ├── products.ts
│       │   ├── product-info.ts
│       │   ├── orders.ts
│       │   └── cart.ts
│       │
│       └── stores/
│           └── store-info.ts
│
├── bin/
│   └── setup.js                          # CLI setup tool
│
└── package.json
```

## 🎯 Design Principles

### 1. **Service-Based Organization**
- Each microservice (Identity, Inventory, GPS, etc.) has its own folder
- Within each service, group by feature/resource (users, orders, items)

### 2. **Separation of Concerns**
- **Core**: Shared utilities (fetcher, auth, config)
- **Types**: Type definitions (organized by service)
- **Services**: API client functions (business logic)
- **Models**: Data models and filters
- **Handlers**: Next.js API route handlers

### 3. **Scalability**
- Easy to add new services (just create new folder)
- Easy to add new features (just create new file in service)
- No circular dependencies

### 4. **Developer Experience**
- Intuitive imports: `import { login, getUser } from 'my-next-core/services/identity'`
- Or: `import { getProducts } from 'my-next-core/services/inventory'`
- Or: `import { getStoreInfo } from 'my-next-core/services/stores'`

## 📦 Import Examples

### Option 1: Import from specific service
```typescript
// Identity operations
import { login, logout, getUser, updateUser } from 'my-next-core/services/identity';

// Inventory operations
import { getProducts, getProductInfo, createOrder } from 'my-next-core/services/inventory';

// Store operations
import { getStoreInfo, getBranches } from 'my-next-core/services/stores';

// GPS operations
import { getLocations, getDeliveryZones } from 'my-next-core/services/gps';
```

### Option 2: Import from main entry
```typescript
// Everything in one import
import { 
  // Identity
  login,
  logout,
  // Inventory
  getProducts,
  getProductInfo,
  // Stores
  getStoreInfo,
  // Types
  Product,
  Order,
  // Models
  ItemsFilterParameters,
} from 'my-next-core';
```

### Option 3: Import by category
```typescript
// Import entire service
import * as Identity from 'my-next-core/services/identity';
import * as Inventory from 'my-next-core/services/inventory';

await Identity.login(username, password);
const products = await Inventory.getProducts(filters);
```

## 🔧 Configuration Structure

### Core Config (`core/config.ts`)
```typescript
export const API_BASE_URLS = {
  identity: process.env.STOREAK_IDENTITY_URL || 'https://...',
  inventory: process.env.STOREAK_INVENTORY_URL || 'https://...',
  stores: process.env.STOREAK_STORES_URL || 'https://...',
  gps: process.env.STOREAK_GPS_URL || 'https://...',
  theme: process.env.STOREAK_THEME_URL || 'https://...',
  news: process.env.STOREAK_NEWS_URL || 'https://...',
};
```

### Service Config (`services/identity/config.ts`)
```typescript
import { API_BASE_URLS } from '../../core/config';

const BASE = `${API_BASE_URLS.identity}/v1`;

export const IDENTITY_ENDPOINTS = {
  token: `${BASE}/token`,
  refresh: `${BASE}/token/refresh`,
  logout: `${BASE}/session/logout`,
  users: `${BASE}/Users`,
  // ... more endpoints
};
```

## 📋 Migration Strategy

### Phase 1: Core Setup ✅
- [x] Create core utilities (fetcher, auth, config)
- [x] Create base types

### Phase 2: Service Migration (Priority Order)
1. **Identity Service** (most critical)
   - Login/logout
   - Token management
   - User operations

2. **Inventory Service** (most used)
   - Products/items
   - Orders
   - Cart

3. **Stores Service**
   - Store info
   - Branches

4. **GPS Service**
   - Locations
   - Delivery zones

5. **Theme & News Services**
   - Slideshows
   - Articles

### Phase 3: Handlers & Setup
- Update API route handlers
- Update setup CLI
- Update documentation

## 🚀 Benefits

1. **Maintainability**: Clear organization, easy to find code
2. **Scalability**: Easy to add new services/features
3. **Reusability**: Shared utilities, no duplication
4. **Type Safety**: Strong typing throughout
5. **Tree Shaking**: Import only what you need
6. **Testing**: Easy to test individual services
7. **Documentation**: Self-documenting structure

## 📖 File Naming Conventions

- **Services**: Plural nouns (users.ts, orders.ts, items.ts)
- **Types**: Singular nouns (user.ts, order.ts, product.ts)
- **Config**: Always config.ts
- **Handlers**: Match the service feature (login.ts, products.ts)
- **Models**: Descriptive names (filter-models.ts, pagination.ts)

## 🎯 Next Steps

Would you like me to implement this structure? I can:
1. Create the new folder structure
2. Migrate existing code to the new structure
3. Update all imports and exports
4. Update the setup CLI
5. Create comprehensive documentation
