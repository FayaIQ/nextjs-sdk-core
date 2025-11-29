"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/config.ts
var config_exports = {};
__export(config_exports, {
  getAuthConfig: () => getAuthConfig
});
var getEnvVar, getAuthConfig;
var init_config = __esm({
  "src/core/config.ts"() {
    "use strict";
    getEnvVar = (key, brand) => {
      if (typeof process === "undefined" || !process.env) return void 0;
      if (brand) {
        const brandKey = `${brand.toUpperCase()}_${key}`;
        if (process.env[brandKey]) return process.env[brandKey];
      }
      return process.env[key];
    };
    getAuthConfig = () => {
      if (typeof process !== "undefined" && process.env) {
        const brand2 = process.env.STOREAK_BRAND || process.env.BRAND;
        const envConfig = {
          clientId: getEnvVar("STOREAK_CLIENT_ID", brand2),
          clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand2),
          username: getEnvVar("STOREAK_USERNAME", brand2),
          password: getEnvVar("STOREAK_PASSWORD", brand2)
        };
        if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
          return {
            ...envConfig,
            language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand2) || "0"),
            gmt: parseInt(getEnvVar("STOREAK_GMT", brand2) || "3")
          };
        }
      }
      const brand = process.env?.STOREAK_BRAND || process.env?.BRAND;
      const prefix = brand ? `${brand.toUpperCase()}_` : "";
      const missing = [];
      const required = [
        `${prefix}STOREAK_CLIENT_ID`,
        `${prefix}STOREAK_CLIENT_SECRET`
      ];
      required.forEach((name) => {
        if (!process.env?.[name]) missing.push(name);
      });
      if (missing.length > 0) {
        const hint = brand ? ` (for brand: ${brand}. Set ${prefix}* variables or use standard STOREAK_* variables)` : "";
        throw new Error(
          `Missing required environment variables for authentication: ${missing.join(", ")}${hint}`
        );
      }
      return {
        clientId: getEnvVar("STOREAK_CLIENT_ID", brand),
        clientSecret: getEnvVar("STOREAK_CLIENT_SECRET", brand),
        username: getEnvVar("STOREAK_USERNAME", brand),
        password: getEnvVar("STOREAK_PASSWORD", brand),
        language: parseInt(getEnvVar("STOREAK_LANGUAGE", brand) || "0"),
        gmt: parseInt(getEnvVar("STOREAK_GMT", brand) || "3")
      };
    };
  }
});

