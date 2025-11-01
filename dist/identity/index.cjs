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
    _Api.getCouponOffers = `${_Api.INVENTORY_BASE}/v1/Offers/Coupons/DropDown`;
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

// src/token.ts
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
    let defaultMessage = `Request failed with status ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      const extractMessage = (data2) => {
        if (!data2) return null;
        if (typeof data2 === "string") return data2;
        if (data2.message) return String(data2.message);
        if (data2.Message) return String(data2.Message);
        if (data2.error) {
          if (typeof data2.error === "string") return data2.error;
          if (data2.error.message) return String(data2.error.message);
          if (data2.error.Message) return String(data2.error.Message);
        }
        if (data2.code && data2.name && data2.message) return String(data2.message);
        if (Array.isArray(data2) && data2.length > 0) {
          const first = data2[0];
          if (first?.message) return String(first.message);
        }
        try {
          return JSON.stringify(data2);
        } catch {
          return null;
        }
      };
      const msg = extractMessage(errorData) || defaultMessage;
      throw new Error(msg);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(defaultMessage);
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
    return JSON.parse(text);
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
    throw new Error(`POST request failed: ${response.status} ${response.statusText}`);
  }
  return await response.json();
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
var init_fetcher = __esm({
  "src/core/fetcher.ts"() {
    "use strict";
    init_token();
  }
});

// src/identity/index.ts
var identity_exports = {};
__export(identity_exports, {
  CustomersDropdownGET: () => GET,
  LoginPOST: () => POST,
  LogoutPOST: () => POST2,
  getCustomersDropdown: () => getCustomersDropdown,
  loginUser: () => loginUser,
  logoutUser: () => logoutUser
});
module.exports = __toCommonJS(identity_exports);

// src/identity/login.ts
init_api();
init_fetcher();
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

// src/identity/logout.ts
async function logoutUser() {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("employee_store_id");
    cookieStore.delete("roles");
    return { success: true };
  }
  const res = await fetch("/api/auth/logout", {
    method: "POST"
  });
  if (!res.ok) throw new Error(`Logout failed: ${res.statusText}`);
  return res.json();
}

// src/identity/getCustomersDropdown.ts
async function getCustomersDropdown(username, FullName) {
  if (typeof window === "undefined") {
    const { getWithAuth: getWithAuth2 } = await Promise.resolve().then(() => (init_fetcher(), fetcher_exports));
    const { Api: Api2 } = await Promise.resolve().then(() => (init_api(), api_exports));
    const params2 = new URLSearchParams();
    const usernameTrimmed2 = username !== void 0 ? String(username).trim() : "";
    const fullNameTrimmed2 = FullName !== void 0 ? String(FullName).trim() : "";
    if (usernameTrimmed2 !== "") params2.set("username", usernameTrimmed2);
    if (fullNameTrimmed2 !== "") params2.set("FullName", fullNameTrimmed2);
    const url = params2.toString() ? `${Api2.getCustomersDropdown}?${params2.toString()}` : Api2.getCustomersDropdown;
    return getWithAuth2(url);
  }
  const params = new URLSearchParams();
  const usernameTrimmed = username !== void 0 ? String(username).trim() : "";
  const fullNameTrimmed = FullName !== void 0 ? String(FullName).trim() : "";
  if (usernameTrimmed !== "") params.set("username", usernameTrimmed);
  if (fullNameTrimmed !== "") params.set("FullName", fullNameTrimmed);
  const res = await fetch(`/api/customers/dropdown${params.toString() ? `?${params.toString()}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch customers dropdown: ${res.statusText}`);
  return res.json();
}

// src/identity/handler/login.ts
var import_server = require("next/server");
init_config();
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const config = getAuthConfig();
    const credentials = {
      clientId: body.clientId ?? config.clientId,
      clientSecret: body.clientSecret ?? config.clientSecret,
      username: body.username ?? config.username,
      password: body.password ?? config.password,
      Language: body.Language ?? config.language ?? 0,
      GMT: body.GMT ?? config.gmt ?? 3,
      IsFromNotification: false
    };
    const response = await loginUser(credentials);
    return import_server.NextResponse.json(
      {
        success: true,
        message: "Login successful",
        employeeStoreId: response.employeeStoreId || null,
        roles: response.roles || [],
        user: response.user || null
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed unexpectedly";
    console.error("Login error:", message);
    return import_server.NextResponse.json(
      { success: false, error: message },
      { status: 401 }
    );
  }
}

// src/identity/handler/logout.ts
var import_server2 = require("next/server");
async function POST2() {
  try {
    await logoutUser();
    return import_server2.NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";
    console.error("Logout error:", message);
    return import_server2.NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// src/identity/handler/getCustomersDropdown.ts
var import_server3 = require("next/server");
async function GET(request) {
  try {
    const url = new URL(request.url);
    const usernameRaw = url.searchParams.get("username");
    const fullNameRaw = url.searchParams.get("FullName");
    const username = usernameRaw !== null && usernameRaw.trim() !== "" ? usernameRaw.trim() : void 0;
    const FullName = fullNameRaw !== null && fullNameRaw.trim() !== "" ? fullNameRaw.trim() : void 0;
    const data = await getCustomersDropdown(username, FullName);
    return import_server3.NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch customers";
    console.error("getCustomersDropdown handler error:", message);
    return import_server3.NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomersDropdownGET,
  LoginPOST,
  LogoutPOST,
  getCustomersDropdown,
  loginUser,
  logoutUser
});
