import {
  getMenus
} from "./chunk-ZFEZCDR4.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-BUSXLLPX.js";
import {
  getStoreInfo
} from "./chunk-GOOOAKXF.js";
import {
  getProductInfo,
  getProducts
} from "./chunk-5GBN2NQB.js";
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
} from "./chunk-NBTINCB2.js";
import {
  apiFetch
} from "./chunk-BKFAEDP3.js";
import {
  getToken
} from "./chunk-OREK46JA.js";

// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-RNT3HCN6.js");
    const { Api: Api2 } = await import("./api-JWWNRBX7.js");
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