// src/api/api.ts
var api_exports = {};
__export(api_exports, {
  Api: () => Api
});
var _Api, Api;
var init_api = __esm({
  "src/api/api.ts"() {
    "use strict";
    _Api = class _Api {
      static getProductInfo(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/FullInfo`;
      }
      static getProductInfoV2(id) {
        return `${_Api.INVENTORY_BASE}/v2/Items/${id}/FullInfo`;
      }
      static getMenuById(id) {
        return `${_Api.INVENTORY_BASE}/v1/Menus/${id}`;
      }
      static getOfferById(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}`;
      }
      static deleteOffer(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}`;
      }
      static getStoreInvoiceDiscount(storeId, coupon) {
        return `${_Api.STORES_BASE}/v1/Stores/${storeId}/Offers/InvoiceDiscount/${encodeURIComponent(
          String(coupon)
        )}`;
      }
      static getDeliveryZoneDiscount(deliveryZoneId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/DeliveryZoneDiscount/${deliveryZoneId}`;
      }
      static postOffersAddItemsByFilter(offerId, forceUpdate) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/AddItemsByFilter/${encodeURIComponent(
          String(forceUpdate)
        )}`;
      }
      static postOffersDeliveryZones(offerId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/DeliveryZones`;
      }
      static getOffersGroups(offerId) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups`;
      }
      static putOffersGroup(offerId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
      }
      static deleteOffersGroup(offerId, id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${offerId}/OfferGroups/${id}`;
      }
      static putOffersCustomerDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/CustomerDiscount`;
      }
      static putOffersExtraItemDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ExtraItemDiscount`;
      }
      static putOffersInvoiceDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/InvoiceDiscount`;
      }
      static putOffersItemsDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount`;
      }
      static putOffersItemsDiscountCustomers(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemsDiscount/Customers`;
      }
      static putOffersShippingDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ShippingDiscount`;
      }
      static putOffersPointDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/PointDiscount`;
      }
      static putOffersItemCollectionDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/ItemCollectionDiscount`;
      }
      static putOffersMultiCouponDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/MultiCouponDiscount`;
      }
      static putOffersDarkDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Offers/${id}/DarkDiscount`;
      }
      static putOrderPayment(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Payment`;
      }
      static putOrderPaymentStatus(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Payment/Status`;
      }
      // Payments endpoints
      static getStorePayments(storeId) {
        return `${_Api.INVENTORY_BASE}/v1/Stores/${storeId}/Payments`;
      }
      static getPayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static putPayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static deletePayment(id) {
        return `${_Api.INVENTORY_BASE}/v1/Payments/${id}`;
      }
      static getItemById(id) {
        return `${_Api.INVENTORY_BASE}/v3/Items/${id}`;
      }
      // Dynamic endpoints with IDs
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
      static getAddress(id) {
        return `${_Api.GPS_BASE}/v1/Addresses/${id}`;
      }
      // Order item endpoints (v3)
      static getOrderItem(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Items/${itemId}`;
      }
      static postOrderItem(orderId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems`;
      }
      static putOrderItemCancel(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/cancel`;
      }
      static putOrderItemUndoCancel(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/UndoCancel`;
      }
      static putOrderItemUpdate(orderId, itemId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/OrderItems/${itemId}/update`;
      }
      static putOrderApprove(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ApproveDeliveryOrder`;
      }
      static putOrderDisapprove(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/DisapproveDeliveryOrder`;
      }
      static putChangeStatusOrder(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ChangeDeliveryOrderStatus`;
      }
      static cancelOrder(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Cancel`;
      }
      static getOrdersDelagates(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
      }
      static postOrdersDelagates(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates`;
      }
      static putOrdersDelagatesLoggedIn(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Delagates/LoggedInUser`;
      }
      static deleteDelagate(orderId, delegateId) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${orderId}/Delagates/${delegateId}`;
      }
      static putOrderDiscount(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/Discount`;
      }
      static putOrderReferenceId(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceId`;
      }
      static putOrderReferenceDeliveryId(id) {
        return `${_Api.INVENTORY_BASE}/v1/Orders/${id}/ReferenceDeliveryId`;
      }
      // Item activation endpoints
      static putItemActivate(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/Activate`;
      }
      static putItemDeactivate(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}/Deactivate`;
      }
      // Item update endpoint
      static putItem(id) {
        return `${_Api.INVENTORY_BASE}/v3/Items/${id}`;
      }
      static deleteItem(id) {
        return `${_Api.INVENTORY_BASE}/v1/Items/${id}`;
      }
      static getLocationChildren(parentId) {
        return `${_Api.GPS_BASE}/v1/Locations/${parentId}/Children/Dropdown`;
      }
      //
      static getInvoiceDiscount(code) {
        const clean = encodeURIComponent(code);
        return `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount/${clean}`;
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
    _Api.CRM_BASE = `https://storeak-crm-service.azurewebsites.net/api`;
    _Api.IDENTITY_URL = `https://storeak-identity-service.azurewebsites.net/api`;
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
    // stores
    _Api.getStores = `${_Api.STORES_BASE}/v1/Stores/Dropdown`;
    // Other services
    _Api.getProducts = `${_Api.INVENTORY_BASE}/v1/Items/Paging/Mobile`;
    _Api.getItemsPaging = `${_Api.INVENTORY_BASE}/v2/Items/Paging`;
    _Api.getMenus = `${_Api.INVENTORY_BASE}/v1/Menus/Search/true`;
    _Api.getMenusDropdown = `${_Api.INVENTORY_BASE}/v1/Menus/Dropdown`;
    // Offers endpoints
    _Api.getOffersPaging = `${_Api.INVENTORY_BASE}/v1/Offers/Paging`;
    _Api.getOffersCustomerItemLoggedIn = `${_Api.INVENTORY_BASE}/v1/Offers/CustomerItem/LoggedIn`;
    _Api.getOffersItemsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Items/DropDown`;
    _Api.getOffersSlideShowsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/SlideShows/DropDown`;
    _Api.getOffersItemsStores = `${_Api.INVENTORY_BASE}/v1/Offers/Items/Stores`;
    _Api.getOffersPointsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Points/DropDown`;
    _Api.getOffersNewsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/News/DropDown`;
    _Api.getOffersCouponsDropdown = `${_Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
    _Api.postOffersItemsDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount`;
    _Api.postOffersItemsDiscountCustomers = `${_Api.INVENTORY_BASE}/v1/Offers/ItemsDiscount/Customers`;
    _Api.postOffersExtraItemDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ExtraItemDiscount`;
    _Api.postOffersCustomerDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/CustomerDiscount`;
    _Api.postOffersInvoiceDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/InvoiceDiscount`;
    _Api.postOffersMultiCouponDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/MultiCouponDiscount`;
    _Api.postOffersShippingDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ShippingDiscount`;
    _Api.postOffersPointDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/PointDiscount`;
    _Api.postOffersItemCollectionDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/ItemCollectionDiscount`;
    _Api.postOffersDarkDiscount = `${_Api.INVENTORY_BASE}/v1/Offers/DarkDiscount`;
    _Api.getOffersCustomers = `${_Api.INVENTORY_BASE}/v1/Offers/Customers`;
    _Api.getCouponOffers = `${_Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
    _Api.getBranches = `${_Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
    _Api.getBrands = `${_Api.STORES_BASE}/api/v1/Complex/MenuBrand`;
    _Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
    _Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
    // CRM - Clients
    _Api.getClientsPaging = `${_Api.CRM_BASE}/v1/Clients/Paging`;
    _Api.getClients = `${_Api.CRM_BASE}/v1/Clients`;
    _Api.postClients = `${_Api.CRM_BASE}/v1/Clients`;
    _Api.postOrders = `${_Api.INVENTORY_BASE}/v2/Orders`;
    _Api.getStoreInfo = `${_Api.STORES_BASE}/v1/Stores/Info`;
    _Api.getCities = `${_Api.GPS_BASE}/v1/Locations`;
    _Api.getDeliveryZones = `${_Api.GPS_BASE}/v1/DeliveryZones`;
    _Api.getReportsCustomerOrders = `${_Api.INVENTORY_BASE}/v1/Reports/CustomerOrders`;
    _Api.getReportsOrderSales = `${_Api.INVENTORY_BASE}/v1/Reports/OrderSales`;
    _Api.postPayments = `${_Api.INVENTORY_BASE}/v1/Payments`;
    _Api.getPayments = `${_Api.INVENTORY_BASE}/v1/Payments`;
    _Api.getPaymentsReport = `${_Api.INVENTORY_BASE}/v1/Payments/Report`;
    _Api.getSlideShows = `${_Api.THEME_BASE}/v1/SlideShows/Paging`;
    // orders endpoints
    _Api.getOrderFullInfo = `${_Api.INVENTORY_BASE}/v1/Orders/List/FullInfo`;
    _Api.putOrderApproveList = `${_Api.INVENTORY_BASE}/v1/Orders/ApproveDeliveryOrder/List`;
    _Api.putOrderDisapproveList = `${_Api.INVENTORY_BASE}/v1/Orders/DisapproveDeliveryOrder/List`;
    _Api.postOrderDelagatesList = `${_Api.INVENTORY_BASE}/v1/Orders/Delagates/List`;
    // category
    _Api.getCatigories = `${_Api.INVENTORY_BASE}/v1/Categories/Dropdown`;
    // identity
    _Api.getApplicationsStores = `${_Api.IDENTITY_BASE}/v1/Applications/Store/DropDown`;
    _Api.getCustomersDropdown = `${_Api.IDENTITY_BASE}/v1/Users/Customers/DropDown`;
    _Api.getItemsSource = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Dropdown`;
    /////////////////////////////////////////
    //GPS
    _Api.getCountries = `${_Api.GPS_BASE}/v1/Locations/Countries/Dropdown`;
    _Api.getParentProducts = `${_Api.INVENTORY_BASE}/v1/Items/ParentStore/Paging`;
    // Items copy endpoints
    _Api.postCopyParentStore = `${_Api.INVENTORY_BASE}/v1/Items/Copy/ParentStore`;
    _Api.getCheckoutQuote = `${_Api.INVENTORY_BASE}/v1/Checkout/Quote`;
    // Cart endpoints
    _Api.getCurrentCart = `${_Api.INVENTORY_BASE}/v1/Carts/Current`;
    _Api.postCartItems = `${_Api.INVENTORY_BASE}/v1/Carts/Items`;
    Api = _Api;
  }
});

