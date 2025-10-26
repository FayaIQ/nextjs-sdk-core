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

// src/handlers/getProducts.ts
var getProducts_exports = {};
__export(getProducts_exports, {
  GET: () => GET
});
module.exports = __toCommonJS(getProducts_exports);
var import_server = require("next/server");

// src/token.ts
var import_headers = require("next/headers");

// src/api/api.ts
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
  static putOrderApprove(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}ApproveDeliveryOrder`;
  }
  static putOrderApproveList() {
    return `${_Api.INVENTORY_BASE}/v1/Orders/ApproveDeliveryOrder/List`;
  }
  static putOrderDisapprove(id) {
    return `${_Api.INVENTORY_BASE}/v1/Orders/${id}DisapproveDeliveryOrder`;
  }
  static putOrderDisapproveList() {
    return `${_Api.INVENTORY_BASE}/v1/Orders/DisapproveDeliveryOrder/List`;
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
  /////////////////////////////////////////
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
_Api.getCategories = `${_Api.INVENTORY_BASE}/v1/Menus/Search/true`;
_Api.getBranches = `${_Api.STORES_BASE}/v1/stores/Info/StoreAndBranchesOrderedByAddresses`;
_Api.getBrands = `${_Api.INVENTORY_BASE}/v1/StoreItemSources/Paging?isFeatured=True`;
_Api.getWishes = `${_Api.INVENTORY_BASE}/v1/wishes/paging`;
_Api.getOrders = `${_Api.INVENTORY_BASE}/v1/Orders/Paging`;
_Api.postOrders = `${_Api.INVENTORY_BASE}/v2/Orders`;
_Api.getStoreInfo = `${_Api.STORES_BASE}/v1/Stores/Info`;
_Api.getCities = `${_Api.GPS_BASE}/v1/Locations`;
_Api.getDeliveryZones = `${_Api.GPS_BASE}/v1/DeliveryZones`;
_Api.getSlideShows = `${_Api.THEME_BASE}/v1/SlideShows/Paging`;
// orders endpoints
_Api.getOrderFullInfo = `${_Api.INVENTORY_BASE}/v1/Orders/List/FullInfo`;
_Api.postOrderDelagatesList = `${_Api.INVENTORY_BASE}/v1/Orders/Delagates/List`;
_Api.getCheckoutQuote = `${_Api.INVENTORY_BASE}/v1/Checkout/Quote`;
// Cart endpoints
_Api.getCurrentCart = `${_Api.INVENTORY_BASE}/v1/Carts/Current`;
_Api.postCartItems = `${_Api.INVENTORY_BASE}/v1/Carts/Items`;
var Api = _Api;

// src/core/config.ts
var getAuthConfig = () => {
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
  return {
    clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
    clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
    username: "athathak",
    password: "123456",
    language: 0,
    gmt: 3
  };
};

// src/token.ts
var AUTH_MODE = process.env.STOREAK_AUTH_MODE || "auto";
async function getToken() {
  if (AUTH_MODE === "strict") {
    const cookie = await (0, import_headers.cookies)();
    const accessTokenCookie = cookie.get("access_token")?.value;
    if (accessTokenCookie && accessTokenCookie) {
      return accessTokenCookie;
    }
    throw new Error("Unauthorized: Access token missing (strict mode enabled)");
  }
  const authConfig = getAuthConfig();
  const requestBody = {
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    username: authConfig.username,
    password: authConfig.password,
    Language: authConfig.language ?? 0,
    GMT: authConfig.gmt ?? 3,
    IsFromNotification: false
  };
  const response = await fetch(Api.signIn, {
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

// src/core/fetcher.ts
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
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

// src/getProducts.ts
async function getProducts({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  params.set("havePicture", "true");
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(`${Api.getProducts}?${params.toString()}`, {
      token
    });
  }
  const response = await fetch(`/api/getProducts?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/filter-models.ts
