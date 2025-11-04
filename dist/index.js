import {
  getProductInfo,
  getProducts
} from "./chunk-RHLZ4SH7.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-IPMAWMHA.js";
import {
  Api
} from "./chunk-42A257EX.js";
import {
  apiFetch
} from "./chunk-JXHGVLUB.js";
import {
  getToken
} from "./chunk-ICGV7HSU.js";
import {
  getStoreInfo
} from "./chunk-AJYRB4GH.js";
import {
  getMenus
} from "./chunk-VOJ757A5.js";
import {
  AgeGroup,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  SortType
} from "./chunk-QPGSHSJO.js";

// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-KXVTZLUJ.js");
    const { Api: Api2 } = await import("./api-NLZGVKFO.js");
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