// src/token.ts
async function getToken() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    const err = new Error("Unauthorized: Access token missing (strict mode enabled)");
    err.status = 401;
    throw err;
  }
  try {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookie = await cookies();
      const accessTokenCookie = cookie.get("access_token")?.value;
      if (accessTokenCookie) return accessTokenCookie;
    }
  } catch (e) {
  }
  const { getAuthConfig: getAuthConfig2 } = await Promise.resolve().then(() => (init_config(), config_exports));
  const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
  const authConfig = getAuthConfig2();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  const response = await fetch(Api2.signIn, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  if (!response.ok) {
    throw new Error(
      `Authentication failed: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Token missing in authentication response");
  }
  return data.access_token;
}
var AUTH_MODE;
var init_token = __esm({
  "src/token.ts"() {
    "use strict";
    AUTH_MODE = process.env.AUTH_MODE || "auto";
  }
});

// src/core/fetcher.ts
var fetcher_exports = {};
__export(fetcher_exports, {
  ApiError: () => ApiError,
  apiFetch: () => apiFetch,
  deleteWithAuth: () => deleteWithAuth,
  deleteWithoutAuth: () => deleteWithoutAuth,
  getWithAuth: () => getWithAuth,
  getWithoutAuth: () => getWithoutAuth,
  patchWithAuth: () => patchWithAuth,
  patchWithoutAuth: () => patchWithoutAuth,
  postWithAuth: () => postWithAuth,
  postWithoutAuth: () => postWithoutAuth,
  putWithAuth: () => putWithAuth,
  putWithoutAuth: () => putWithoutAuth
});
function findMessageInError(obj, depth = 0, seen = /* @__PURE__ */ new WeakSet()) {
  if (obj == null || depth > 6) return null;
  if (typeof obj === "string") {
    const s = obj.trim();
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        return findMessageInError(parsed, depth + 1, seen) || obj;
      } catch {
        return obj;
      }
    }
    return obj;
  }
  if (typeof obj !== "object") return null;
  if (seen.has(obj)) return null;
  seen.add(obj);
  if (typeof obj.message === "string" && obj.message) return obj.message;
  if (typeof obj.code === "string" && obj.code) return obj.code;
  if (typeof obj.error === "string" && obj.error) return obj.error;
  const keysToCheck = ["message", "code", "error", "body", "data", "response", "errors"];
  for (const k of keysToCheck) {
    if (k in obj) {
      const v = obj[k];
      const found = findMessageInError(v, depth + 1, seen);
      if (found) return found;
    }
  }
  for (const k of Object.keys(obj)) {
    try {
      const found = findMessageInError(obj[k], depth + 1, seen);
      if (found) return found;
    } catch {
    }
  }
  return null;
}
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }
  const requestHeaders = { ...headers };
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (data && !(data instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }
  let body;
  if (data) {
    body = data instanceof FormData ? data : JSON.stringify(data);
  }
  const response = await fetch(endpoint, {
    method,
    headers: requestHeaders,
    body
  });
  if (!response.ok) {
    try {
      const text2 = await response.text();
      if (text2 && text2.trim()) {
        let errorData;
        try {
          errorData = JSON.parse(text2);
        } catch {
          errorData = text2;
        }
        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
            }
          }
        }
        const derivedMessage = findMessageInError(errorData) || (typeof errorData === "string" ? errorData : response.statusText);
        throw new ApiError(response.status, errorData, derivedMessage);
      }
      throw new ApiError(response.status, null, `Request failed with status ${response.status} ${response.statusText}`);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(response.status, null, `Request failed with status ${response.status} ${response.statusText}`);
    }
  }
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || !contentType && response.status === 200) {
    return {};
  }
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {};
  }
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    throw new Error(`Failed to parse response as JSON: ${text.substring(0, 100)}`);
  }
}
async function getWithAuth(url, query, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "GET",
    token,
    query,
    headers
  });
}
async function getWithoutAuth(url, query, headers) {
  return apiFetch(url, {
    method: "GET",
    query,
    headers
  });
}
async function postWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "POST",
    token,
    data,
    headers
  });
}
async function postWithoutAuth(url, data, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: data ? JSON.stringify(data) : void 0
  });
  if (!response.ok) {
    try {
      const text2 = await response.text();
      if (text2 && text2.trim()) {
        let errorData;
        try {
          errorData = JSON.parse(text2);
        } catch {
          errorData = text2;
        }
        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
            }
          }
        }
        const derivedMessage = findMessageInError(errorData) || (typeof errorData === "string" ? errorData : response.statusText);
        throw new ApiError(response.status, errorData, derivedMessage);
      }
      throw new ApiError(response.status, null, `POST request failed: ${response.status} ${response.statusText}`);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(response.status, null, `POST request failed: ${response.status} ${response.statusText}`);
    }
  }
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0") {
    return {};
  }
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {};
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse response as JSON: ${text.substring(0, 100)}`);
  }
}
async function putWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "PUT",
    token,
    data,
    headers
  });
}
async function putWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PUT",
    data,
    headers
  });
}
async function deleteWithAuth(url, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "DELETE",
    token,
    headers
  });
}
async function deleteWithoutAuth(url, headers) {
  return apiFetch(url, {
    method: "DELETE",
    headers
  });
}
async function patchWithAuth(url, data, headers) {
  let token = null;
  try {
    token = await getToken();
  } catch (err) {
    if (err && (err.status === 401 || /unauthor/i.test(String(err.message || err)))) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
  return apiFetch(url, {
    method: "PATCH",
    token,
    data,
    headers
  });
}
async function patchWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PATCH",
    data,
    headers
  });
}
var ApiError;
var init_fetcher = __esm({
  "src/core/fetcher.ts"() {
    "use strict";
    init_token();
    ApiError = class _ApiError extends Error {
      constructor(status, body, message) {
        super(message || `Request failed with status ${status}`);
        this.status = status;
        this.body = body;
        Object.setPrototypeOf(this, _ApiError.prototype);
      }
    };
  }
});

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  deleteWithAuth: () => deleteWithAuth,
  deleteWithoutAuth: () => deleteWithoutAuth,
  getWithAuth: () => getWithAuth,
  getWithoutAuth: () => getWithoutAuth,
  patchWithAuth: () => patchWithAuth,
  patchWithoutAuth: () => patchWithoutAuth,
  postWithAuth: () => postWithAuth,
  postWithoutAuth: () => postWithoutAuth,
  putWithAuth: () => putWithAuth,
  putWithoutAuth: () => putWithoutAuth
});
var init_core = __esm({
  "src/core/index.ts"() {
    "use strict";
    init_fetcher();
  }
});

