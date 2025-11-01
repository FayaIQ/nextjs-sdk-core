import {
  getMenus
} from "./chunk-HOLN63FT.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-3GF4S55Z.js";
import {
  getStoreInfo
} from "./chunk-TJBWLRAX.js";
import {
  getProductInfo,
  getProducts
} from "./chunk-QKBSLE2V.js";
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
} from "./chunk-627OBKGP.js";
import {
  apiFetch
} from "./chunk-KYRAWEHI.js";
import {
  getToken
} from "./chunk-3GFDDB2C.js";

// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-HY2UR7S7.js");
    const { Api: Api2 } = await import("./api-25UVO5DL.js");
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
