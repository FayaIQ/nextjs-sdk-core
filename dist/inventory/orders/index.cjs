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
var getAuthConfig;
var init_config = __esm({
  "src/core/config.ts"() {
    "use strict";
    getAuthConfig = () => {
      if (typeof process !== "undefined" && process.env) {
        const envConfig = {
          clientId: process.env.STOREAK_CLIENT_ID,
          clientSecret: process.env.STOREAK_CLIENT_SECRET,
          username: process.env.STOREAK_USERNAME,
          password: process.env.STOREAK_PASSWORD
        };
        if (envConfig.clientId && envConfig.clientSecret && envConfig.username && envConfig.password) {
          return {
            ...envConfig,
            language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
            gmt: parseInt(process.env.STOREAK_GMT || "3")
          };
        }
      }
      const missing = [];
      const required = [
        "STOREAK_CLIENT_ID",
        "STOREAK_CLIENT_SECRET"
      ];
      required.forEach((name) => {
        if (!process.env?.[name]) missing.push(name);
      });
      if (missing.length > 0) {
        throw new Error(
          `Missing required environment variables for authentication: ${missing.join(", ")}`
        );
      }
      return {
        clientId: process.env.STOREAK_CLIENT_ID,
        clientSecret: process.env.STOREAK_CLIENT_SECRET,
        username: process.env.STOREAK_USERNAME,
        password: process.env.STOREAK_PASSWORD,
        language: parseInt(process.env.STOREAK_LANGUAGE || "0"),
        gmt: parseInt(process.env.STOREAK_GMT || "3")
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
      // Payments endpoints
      static getStorePayments(storeId) {
        return `${_Api.STORES_BASE}/v1/Stores/${storeId}/Payments`;
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
    _Api.getBrands = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
    _Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
    _Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
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
var token_exports = {};
__export(token_exports, {
  default: () => getToken
});
async function getToken() {
  if (AUTH_MODE === "strict" && typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie) {
      return accessTokenCookie;
    }
    throw new Error("Unauthorized: Access token missing (strict mode enabled)");
  }
  const { getAuthConfig: getAuthConfig2 } = await Promise.resolve().then(() => (init_config(), config_exports));
  const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
  const authConfig = getAuthConfig2();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    username: authConfig.username,
    password: authConfig.password,
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
  const token = await getToken();
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
  const token = await getToken();
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
  const token = await getToken();
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
  const token = await getToken();
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
  const token = await getToken();
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

// src/inventory/orders/index.ts
var orders_exports = {};
__export(orders_exports, {
  DeleveryType: () => DeleveryType,
  GETOrder: () => GET2,
  GETOrders: () => GET,
  OrderPagingParameters: () => OrderPagingParameters,
  OrderType: () => OrderType,
  OrdersFilterParameters: () => OrdersFilterParameters,
  POSTOrderFullInfo: () => POST,
  PUTOrderApprove: () => PUT,
  PUTOrderApproveList: () => PUT3,
  PUTOrderChangeStatus: () => PUT5,
  PUTOrderDisapprove: () => PUT2,
  PUTOrderDisapproveList: () => PUT4,
  PUTOrderDiscount: () => PUT6,
  PUTOrderReferenceDeliveryId: () => PUT8,
  PUTOrderReferenceId: () => PUT7,
  PayType: () => PayType,
  Sign: () => Sign,
  getOrder: () => getOrder,
  getOrders: () => getOrders,
  getOrdersFullInfo: () => getOrdersFullInfo,
  putOrderApprove: () => putOrderApprove,
  putOrderApproveList: () => putOrderApproveList,
  putOrderChangeStatus: () => putOrderChangeStatus,
  putOrderDisapprove: () => putOrderDisapprove,
  putOrderDisapproveList: () => putOrderDisapproveList,
  putOrderDiscount: () => putOrderDiscount,
  putOrderReferenceDeliveryId: () => putOrderReferenceDeliveryId,
  putOrderReferenceId: () => putOrderReferenceId
});
module.exports = __toCommonJS(orders_exports);

// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { default: getToken2 } = await Promise.resolve().then(() => (init_token(), token_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    const token = await getToken2();
    return getWithAuth2(
      `${Api2.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/getOrder.ts
async function getOrder(id) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return getWithAuth2(
      `${Api2.getOrder(id)}`
    );
  }
  const response = await fetch(`/api/orders/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/order-models.ts
var OrderType = /* @__PURE__ */ ((OrderType2) => {
  OrderType2[OrderType2["UnderAcceptance"] = 1] = "UnderAcceptance";
  OrderType2[OrderType2["Conformed"] = 2] = "Conformed";
  OrderType2[OrderType2["UnderPreparing"] = 3] = "UnderPreparing";
  OrderType2[OrderType2["Delivering"] = 4] = "Delivering";
  OrderType2[OrderType2["Prepared"] = 5] = "Prepared";
  OrderType2[OrderType2["Delivered"] = 6] = "Delivered";
  OrderType2[OrderType2["Rejected"] = 7] = "Rejected";
  OrderType2[OrderType2["Canceled"] = 8] = "Canceled";
  OrderType2[OrderType2["Unknown"] = 9] = "Unknown";
  return OrderType2;
})(OrderType || {});
var PayType = /* @__PURE__ */ ((PayType2) => {
  PayType2[PayType2["None"] = 0] = "None";
  PayType2[PayType2["CashOnDelivery"] = 1] = "CashOnDelivery";
  PayType2[PayType2["CashOnStore"] = 2] = "CashOnStore";
  PayType2[PayType2["CashOnline"] = 3] = "CashOnline";
  return PayType2;
})(PayType || {});
var DeleveryType = /* @__PURE__ */ ((DeleveryType2) => {
  DeleveryType2[DeleveryType2["None"] = 0] = "None";
  DeleveryType2[DeleveryType2["StorePickup"] = 1] = "StorePickup";
  DeleveryType2[DeleveryType2["HomeDelivery"] = 2] = "HomeDelivery";
  return DeleveryType2;
})(DeleveryType || {});
var Sign = /* @__PURE__ */ ((Sign2) => {
  Sign2[Sign2["Equal"] = 0] = "Equal";
  Sign2[Sign2["NotEqual"] = 1] = "NotEqual";
  Sign2[Sign2["GreaterThan"] = 2] = "GreaterThan";
  Sign2[Sign2["LessThan"] = 3] = "LessThan";
  Sign2[Sign2["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
  Sign2[Sign2["LessThanOrEqual"] = 5] = "LessThanOrEqual";
  return Sign2;
})(Sign || {});
var OrderPagingParameters = class {
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
var OrdersFilterParameters = class _OrdersFilterParameters {
  // UUID
  constructor({
    pagingParameters = new OrderPagingParameters(),
    storeId = null,
    menuId = null,
    dateFrom = null,
    dateTo = null,
    startTime = null,
    endTime = null,
    orderStatusId = null,
    orderStatusIds = null,
    isCanceled = null,
    isConfirmed = null,
    isRejected = null,
    isPrint = null,
    number = null,
    referenceId = null,
    referenceDeliveryId = null,
    locationId = null,
    countryId = null,
    cityId = null,
    districtId = null,
    buildingId = null,
    apartmentId = null,
    orderType = null,
    payType = null,
    DeleveryType: DeleveryType2 = null,
    username = null,
    customerId = null,
    delegateId = null,
    delegateWithCustomerId = null,
    statusChangedBy = null,
    viewInMainCurrency = null,
    totalAmount = null,
    sign = null,
    couponOfferId = null,
    applicationId = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.storeId = storeId;
    this.menuId = menuId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.startTime = startTime;
    this.endTime = endTime;
    this.orderStatusId = orderStatusId;
    this.orderStatusIds = orderStatusIds;
    this.isCanceled = isCanceled;
    this.isConfirmed = isConfirmed;
    this.isRejected = isRejected;
    this.isPrint = isPrint;
    this.number = number;
    this.referenceId = referenceId;
    this.referenceDeliveryId = referenceDeliveryId;
    this.locationId = locationId;
    this.countryId = countryId;
    this.cityId = cityId;
    this.districtId = districtId;
    this.buildingId = buildingId;
    this.apartmentId = apartmentId;
    this.orderType = orderType;
    this.payType = payType;
    this.DeleveryType = DeleveryType2;
    this.username = username;
    this.customerId = customerId;
    this.delegateId = delegateId;
    this.delegateWithCustomerId = delegateWithCustomerId;
    this.statusChangedBy = statusChangedBy;
    this.viewInMainCurrency = viewInMainCurrency;
    this.totalAmount = totalAmount;
    this.sign = sign;
    this.couponOfferId = couponOfferId;
    this.applicationId = applicationId;
  }
  /**
   * Create a copy with updated parameters
   */
  copyWith(updates) {
    return new _OrdersFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      storeId: updates.storeId !== void 0 ? updates.storeId : this.storeId,
      menuId: updates.menuId !== void 0 ? updates.menuId : this.menuId,
      dateFrom: updates.dateFrom !== void 0 ? updates.dateFrom : this.dateFrom,
      dateTo: updates.dateTo !== void 0 ? updates.dateTo : this.dateTo,
      startTime: updates.startTime !== void 0 ? updates.startTime : this.startTime,
      endTime: updates.endTime !== void 0 ? updates.endTime : this.endTime,
      orderStatusId: updates.orderStatusId !== void 0 ? updates.orderStatusId : this.orderStatusId,
      orderStatusIds: updates.orderStatusIds !== void 0 ? updates.orderStatusIds : this.orderStatusIds,
      isCanceled: updates.isCanceled !== void 0 ? updates.isCanceled : this.isCanceled,
      isConfirmed: updates.isConfirmed !== void 0 ? updates.isConfirmed : this.isConfirmed,
      isRejected: updates.isRejected !== void 0 ? updates.isRejected : this.isRejected,
      isPrint: updates.isPrint !== void 0 ? updates.isPrint : this.isPrint,
      number: updates.number !== void 0 ? updates.number : this.number,
      referenceId: updates.referenceId !== void 0 ? updates.referenceId : this.referenceId,
      referenceDeliveryId: updates.referenceDeliveryId !== void 0 ? updates.referenceDeliveryId : this.referenceDeliveryId,
      locationId: updates.locationId !== void 0 ? updates.locationId : this.locationId,
      countryId: updates.countryId !== void 0 ? updates.countryId : this.countryId,
      cityId: updates.cityId !== void 0 ? updates.cityId : this.cityId,
      districtId: updates.districtId !== void 0 ? updates.districtId : this.districtId,
      buildingId: updates.buildingId !== void 0 ? updates.buildingId : this.buildingId,
      apartmentId: updates.apartmentId !== void 0 ? updates.apartmentId : this.apartmentId,
      orderType: updates.orderType !== void 0 ? updates.orderType : this.orderType,
      payType: updates.payType !== void 0 ? updates.payType : this.payType,
      DeleveryType: updates.DeleveryType !== void 0 ? updates.DeleveryType : this.DeleveryType,
      username: updates.username !== void 0 ? updates.username : this.username,
      customerId: updates.customerId !== void 0 ? updates.customerId : this.customerId,
      delegateId: updates.delegateId !== void 0 ? updates.delegateId : this.delegateId,
      delegateWithCustomerId: updates.delegateWithCustomerId !== void 0 ? updates.delegateWithCustomerId : this.delegateWithCustomerId,
      statusChangedBy: updates.statusChangedBy !== void 0 ? updates.statusChangedBy : this.statusChangedBy,
      viewInMainCurrency: updates.viewInMainCurrency !== void 0 ? updates.viewInMainCurrency : this.viewInMainCurrency,
      totalAmount: updates.totalAmount !== void 0 ? updates.totalAmount : this.totalAmount,
      sign: updates.sign !== void 0 ? updates.sign : this.sign,
      couponOfferId: updates.couponOfferId !== void 0 ? updates.couponOfferId : this.couponOfferId,
      applicationId: updates.applicationId !== void 0 ? updates.applicationId : this.applicationId
    });
  }
  /**
   * Convert to URL search parameters
   * FIXED: This is the key method that was causing the issue
   */
  toURLSearchParams() {
    const params = new URLSearchParams();
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        params.set(key, value);
      }
    });
    if (this.storeId !== null) params.set("StoreId", this.storeId.toString());
    if (this.menuId !== null) params.set("MenuId", this.menuId.toString());
    if (this.dateFrom !== null) params.set("DateFrom", this.dateFrom);
    if (this.dateTo !== null) params.set("DateTo", this.dateTo);
    if (this.startTime !== null) params.set("StartTime", this.startTime);
    if (this.endTime !== null) params.set("EndTime", this.endTime);
    if (this.orderStatusId !== null) params.set("OrderStatusId", this.orderStatusId.toString());
    if (this.orderStatusIds !== null && this.orderStatusIds.length > 0) {
      this.orderStatusIds.forEach((id) => params.append("OrderStatusIds", id.toString()));
    }
    if (this.isCanceled !== null) params.set("IsCancled", this.isCanceled.toString());
    if (this.isConfirmed !== null) params.set("IsConformed", this.isConfirmed.toString());
    if (this.isRejected !== null) params.set("IsRejected", this.isRejected.toString());
    if (this.isPrint !== null) params.set("IsPrint", this.isPrint.toString());
    if (this.number !== null) params.set("Number", this.number.toString());
    if (this.referenceId !== null) params.set("ReferenceId", this.referenceId);
    if (this.referenceDeliveryId !== null) params.set("ReferenceDeliveryId", this.referenceDeliveryId);
    if (this.locationId !== null) params.set("LocationId", this.locationId.toString());
    if (this.countryId !== null) params.set("CountryId", this.countryId.toString());
    if (this.cityId !== null) params.set("CityId", this.cityId.toString());
    if (this.districtId !== null) params.set("DistrictId", this.districtId.toString());
    if (this.buildingId !== null) params.set("BuildingId", this.buildingId.toString());
    if (this.apartmentId !== null) params.set("AppartmentId", this.apartmentId.toString());
    if (this.orderType !== null) params.set("OrderType", this.orderType.toString());
    if (this.payType !== null) params.set("PayType", this.payType.toString());
    if (this.DeleveryType !== null) params.set("DeleveryType", this.DeleveryType.toString());
    if (this.username !== null) params.set("Username", this.username);
    if (this.customerId !== null) params.set("CustomerId", this.customerId);
    if (this.delegateId !== null) params.set("DelagateId", this.delegateId);
    if (this.delegateWithCustomerId !== null) params.set("DelegateWithCustomerId", this.delegateWithCustomerId);
    if (this.statusChangedBy !== null) params.set("StatusChangedBy", this.statusChangedBy);
    if (this.viewInMainCurrency !== null) params.set("ViewInMainCurrency", this.viewInMainCurrency.toString());
    if (this.totalAmount !== null) params.set("TotalAmount", this.totalAmount.toString());
    if (this.sign !== null) params.set("Sign", this.sign.toString());
    if (this.couponOfferId !== null) params.set("CouponOfferId", this.couponOfferId);
    if (this.applicationId !== null) params.set("ApplicationId", this.applicationId);
    return params;
  }
  /**
   * Convert to plain object map
   */
  toMap() {
    const map = {};
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);
    if (this.storeId !== null) map.StoreId = this.storeId;
    if (this.menuId !== null) map.MenuId = this.menuId;
    if (this.dateFrom !== null) map.DateFrom = this.dateFrom;
    if (this.dateTo !== null) map.DateTo = this.dateTo;
    if (this.startTime !== null) map.StartTime = this.startTime;
    if (this.endTime !== null) map.EndTime = this.endTime;
    if (this.orderStatusId !== null) map.OrderStatusId = this.orderStatusId;
    if (this.orderStatusIds !== null) map.OrderStatusIds = this.orderStatusIds;
    if (this.isCanceled !== null) map.IsCancled = this.isCanceled;
    if (this.isConfirmed !== null) map.IsConformed = this.isConfirmed;
    if (this.isRejected !== null) map.IsRejected = this.isRejected;
    if (this.isPrint !== null) map.IsPrint = this.isPrint;
    if (this.number !== null) map.Number = this.number;
    if (this.referenceId !== null) map.ReferenceId = this.referenceId;
    if (this.referenceDeliveryId !== null) map.ReferenceDeliveryId = this.referenceDeliveryId;
    if (this.locationId !== null) map.LocationId = this.locationId;
    if (this.countryId !== null) map.CountryId = this.countryId;
    if (this.cityId !== null) map.CityId = this.cityId;
    if (this.districtId !== null) map.DistrictId = this.districtId;
    if (this.buildingId !== null) map.BuildingId = this.buildingId;
    if (this.apartmentId !== null) map.AppartmentId = this.apartmentId;
    if (this.orderType !== null) map.OrderType = this.orderType;
    if (this.payType !== null) map.PayType = this.payType;
    if (this.DeleveryType !== null) map.DeleveryType = this.DeleveryType;
    if (this.username !== null) map.Username = this.username;
    if (this.customerId !== null) map.CustomerId = this.customerId;
    if (this.delegateId !== null) map.DelagateId = this.delegateId;
    if (this.delegateWithCustomerId !== null) map.DelegateWithCustomerId = this.delegateWithCustomerId;
    if (this.statusChangedBy !== null) map.StatusChangedBy = this.statusChangedBy;
    if (this.viewInMainCurrency !== null) map.ViewInMainCurrency = this.viewInMainCurrency;
    if (this.totalAmount !== null) map.TotalAmount = this.totalAmount;
    if (this.sign !== null) map.Sign = this.sign;
    if (this.couponOfferId !== null) map.CouponOfferId = this.couponOfferId;
    if (this.applicationId !== null) map.ApplicationId = this.applicationId;
    return map;
  }
  /**
   * Create filter from URL search parameters
   */
  static fromURLSearchParams(params) {
    const pagingParameters = new OrderPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null
    });
    const orderStatusIds = params.getAll("OrderStatusIds").map((id) => parseInt(id));
    return new _OrdersFilterParameters({
      pagingParameters,
      storeId: params.get("StoreId") ? parseInt(params.get("StoreId")) : null,
      menuId: params.get("MenuId") ? parseInt(params.get("MenuId")) : null,
      dateFrom: params.get("DateFrom") || null,
      dateTo: params.get("DateTo") || null,
      startTime: params.get("StartTime") || null,
      endTime: params.get("EndTime") || null,
      orderStatusId: params.get("OrderStatusId") ? parseInt(params.get("OrderStatusId")) : null,
      orderStatusIds: orderStatusIds.length > 0 ? orderStatusIds : null,
      isCanceled: params.get("IsCancled") ? params.get("IsCancled") === "true" : null,
      isConfirmed: params.get("IsConformed") ? params.get("IsConformed") === "true" : null,
      isRejected: params.get("IsRejected") ? params.get("IsRejected") === "true" : null,
      isPrint: params.get("IsPrint") ? params.get("IsPrint") === "true" : null,
      number: params.get("Number") ? parseInt(params.get("Number")) : null,
      referenceId: params.get("ReferenceId") || null,
      referenceDeliveryId: params.get("ReferenceDeliveryId") || null,
      locationId: params.get("LocationId") ? parseInt(params.get("LocationId")) : null,
      countryId: params.get("CountryId") ? parseInt(params.get("CountryId")) : null,
      cityId: params.get("CityId") ? parseInt(params.get("CityId")) : null,
      districtId: params.get("DistrictId") ? parseInt(params.get("DistrictId")) : null,
      buildingId: params.get("BuildingId") ? parseInt(params.get("BuildingId")) : null,
      apartmentId: params.get("AppartmentId") ? parseInt(params.get("AppartmentId")) : null,
      orderType: params.get("OrderType") ? parseInt(params.get("OrderType")) : null,
      payType: params.get("PayType") ? parseInt(params.get("PayType")) : null,
      DeleveryType: params.get("DeleveryType") ? parseInt(params.get("DeleveryType")) : null,
      username: params.get("Username") || null,
      customerId: params.get("CustomerId") || null,
      delegateId: params.get("DelagateId") || null,
      delegateWithCustomerId: params.get("DelegateWithCustomerId") || null,
      statusChangedBy: params.get("StatusChangedBy") || null,
      viewInMainCurrency: params.get("ViewInMainCurrency") ? params.get("ViewInMainCurrency") === "true" : null,
      totalAmount: params.get("TotalAmount") ? parseFloat(params.get("TotalAmount")) : null,
      sign: params.get("Sign") ? parseInt(params.get("Sign")) : null,
      couponOfferId: params.get("CouponOfferId") || null,
      applicationId: params.get("ApplicationId") || null
    });
  }
};

// src/inventory/orders/putOrderApprove.ts
async function putOrderApprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(
      Api2.putOrderApprove(id),
      { note: note || "" }
    );
  }
  const response = await fetch(`/api/orders/${id}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderApproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(
      Api2.putOrderApproveList,
      { orderIds: ids, note: note || "" }
    );
  }
  const response = await fetch("/api/orders/approve-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to approve orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderDisapprove.ts
async function putOrderDisapprove(id, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(
      Api2.putOrderDisapprove(id),
      { note }
    );
  }
  const response = await fetch(`/api/orders/${id}/disapprove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove order: ${response.statusText}`);
  }
  return response.json();
}
async function putOrderDisapproveList(ids, note) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return putWithAuth2(
      Api2.putOrderDisapproveList,
      { orderIds: ids, note: note || "" }
    );
  }
  const response = await fetch("/api/orders/disapprove-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" })
  });
  if (!response.ok) {
    throw new Error(`Failed to disapprove orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/getOrdersFullInfo.ts
async function getOrdersFullInfo(input) {
  const orderIds = Array.isArray(input) ? input : input.orderIds ?? input.body ?? [];
  if (typeof window === "undefined") {
    const { postWithAuth: postWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return postWithAuth2(Api2.getOrderFullInfo, { orderIds });
  }
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/orders/putOrderChangeStatus.ts
async function putOrderChangeStatus(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return await putWithAuth2(Api2.putChangeStatusOrder(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/change-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to change order status: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderDiscount.ts
init_api();
init_fetcher();
async function putOrderDiscount(orderId, data) {
  if (typeof window === "undefined") {
    return await putWithAuth(Api.putOrderDiscount(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/discount`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order discount: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderReferenceId.ts
async function putOrderReferenceId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return await putWithAuth2(Api2.putOrderReferenceId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference ID: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/putOrderReferenceDeliveryId.ts
async function putOrderReferenceDeliveryId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth: putWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    return await putWithAuth2(Api2.putOrderReferenceDeliveryId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceDeliveryId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference delivery ID: ${res.statusText}`);
  }
  return res.json();
}

// src/inventory/orders/handler/full-info.ts
var import_server = require("next/server");
async function POST(request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const orderIds = Array.isArray(payload) ? payload : payload.orderIds ?? payload.body ?? [];
    console.log("Received body for full info:", payload);
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return import_server.NextResponse.json({ error: "orderIds array is required" }, { status: 400 });
    }
    const result = await getOrdersFullInfo(orderIds);
    return import_server.NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch order full info";
    console.error("Order full info error:", message);
    return import_server.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve.ts
var import_server2 = require("next/server");
async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return import_server2.NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApprove(id, body?.note);
    return import_server2.NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve order";
    console.error("Order approve error:", message);
    return import_server2.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove.ts
var import_server3 = require("next/server");
async function PUT2(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!id) {
      return import_server3.NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapprove(id, body?.note);
    return import_server3.NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove order";
    console.error("Order disapprove error:", message);
    return import_server3.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/approve-list.ts
var import_server4 = require("next/server");
async function PUT3(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return import_server4.NextResponse.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderApproveList(orderIds, note);
    return import_server4.NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve orders";
    console.error("Order approve list error:", message);
    return import_server4.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/disapprove-list.ts
var import_server5 = require("next/server");
async function PUT4(request) {
  try {
    const body = await request.json();
    const { orderIds, note } = body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return import_server5.NextResponse.json(
        { error: "orderIds array is required" },
        { status: 400 }
      );
    }
    const result = await putOrderDisapproveList(orderIds, note);
    return import_server5.NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disapprove orders";
    console.error("Order disapprove list error:", message);
    return import_server5.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/orders.ts
var import_server6 = require("next/server");
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = OrdersFilterParameters.fromURLSearchParams(searchParams);
    const orders = await getOrders({ filterParams });
    return import_server6.NextResponse.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return import_server6.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/order.ts
var import_server7 = require("next/server");
async function GET2(request, { params }) {
  try {
    const { id } = await params;
    const result = await getOrder(id);
    return import_server7.NextResponse.json(result);
  } catch (error) {
    return import_server7.NextResponse.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/change-status.ts
var import_server8 = require("next/server");
async function PUT5(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putOrderChangeStatus(id, body);
    return import_server8.NextResponse.json(result);
  } catch (error) {
    return import_server8.NextResponse.json(
      { error: error.message || "Failed to change order status" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/discount.ts
var import_server9 = require("next/server");
async function PUT6(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderDiscount(id, body);
    return import_server9.NextResponse.json(result);
  } catch (error) {
    return import_server9.NextResponse.json(
      { error: error.message || "Failed to apply order discount" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-id.ts
var import_server10 = require("next/server");
async function PUT7(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceId(id, body);
    return import_server10.NextResponse.json(result);
  } catch (error) {
    return import_server10.NextResponse.json(
      { error: error.message || "Failed to update order reference ID" },
      { status: 500 }
    );
  }
}

// src/inventory/orders/handler/reference-delivery-id.ts
var import_server11 = require("next/server");
async function PUT8(request, { params }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const result = await putOrderReferenceDeliveryId(id, body);
    return import_server11.NextResponse.json(result);
  } catch (error) {
    return import_server11.NextResponse.json(
      { error: error.message || "Failed to update order reference delivery ID" },
      { status: 500 }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleveryType,
  GETOrder,
  GETOrders,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  POSTOrderFullInfo,
  PUTOrderApprove,
  PUTOrderApproveList,
  PUTOrderChangeStatus,
  PUTOrderDisapprove,
  PUTOrderDisapproveList,
  PUTOrderDiscount,
  PUTOrderReferenceDeliveryId,
  PUTOrderReferenceId,
  PayType,
  Sign,
  getOrder,
  getOrders,
  getOrdersFullInfo,
  putOrderApprove,
  putOrderApproveList,
  putOrderChangeStatus,
  putOrderDisapprove,
  putOrderDisapproveList,
  putOrderDiscount,
  putOrderReferenceDeliveryId,
  putOrderReferenceId
});