// src/inventory/offers/index.ts
var offers_exports = {};
__export(offers_exports, {
  DeleteOfferDELETE: () => DELETE,
  DeleteOffersGroupDELETE: () => DELETE2,
  GetCouponsGET: () => GET2,
  GetInvoiceDiscountGET: () => GET4,
  GetOfferByIdGET: () => GET3,
  GetOffersCouponsDropdownGET: () => GET6,
  GetOffersCustomersGET: () => GET7,
  GetOffersGroupsGET: () => GET8,
  GetOffersItemsDropdownGET: () => GET5,
  GetOffersPagingGET: () => GET,
  OfferPagingParameters: () => OfferPagingParameters,
  OffersFilterParameters: () => OffersFilterParameters,
  PostOffersAddItemsByFilterPOST: () => POST5,
  PostOffersCustomerDiscountPOST: () => POST2,
  PostOffersDeliveryZonesPOST: () => POST6,
  PostOffersInvoiceDiscountPOST: () => POST3,
  PostOffersItemsDiscountPOST: () => POST,
  PostOffersShippingDiscountPOST: () => POST4,
  PutOffersCustomerDiscountPUT: () => PUT3,
  PutOffersExtraItemDiscountPUT: () => PUT4,
  PutOffersGroupPUT: () => PUT2,
  PutOffersInvoiceDiscountPUT: () => PUT5,
  PutOffersItemsDiscountCustomersPUT: () => PUT6,
  PutOffersItemsDiscountPUT: () => PUT,
  PutOffersShippingDiscountPUT: () => PUT7,
  deleteOffer: () => deleteOffer,
  deleteOffersGroup: () => deleteOffersGroup,
  getCoupons: () => getCoupons,
  getInvoiceDiscount: () => getInvoiceDiscount,
  getOfferById: () => getOfferById,
  getOffersCouponsDropdown: () => getOffersCouponsDropdown,
  getOffersCustomers: () => getOffersCustomers,
  getOffersGroups: () => getOffersGroups,
  getOffersItemsDropdown: () => getOffersItemsDropdown,
  getOffersPaging: () => getOffersPaging,
  offerTypes: () => offerTypes,
  postOffersAddItemsByFilter: () => postOffersAddItemsByFilter,
  postOffersCustomerDiscount: () => postOffersCustomerDiscount,
  postOffersDeliveryZones: () => postOffersDeliveryZones,
  postOffersInvoiceDiscount: () => postOffersInvoiceDiscount,
  postOffersItemsDiscount: () => postOffersItemsDiscount,
  postOffersShippingDiscount: () => postOffersShippingDiscount,
  putOffersCustomerDiscount: () => putOffersCustomerDiscount,
  putOffersExtraItemDiscount: () => putOffersExtraItemDiscount,
  putOffersGroup: () => putOffersGroup,
  putOffersInvoiceDiscount: () => putOffersInvoiceDiscount,
  putOffersItemsDiscount: () => putOffersItemsDiscount,
  putOffersItemsDiscountCustomers: () => putOffersItemsDiscountCustomers,
  putOffersShippingDiscount: () => putOffersShippingDiscount
});
module.exports = __toCommonJS(offers_exports);

