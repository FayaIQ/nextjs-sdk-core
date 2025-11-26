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

// src/api/api.ts
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
    _Api.getBrands = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
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

// src/core/config.ts
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

// src/identity/login.ts
var login_exports = {};
__export(login_exports, {
  loginUser: () => loginUser
});
module.exports = __toCommonJS(login_exports);
init_api();

// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";

// src/core/fetcher.ts
var ApiError = class _ApiError extends Error {
  constructor(status, body, message) {
    super(message || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
    Object.setPrototypeOf(this, _ApiError.prototype);
  }
};
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

// src/identity/login.ts
init_config();
async function loginUser(credentials) {
  const isServer = typeof window === "undefined";
  if (isServer) {
    const config = getAuthConfig();
    const { cookies } = await import("next/headers");
    const fullCredentials = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: credentials.username,
      password: credentials.password,
      Language: config.language ?? 0,
      GMT: config.gmt ?? 3,
      IsFromNotification: false
    };
    const response = await postWithoutAuth(Api.signIn, fullCredentials);
    if (!response?.access_token) {
      throw new Error("Invalid login response: missing access token");
    }
    const cookieStore = await cookies();
    const expiresIn = response.expires || 7200;
    cookieStore.set("access_token", response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn
    });
    if (response.employeeStoreId) {
      cookieStore.set("employee_store_id", String(response.employeeStoreId), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    if (response.roles?.length) {
      cookieStore.set("roles", response.roles.join(","), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    if (response.user?.username) {
      cookieStore.set("username", response.user.username, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: expiresIn
      });
    }
    return response;
  }
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
  return res.json();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginUser
});
