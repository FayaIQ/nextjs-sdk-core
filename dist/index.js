import {
  getStoreInfo
} from "./chunk-G5HCR3PJ.js";
import {
  getProductInfo,
  getProducts
} from "./chunk-U6Q5FWPZ.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-CSQCZ3FH.js";
import {
  getMenus
} from "./chunk-3B746WRM.js";
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
} from "./chunk-HCBNRXOI.js";
import {
  apiFetch
} from "./chunk-WWKX3HSA.js";
import {
  getToken
} from "./chunk-C347AHO2.js";

// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-TNCNK5RR.js");
    const { Api: Api2 } = await import("./api-QN4A3WS4.js");
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