// src/inventory/offers/getOffersPaging.ts
async function getOffersPaging(query) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOffersPaging, query);
  }
  const qs = query ? new URLSearchParams(query).toString() : "";
  const res = await fetch(`/api/offers/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch offers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOfferById.ts
async function getOfferById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOfferById(id));
  }
  const res = await fetch(`/api/offers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch offer ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/deleteOffer.ts
async function deleteOffer(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth: deleteWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return deleteWithAuth2(Api2.deleteOffer(id));
  }
  const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/getInvoiceDiscount.ts
async function getInvoiceDiscount(coupon) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getInvoiceDiscount(coupon));
  }
  const res = await fetch(
    `/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`
  );
  if (!res.ok)
    throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersItemsDropdown.ts
async function getOffersItemsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOffersItemsDropdown);
  }
  const res = await fetch(`/api/offers/items/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers items dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCouponsDropdown.ts
async function getOffersCouponsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOffersCouponsDropdown);
  }
  const res = await fetch(`/api/offers/coupons/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers coupons dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersItemsDiscount.ts
async function postOffersItemsDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersItemsDiscount, payload);
  }
  const res = await fetch(`/api/offers/items-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/putOffersItemsDiscount.ts
async function putOffersItemsDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersItemsDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/getOffersCustomers.ts
async function getOffersCustomers() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOffersCustomers);
  }
  const res = await fetch(`/api/offers/customers`);
  if (!res.ok) throw new Error(`Failed to fetch offers customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersCustomerDiscount.ts
async function postOffersCustomerDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersCustomerDiscount, payload);
  }
  const res = await fetch(`/api/offers/customer-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/postOffersInvoiceDiscount.ts
async function postOffersInvoiceDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersInvoiceDiscount, payload);
  }
  const res = await fetch(`/api/offers/invoice-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/postOffersShippingDiscount.ts
async function postOffersShippingDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersShippingDiscount, payload);
  }
  const res = await fetch(`/api/offers/shipping-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/postOffersAddItemsByFilter.ts
async function postOffersAddItemsByFilter(offerId, forceUpdate, payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersAddItemsByFilter(offerId, forceUpdate), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/add-items-by-filter/${String(forceUpdate)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/getCoupons.ts
async function getCoupons() {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_core(), core_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getCouponOffers);
  }
  const response = await fetch(`/api/offers/coupons`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/offers/postOffersDeliveryZones.ts
async function postOffersDeliveryZones(offerId, payload) {
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.postOffersDeliveryZones(offerId), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/delivery-zones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/getOffersGroups.ts
async function getOffersGroups(offerId) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(Api2.getOffersGroups(offerId));
  }
  const res = await fetch(`/api/offers/${offerId}/offer-groups`);
  if (!res.ok) throw new Error(`Failed to fetch offer groups: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersGroup.ts
async function putOffersGroup(offerId, id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersGroup(offerId, id), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/deleteOffersGroup.ts
async function deleteOffersGroup(offerId, id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth: deleteWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return deleteWithAuth2(Api2.deleteOffersGroup(offerId, id));
  }
  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/putOffersCustomerDiscount.ts
async function putOffersCustomerDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersCustomerDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/customer-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/putOffersExtraItemDiscount.ts
async function putOffersExtraItemDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersExtraItemDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/extra-item-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/putOffersInvoiceDiscount.ts
async function putOffersInvoiceDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersInvoiceDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/invoice-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/putOffersItemsDiscountCustomers.ts
async function putOffersItemsDiscountCustomers(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersItemsDiscountCustomers(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount/customers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put items discount customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersShippingDiscount.ts
async function putOffersShippingDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(Api2.putOffersShippingDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/shipping-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/offer-model.ts
var offerTypes = /* @__PURE__ */ ((offerTypes2) => {
  offerTypes2[offerTypes2["ItemsDiscount"] = 0] = "ItemsDiscount";
  offerTypes2[offerTypes2["InvoiceDiscount"] = 1] = "InvoiceDiscount";
  offerTypes2[offerTypes2["ExtraItemDiscount"] = 2] = "ExtraItemDiscount";
  offerTypes2[offerTypes2["ShippingDiscount"] = 3] = "ShippingDiscount";
  offerTypes2[offerTypes2["CustomerDiscount"] = 4] = "CustomerDiscount";
  offerTypes2[offerTypes2["CustomerItemsDiscount"] = 5] = "CustomerItemsDiscount";
  return offerTypes2;
})(offerTypes || {});
var OfferPagingParameters = class {
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null,
    currentSortField = null,
    currentSortOrder = null
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.currentSortField = currentSortField;
    this.currentSortOrder = currentSortOrder;
  }
  toURLParams() {
    const params = {
      CurrentPage: this.currentPage.toString(),
      PageSize: this.pageSize.toString()
    };
    if (this.sortField) params.SortField = this.sortField;
    if (this.currentSortField) params.CurrentSortField = this.currentSortField;
    if (this.currentSortOrder) params.CurrentSortOrder = this.currentSortOrder;
    return params;
  }
};
var OffersFilterParameters = class _OffersFilterParameters {
  constructor({
    pagingParameters = new OfferPagingParameters(),
    Name = null,
    Start = null,
    End = null,
    DiscountType = null,
    IsActive = null,
    HasCouponCode = null,
    OfferFilterType = null,
    ItemId = null,
    Barcode = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.Name = Name;
    this.Start = Start;
    this.End = End;
    this.DiscountType = DiscountType;
    this.IsActive = IsActive;
    this.HasCouponCode = HasCouponCode;
    this.OfferFilterType = OfferFilterType;
    this.ItemId = ItemId;
    this.Barcode = Barcode;
  }
  toURLSearchParams() {
    const params = new URLSearchParams();
    const paging = this.pagingParameters.toURLParams();
    Object.entries(paging).forEach(([k, v]) => params.set(k, v));
    if (this.Name !== null) params.set("Name", this.Name);
    if (this.Start !== null) params.set("Start", this.Start);
    if (this.End !== null) params.set("End", this.End);
    if (this.DiscountType !== null) params.set("DiscountType", String(this.DiscountType));
    if (this.IsActive !== null) params.set("IsActive", String(this.IsActive));
    if (this.HasCouponCode !== null) params.set("HasCouponCode", String(this.HasCouponCode));
    if (this.OfferFilterType !== null) params.set("OfferFilterType", String(this.OfferFilterType));
    if (this.ItemId !== null) params.set("ItemId", String(this.ItemId));
    if (this.Barcode !== null) params.set("Barcode", this.Barcode);
    return params;
  }
  toMap() {
    const map = {};
    Object.assign(map, this.pagingParameters.toURLParams());
    if (this.Name !== null) map.Name = this.Name;
    if (this.Start !== null) map.Start = this.Start;
    if (this.End !== null) map.End = this.End;
    if (this.DiscountType !== null) map.DiscountType = this.DiscountType;
    if (this.IsActive !== null) map.IsActive = this.IsActive;
    if (this.HasCouponCode !== null) map.HasCouponCode = this.HasCouponCode;
    if (this.OfferFilterType !== null) map.OfferFilterType = this.OfferFilterType;
    if (this.ItemId !== null) map.ItemId = this.ItemId;
    if (this.Barcode !== null) map.Barcode = this.Barcode;
    return map;
  }
  static fromURLSearchParams(params) {
    const paging = new OfferPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null
    });
    return new _OffersFilterParameters({
      pagingParameters: paging,
      Name: params.get("Name") || null,
      Start: params.get("Start") || null,
      End: params.get("End") || null,
      DiscountType: params.get("DiscountType") ? parseInt(params.get("DiscountType")) : null,
      IsActive: params.get("IsActive") ? params.get("IsActive") === "true" : null,
      HasCouponCode: params.get("HasCouponCode") ? params.get("HasCouponCode") === "true" : null,
      OfferFilterType: params.get("OfferFilterType") ? parseInt(params.get("OfferFilterType")) : null,
      ItemId: params.get("ItemId") ? parseInt(params.get("ItemId")) : null,
      Barcode: params.get("Barcode") || null
    });
  }
};

// src/inventory/offers/handler/getOffersPaging.ts
var import_server2 = require("next/server");

// src/core/errorResponse.ts
var import_server = require("next/server");
init_fetcher();
function toNextResponseFromError(err) {
  if (err instanceof ApiError) {
    const body = err.body ?? { message: err.message };
    const status = err.status && typeof err.status === "number" ? err.status : 500;
    return import_server.NextResponse.json(body, { status });
  }
  if (err instanceof Error) {
    return import_server.NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
  try {
    return import_server.NextResponse.json(err, { status: 500 });
  } catch {
    return import_server.NextResponse.json({ message: String(err) }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersPaging.ts
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return import_server2.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/coupons.ts
var import_server3 = require("next/server");
async function GET2(request) {
  try {
    const Coupons = await getCoupons();
    return import_server3.NextResponse.json(Coupons);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

// src/inventory/offers/handler/getOfferById.ts
var import_server4 = require("next/server");
async function GET3(request, { params }) {
  try {
    const result = await getOfferById((await params).id);
    return import_server4.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/deleteOffer.ts
async function DELETE(request, { params }) {
  try {
    const result = await deleteOffer((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/getInvoiceDiscount.ts
var import_server5 = require("next/server");
async function GET4(request, { params }) {
  try {
    const result = await getInvoiceDiscount((await params).coupon);
    return import_server5.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/getOffersItemsDropdown.ts
var import_server6 = require("next/server");
async function GET5() {
  try {
    const result = await getOffersItemsDropdown();
    return import_server6.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/getOffersCouponsDropdown.ts
var import_server7 = require("next/server");
async function GET6() {
  try {
    const result = await getOffersCouponsDropdown();
    return import_server7.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersItemsDiscount.ts
var import_server8 = require("next/server");
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return import_server8.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersItemsDiscount.ts
var import_server9 = require("next/server");
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscount((await params).id, data);
    return import_server9.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/getOffersCustomers.ts
var import_server10 = require("next/server");
async function GET7() {
  try {
    const result = await getOffersCustomers();
    return import_server10.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersCustomerDiscount.ts
var import_server11 = require("next/server");
async function POST2(request) {
  try {
    const data = await request.json();
    const result = await postOffersCustomerDiscount(data);
    return import_server11.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersInvoiceDiscount.ts
var import_server12 = require("next/server");
async function POST3(request) {
  try {
    const data = await request.json();
    const result = await postOffersInvoiceDiscount(data);
    return import_server12.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersShippingDiscount.ts
var import_server13 = require("next/server");
async function POST4(request) {
  try {
    const data = await request.json();
    const result = await postOffersShippingDiscount(data);
    return import_server13.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersAddItemsByFilter.ts
var import_server14 = require("next/server");
async function POST5(request, { params }) {
  try {
    const body = await request.json();
    const p = await params;
    const force = p.forceUpdate === "true" || p.forceUpdate === "1";
    const result = await postOffersAddItemsByFilter(p.id, force, body);
    return import_server14.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/postOffersDeliveryZones.ts
async function POST6(request, { params }) {
  try {
    const data = await request.json();
    const result = await postOffersDeliveryZones((await params).id, data);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/getOffersGroups.ts
async function GET8(request, { params }) {
  try {
    const result = await getOffersGroups((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersGroup.ts
var import_server15 = require("next/server");
async function PUT2(request, { params }) {
  try {
    const data = await request.json();
    const { id, offerGroupId } = await params;
    const result = await putOffersGroup(id, offerGroupId, data);
    return import_server15.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/deleteOffersGroup.ts
var import_server16 = require("next/server");
async function DELETE2(_request, { params }) {
  try {
    const { id, offerGroupId } = await params;
    const result = await deleteOffersGroup(id, offerGroupId);
    return import_server16.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersCustomerDiscount.ts
var import_server17 = require("next/server");
async function PUT3(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersCustomerDiscount((await params).id, data);
    return import_server17.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersExtraItemDiscount.ts
var import_server18 = require("next/server");
async function PUT4(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersExtraItemDiscount((await params).id, data);
    return import_server18.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersInvoiceDiscount.ts
var import_server19 = require("next/server");
async function PUT5(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersInvoiceDiscount((await params).id, data);
    return import_server19.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersItemsDiscountCustomers.ts
var import_server20 = require("next/server");
async function PUT6(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscountCustomers((await params).id, data);
    return import_server20.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

// src/inventory/offers/handler/putOffersShippingDiscount.ts
var import_server21 = require("next/server");
async function PUT7(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersShippingDiscount((await params).id, data);
    return import_server21.NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteOfferDELETE,
  DeleteOffersGroupDELETE,
  GetCouponsGET,
  GetInvoiceDiscountGET,
  GetOfferByIdGET,
  GetOffersCouponsDropdownGET,
  GetOffersCustomersGET,
  GetOffersGroupsGET,
  GetOffersItemsDropdownGET,
  GetOffersPagingGET,
  OfferPagingParameters,
  OffersFilterParameters,
  PostOffersAddItemsByFilterPOST,
  PostOffersCustomerDiscountPOST,
  PostOffersDeliveryZonesPOST,
  PostOffersInvoiceDiscountPOST,
  PostOffersItemsDiscountPOST,
  PostOffersShippingDiscountPOST,
  PutOffersCustomerDiscountPUT,
  PutOffersExtraItemDiscountPUT,
  PutOffersGroupPUT,
  PutOffersInvoiceDiscountPUT,
  PutOffersItemsDiscountCustomersPUT,
  PutOffersItemsDiscountPUT,
  PutOffersShippingDiscountPUT,
  deleteOffer,
  deleteOffersGroup,
  getCoupons,
  getInvoiceDiscount,
  getOfferById,
  getOffersCouponsDropdown,
  getOffersCustomers,
  getOffersGroups,
  getOffersItemsDropdown,
  getOffersPaging,
  offerTypes,
  postOffersAddItemsByFilter,
  postOffersCustomerDiscount,
  postOffersDeliveryZones,
  postOffersInvoiceDiscount,
  postOffersItemsDiscount,
  postOffersShippingDiscount,
  putOffersCustomerDiscount,
  putOffersExtraItemDiscount,
  putOffersGroup,
  putOffersInvoiceDiscount,
  putOffersItemsDiscount,
  putOffersItemsDiscountCustomers,
  putOffersShippingDiscount
});
