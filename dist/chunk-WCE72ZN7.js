import {
  Api
} from "./chunk-4D7LFOTQ.js";
import {
  getWithAuth
} from "./chunk-67SISKBJ.js";

// src/inventory/items/getItemsPaging.ts
async function getItemsPaging(filters) {
  const params = new URLSearchParams();
  if (filters) {
    const filterParams = filters.toURLSearchParams();
    filterParams.forEach((value, key) => {
      params.set(key, value);
    });
  }
  params.set("GetMultipleMenu", "true");
  const queryString = params.toString();
  const url = queryString ? `${Api.getItemsPaging}?${queryString}` : Api.getItemsPaging;
  if (typeof window !== "undefined") {
    const localUrl = queryString ? `/api/items/paging?${queryString}` : `/api/items/paging`;
    const response = await fetch(localUrl);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch items paging: ${response.status} ${errorText}`
      );
    }
    return response.json();
  }
  return getWithAuth(url);
}

export {
  getItemsPaging
};
