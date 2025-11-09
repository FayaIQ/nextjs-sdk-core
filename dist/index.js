import {
  getProductInfo,
  getProducts
} from "./chunk-SCGWGFKY.js";
import {
  DeleveryType,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PayType,
  Sign,
  getOrders
} from "./chunk-3EOJGG5L.js";
import {
  Api
} from "./chunk-KIHC3O2A.js";
import {
  apiFetch
} from "./chunk-PQAOJ3ST.js";
import {
  getToken
} from "./chunk-XNEK5DJN.js";
import {
  getStoreInfo
} from "./chunk-GASTLNTX.js";
import {
  getMenus
} from "./chunk-RYQWNGV2.js";
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
    const { getWithAuth } = await import("./fetcher-M5RQ6SLN.js");
    const { Api: Api2 } = await import("./api-PZO3QWDP.js");
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