var PagingParameters = class {
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
  }
  /**
   * Convert to URL parameters
   */
  toURLParams() {
    const params = {
      currentPage: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };
    if (this.sortField) {
      params.sortField = this.sortField;
    }
    return params;
  }
};
var ItemsFilterParameters = class _ItemsFilterParameters {
  constructor({
    pagingParameters = new PagingParameters(),
    sortType = "None" /* None */,
    menuId = null,
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    name = null,
    gender = null,
    age = null,
    sourceId = null,
    offerId = null,
    newArrival = null,
    getBrand = false,
    getColors = false,
    getColorsDefaultPictures = null,
    getOffer = false,
    getSize = false,
    getCollections = false,
    branchId = null,
    availability = null,
    minRating = null,
    hasDiscount = null,
    minDiscountPercentage = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.sortType = sortType;
    this.menuId = menuId;
    this.categoryId = categoryId;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.sourceId = sourceId;
    this.offerId = offerId;
    this.newArrival = newArrival;
    this.getBrand = getBrand;
    this.getColors = getColors;
    this.getColorsDefaultPictures = getColorsDefaultPictures;
    this.getOffer = getOffer;
    this.getSize = getSize;
    this.getCollections = getCollections;
    this.branchId = branchId;
    this.availability = availability;
    this.minRating = minRating;
    this.hasDiscount = hasDiscount;
    this.minDiscountPercentage = minDiscountPercentage;
  }
  /**
   * Create a copy of the filter with updated parameters
   */
  copyWith(updates) {
    return new _ItemsFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      sortType: updates.sortType !== void 0 ? updates.sortType : this.sortType,
      menuId: updates.menuId !== void 0 ? updates.menuId : this.menuId,
      categoryId: updates.categoryId !== void 0 ? updates.categoryId : this.categoryId,
      minPrice: updates.minPrice !== void 0 ? updates.minPrice : this.minPrice,
      maxPrice: updates.maxPrice !== void 0 ? updates.maxPrice : this.maxPrice,
      name: updates.name !== void 0 ? updates.name : this.name,
      gender: updates.gender !== void 0 ? updates.gender : this.gender,
      age: updates.age !== void 0 ? updates.age : this.age,
      sourceId: updates.sourceId !== void 0 ? updates.sourceId : this.sourceId,
      offerId: updates.offerId !== void 0 ? updates.offerId : this.offerId,
      newArrival: updates.newArrival !== void 0 ? updates.newArrival : this.newArrival,
      getBrand: updates.getBrand !== void 0 ? updates.getBrand : this.getBrand,
      getColors: updates.getColors !== void 0 ? updates.getColors : this.getColors,
      getColorsDefaultPictures: updates.getColorsDefaultPictures !== void 0 ? updates.getColorsDefaultPictures : this.getColorsDefaultPictures,
      getOffer: updates.getOffer !== void 0 ? updates.getOffer : this.getOffer,
      getSize: updates.getSize !== void 0 ? updates.getSize : this.getSize,
      getCollections: updates.getCollections !== void 0 ? updates.getCollections : this.getCollections,
      branchId: updates.branchId !== void 0 ? updates.branchId : this.branchId,
      availability: updates.availability !== void 0 ? updates.availability : this.availability,
      minRating: updates.minRating !== void 0 ? updates.minRating : this.minRating,
      hasDiscount: updates.hasDiscount !== void 0 ? updates.hasDiscount : this.hasDiscount,
      minDiscountPercentage: updates.minDiscountPercentage !== void 0 ? updates.minDiscountPercentage : this.minDiscountPercentage
    });
  }
  /**
   * Convert filter parameters to URL search parameters
   */
  toURLSearchParams() {
    const params = new URLSearchParams();
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        params.set(key, value);
      }
    });
    if (this.sortType !== "None" /* None */) {
      params.set("sortType", this.sortType);
    }
    if (this.menuId !== null) {
      params.set("menuId", this.menuId.toString());
    }
    if (this.categoryId !== null) {
      params.set("categoryId", this.categoryId.toString());
    }
    if (this.minPrice !== null) {
      params.set("minPrice", this.minPrice.toString());
    }
    if (this.maxPrice !== null) {
      params.set("maxPrice", this.maxPrice.toString());
    }
    if (this.name !== null && this.name.trim() !== "") {
      params.set("name", this.name.trim());
    }
    if (this.gender !== null) {
      params.set("gender", this.gender.toString());
    }
    if (this.age !== null) {
      params.set("age", this.age.toString());
    }
    if (this.sourceId !== null) {
      params.set("sourceId", this.sourceId.toString());
    }
    if (this.offerId !== null) {
      params.set("offerId", this.offerId.toString());
    }
    if (this.newArrival !== null) {
      params.set("newArrival", this.newArrival);
    }
    if (this.getBrand) {
      params.set("getBrand", "true");
    }
    if (this.getColors) {
      params.set("getColors", "true");
    }
    if (this.getColorsDefaultPictures) {
      params.set("getColorsDefaultPictures", "true");
    }
    if (this.getOffer) {
      params.set("getOffer", "true");
    }
    if (this.getSize) {
      params.set("getSize", "true");
    }
    if (this.getCollections) {
      params.set("getCollections", "true");
    }
    if (this.branchId !== null) {
      params.set("branchId", this.branchId.toString());
    }
    if (this.availability !== null) {
      params.set("availability", this.availability.toString());
    }
    if (this.minRating !== null) {
      params.set("minRating", this.minRating.toString());
    }
    if (this.hasDiscount !== null) {
      params.set("hasDiscount", this.hasDiscount.toString());
    }
    if (this.minDiscountPercentage !== null) {
      params.set(
        "minDiscountPercentage",
        this.minDiscountPercentage.toString()
      );
    }
    return params;
  }
  /**
   * Convert to a plain object map
   */
  toMap() {
    const map = {};
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);
    if (this.sortType !== "None" /* None */) map.sortType = this.sortType;
    if (this.menuId !== null) map.menuId = this.menuId;
    if (this.categoryId !== null) map.categoryId = this.categoryId;
    if (this.minPrice !== null) map.minPrice = this.minPrice;
    if (this.maxPrice !== null) map.maxPrice = this.maxPrice;
    if (this.name !== null && this.name.trim() !== "")
      map.name = this.name.trim();
    if (this.gender !== null) map.gender = this.gender;
    if (this.age !== null) map.age = this.age;
    if (this.sourceId !== null) map.sourceId = this.sourceId;
    if (this.offerId !== null) map.offerId = this.offerId;
    if (this.newArrival !== null) map.newArrival = this.newArrival;
    if (this.getBrand) map.getBrand = true;
    if (this.getColors) map.getColors = true;
    if (this.getColorsDefaultPictures) map.getColorsDefaultPictures = true;
    if (this.getOffer) map.getOffer = true;
    if (this.getSize) map.getSize = true;
    if (this.getCollections) map.getCollections = true;
    if (this.branchId !== null) map.branchId = this.branchId;
    if (this.availability !== null) map.availability = this.availability;
    if (this.minRating !== null) map.minRating = this.minRating;
    if (this.hasDiscount !== null) map.hasDiscount = this.hasDiscount;
    if (this.minDiscountPercentage !== null)
      map.minDiscountPercentage = this.minDiscountPercentage;
    return map;
  }
  /**
   * Create filter from URL search parameters
   */
  static fromURLSearchParams(params) {
    const pagingParameters = new PagingParameters({
      currentPage: params.get("currentPage") ? parseInt(params.get("currentPage")) : 1,
      pageSize: params.get("pageSize") ? parseInt(params.get("pageSize")) : 20,
      sortField: params.get("sortField") || null
    });
    return new _ItemsFilterParameters({
      pagingParameters,
      sortType: params.get("sortType") || "None" /* None */,
      menuId: params.get("menuId") ? parseInt(params.get("menuId")) : null,
      categoryId: params.get("categoryId") ? parseInt(params.get("categoryId")) : null,
      minPrice: params.get("minPrice") ? parseFloat(params.get("minPrice")) : null,
      maxPrice: params.get("maxPrice") ? parseFloat(params.get("maxPrice")) : null,
      name: params.get("name") || null,
      gender: params.get("gender") ? parseInt(params.get("gender")) : null,
      age: params.get("age") ? parseInt(params.get("age")) : null,
      sourceId: params.get("sourceId") ? parseInt(params.get("sourceId")) : null,
      offerId: params.get("offerId") ? parseInt(params.get("offerId")) : null,
      newArrival: params.get("newArrival") || null,
      getBrand: params.get("getBrand") === "true",
      getColors: params.get("getColors") === "true",
      getColorsDefaultPictures: params.get("getColorsDefaultPictures") === "true" || null,
      getOffer: params.get("getOffer") === "true",
      getSize: params.get("getSize") === "true",
      getCollections: params.get("getCollections") === "true",
      branchId: params.get("branchId") ? parseInt(params.get("branchId")) : null,
      availability: params.get("availability") ? params.get("availability") === "true" : null,
      minRating: params.get("minRating") ? parseFloat(params.get("minRating")) : null,
      hasDiscount: params.get("hasDiscount") ? params.get("hasDiscount") === "true" : null,
      minDiscountPercentage: params.get("minDiscountPercentage") ? parseFloat(params.get("minDiscountPercentage")) : null
    });
  }
};

// src/handlers/getProducts.ts
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const products = await getProducts({ filterParams });
    return import_server.NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return import_server.NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET
});
