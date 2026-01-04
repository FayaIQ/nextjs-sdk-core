import {
  SortType
} from "./chunk-Q3KXH3LE.js";

// src/inventory/items/getProducts.ts
async function getProducts({
  filterParams
}) {
  const validSortValues = Object.values(SortType);
  if (!filterParams.sortType || !validSortValues.includes(filterParams.sortType)) {
    filterParams = filterParams.copyWith({ sortType: "None" /* None */ });
  }
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-R4TTH3KN.js");
    const { Api } = await import("./api-IWWKU55Q.js");
    return getWithAuth(
      `${Api.getProducts}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-R4TTH3KN.js");
    const { Api } = await import("./api-IWWKU55Q.js");
    return getWithAuth(`${Api.getProductInfo(id)}`);
  }
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

export {
  getProducts,
  getProductInfo
};
