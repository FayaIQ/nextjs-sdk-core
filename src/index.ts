// Main API functions - Works in both server and client components
export { getStoreInfo } from "./identity/application/storeInfo";
export { getProducts } from "./inventory/items/getProducts";
export { getProductInfo } from "./inventory/items/getProductInfo";
export { getMenus } from "./inventory/menus/getMenus";
export { getOrders } from "./inventory/orders/getOrders";
export { getBrands } from "./inventory/brands/getBrands";

// Type exports
export * from "./types";
export * from "./inventory/items/filter-models";
export * from "./api/api";
export * from "./inventory/orders/order-models";

// Configuration exports
export type { AuthConfig } from "./core/config";

// Advanced exports for custom use cases
export { apiFetch } from "./core/fetcher";

export { default as getToken } from "./token";
export type { TokenResponse } from "./token";

// Firebase authentication (client-side only)
export {
  startPhoneSignIn,
  getFirebaseIdToken,
  signOutFirebase,
  startAuthStateSync,
} from "./firebase/auth";
export type { StartPhoneSignInResult, WhatsAppOTPOptions } from "./firebase/auth";

// Firebase config
export { getPrimaryApp, getSecondaryApp, getFirebaseApp } from "./firebase/config";

// Cookie utilities (server-side only)
export {
  setEncryptedCookie,
  getEncryptedCookie,
  setPlainCookie,
  deleteCookie,
  COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS,
} from "./utils/cookie";

// Crypto utilities (server-side only)
export { encrypt, decrypt, validateEncryptionKey } from "./utils/crypto";

