// Main API functions - Works in both server and client components
export { getStoreInfo } from "./identity/application/storeInfo";
export { getProducts } from "./inventory/items/getProducts";
export { getProductInfo } from "./inventory/items/getProductInfo";
export { getMenus } from "./inventory/menus/getMenus";
export { getOrders } from "./inventory/orders/getOrders";
export { getBrands } from "./inventory/brands/getBrands";
export { putItemCollection } from "./inventory/items/putItemCollection";
export { putItemCollectionActivate } from "./inventory/items/putItemCollectionActivate";
export { putItemCollectionDeactivate } from "./inventory/items/putItemCollectionDeactivate";

// Type and model exports. `export *` keeps TypeScript type-only symbols type-only
// while avoiding the declaration-bundler parser failure triggered by standalone
// `export type { ... }` barrels in Git dependency prepare builds.
export * from "./types";
export * from "./inventory/items/filter-models";
export * from "./api/api";
export * from "./inventory/orders/order-models";
export * from "./core/config";

// Advanced exports for custom use cases
export { apiFetch } from "./core/fetcher";

export { default as getToken } from "./token";
export * from "./token";

// Firebase authentication (client-side only)
export * from "./firebase/auth";

// Firebase config
export { getPrimaryApp, getSecondaryApp, getFirebaseApp } from "./firebase/config";

// Cookie utilities (server-side only)
export {
  setEncryptedCookie,
  getEncryptedCookie,
  setPlainCookie,
  COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS,
} from "./utils/cookie";

// Re-export Edge-friendly encrypt helper so consumers can import it
export { encryptForCookie } from "./utils/crypto";

// Re-export CRM helpers (clients, delegate types, etc.)
export * from "./crm";
