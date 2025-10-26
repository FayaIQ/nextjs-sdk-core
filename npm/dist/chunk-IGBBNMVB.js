import {
  Api,
  apiFetch,
  getToken
} from "./chunk-LK3IED6J.js";

// src/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(`${Api.getProductInfo(id)}/`, {
      token
    });
  }
  const response = await fetch(`/api/productInfo/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product info: ${response.statusText}`);
  }
  return response.json();
}

export {
  getProductInfo
};
