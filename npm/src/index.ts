// Main API functions - Works in both server and client components
export { getStoreInfo } from "./storeInfo";
export { getProducts } from "./inventory/items/getProducts";
export { getProductInfo } from "./inventory/items/getProductInfo";

// Type exports
export * from "./types";
export * from "./filter-models";
export * from "./api/api";
export * from "./inventory/orders/order-models";
// Configuration exports
export type { AuthConfig } from "./core/config";

// Advanced exports for custom use cases
export { apiFetch } from "./core/fetcher";

export { default as getToken } from "./token";
export type { TokenResponse } from "./token";
