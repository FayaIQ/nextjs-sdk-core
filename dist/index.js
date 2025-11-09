import {
  getMenus
} from "./chunk-FLZOVLM3.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-BTBL7FUP.js";
import {
  getStoreInfo
} from "./chunk-KBHVQY7J.js";
import {
  getProductInfo,
  getProducts
} from "./chunk-DWYXY4PV.js";
import {
  AgeGroup,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  SortType
} from "./chunk-QPGSHSJO.js";
import {
  Api
} from "./chunk-U323EROZ.js";
import {
  apiFetch
} from "./chunk-DPG6VFP2.js";
import {
  getToken
} from "./chunk-QGIRUB4D.js";

// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-HKQGA2FY.js");
    const { Api: Api2 } = await import("./api-2XXZYWI5.js");
    return getWithAuth(Api2.getSlideShows);
  }
  const response = await fetch(`/api/slides?`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}
export {
  AgeGroup,
  Api,
  DeleveryType,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PagingParameters,
  PayType,
  Sign,
  SortType,
  apiFetch,
  getMenus,
  getOrders,
  getProductInfo,
  getProducts,
  getSlides,
  getStoreInfo,
  getToken
};
