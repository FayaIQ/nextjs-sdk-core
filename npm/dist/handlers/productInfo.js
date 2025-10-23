"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/handlers/productInfo.ts
var productInfo_exports = {};
__export(productInfo_exports, {
  GET: () => GET
});
module.exports = __toCommonJS(productInfo_exports);
var import_server = require("next/server");

// src/fetcher.ts
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
    endpoint += `?${params.toString()}`;
  }
  const allHeaders = { ...headers };
  allHeaders["Authorization"] = `Bearer ${token}`;
  if (data && !(data instanceof FormData))
    allHeaders["Content-Type"] = "application/json";
  const res = await fetch(endpoint, {
    method,
    headers: allHeaders,
    body: data && !(data instanceof FormData) ? JSON.stringify(data) : data
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// src/token.ts
async function getToken() {
  const response = await fetch(
    `https://storeak-identity-service.azurewebsites.net/api/v1/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
        clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
        username: "athathak",
        password: "123456",
        Language: 0,
        GMT: 3,
        IsFromNotification: false
      })
    }
  );
  if (!response.ok) {
    throw new Error(`getToken failed: ${response.statusText}`);
  }
  const json = await response.json();
  if (!json.access_token) throw new Error("Token missing in response");
  return json.access_token;
}

// src/app/api/api.ts
var _Api = class _Api {
  // Dynamic endpoints with IDs
  static getProductInfo(id) {
    return `${_Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
  }
  // Wishlist endpoints (lowercase per spec)
  static postWish(id) {
    return `${_Api.INVENTORY_BASE}/v1/items/${id}/wish`;
  }
  static deleteWish(id) {
    return `${_Api.INVENTORY_BASE}/v1/items/${id}/unwish`;
  }
  static getCategoryProducts(id) {
    return `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile?CurrentPage=1&PageSize=1000&menuId=${id}`;
  }
  static getOrder(id) {
    return `${_Api.INVENTORY_BASE}/v3/Orders/${id}`;
  }
  static getInvoiceDiscount(code) {
    const clean = encodeURIComponent(code);
    return `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
  }
  static cancelOrder(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
  }
  static patchCartItem(id) {
    return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
  static deleteCartItem(id) {
    return `${_Api.INVENTORY_BASE}/v1/Carts/Items/${encodeURIComponent(
      String(id)
    )}`;
  }
};
_Api.LOCAL_BASE = "http://localhost:3000";
_Api.IDENTITY_BASE = `https://storeak-identity-service.azurewebsites.net/api`;
_Api.NEWS_BASE = `https://storeak-news-service.azurewebsites.net/api`;
_Api.STORES_BASE = `https://storeak-stores-service.azurewebsites.net/api`;
_Api.GPS_BASE = `https://storeak-gps-service.azurewebsites.net/api`;
_Api.THEME_BASE = `https://storeak-Theme-service.azurewebsites.net/api`;
_Api.INVENTORY_BASE = `https://storeak-inventory-service.azurewebsites.net/api`;
_Api.IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;
// Identity endpoints
_Api.signIn = `${_Api.IDENTITY_BASE}/v1/token`;
_Api.refreshToken = `${_Api.IDENTITY_BASE}/v1/token/refresh`;
_Api.sessionLogout = `${_Api.IDENTITY_BASE}/v1/session/logout`;
_Api.clearCart = `${_Api.INVENTORY_BASE}/v1/Carts/Clear`;
_Api.getUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.postUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.putUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.patchUserInfo = `${_Api.IDENTITY_BASE}/v1/Users`;
_Api.putUserAvatar = `${_Api.IDENTITY_BASE}/v1/Users/avatar`;
_Api.putUserPassword = `${_Api.IDENTITY_BASE}/v1/Users/password`;
_Api.getUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
_Api.putUserPreferences = `${_Api.IDENTITY_BASE}/v1/Users/preferences`;
_Api.phoneVerificationSend = `${_Api.IDENTITY_BASE}/v1/verification/phone/send`;
_Api.phoneVerificationVerify = `${_Api.IDENTITY_BASE}/v1/verification/phone/verify`;
// Other services
_Api.getProducts = `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile`;
_Api.getCategories = `${_Api.INVENTORY_BASE}/v1/Menus/Search/true`;
_Api.getBranches = `${_Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
_Api.getBrands = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
_Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
_Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
_Api.postOrders = `${_Api.INVENTORY_BASE}/v2/Orders`;
_Api.getCities = `${_Api.GPS_BASE}/v1/Locations`;
_Api.getDeliveryZones = `${_Api.GPS_BASE}/v1/DeliveryZones`;
_Api.getSlideShows = `${_Api.THEME_BASE}/v1/SlideShows/Paging`;
_Api.getCheckoutQuote = `${_Api.INVENTORY_BASE}/v1/Checkout/Quote`;
// Cart endpoints
_Api.getCurrentCart = `${_Api.INVENTORY_BASE}/v1/Carts/Current`;
_Api.postCartItems = `${_Api.INVENTORY_BASE}/v1/Carts/Items`;
var Api = _Api;

// src/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(`${Api.getProductInfo(id)}/`, {
      token
    });
  } else {
    return fetch(`/api/productInfo/${id}`).then((res) => {
      console.log("\u{1F539} Client fetch status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/handlers/productInfo.ts
async function GET(request, { params }) {
  try {
    const product = await getProductInfo(params.id);
    return import_server.NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product info:", error);
    return import_server.NextResponse.json(
      { error: "Failed to fetch product info" },
      { status: 500 }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET
});
