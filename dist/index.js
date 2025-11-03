import {
  getProductInfo,
  getProducts
} from "./chunk-U4NGO4DQ.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-KO77PSJ6.js";
import {
  Api
} from "./chunk-CKBJVO52.js";
import {
  apiFetch
} from "./chunk-G3RE74RT.js";
import {
  getToken
} from "./chunk-7HFB7GTE.js";
import {
  getStoreInfo
} from "./chunk-JD3KDLWM.js";
import {
  getMenus
} from "./chunk-NGOXVTHO.js";
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
    const { getWithAuth } = await import("./fetcher-53SEI2RB.js");
    const { Api: Api2 } = await import("./api-ALZDPWU7.js");
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
