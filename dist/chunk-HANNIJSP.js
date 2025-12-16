// src/inventory/items/getProductInfoV2.ts
async function getProductInfoV2(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getProductInfoV2(id)}`);
  }
  const response = await fetch(`/api/products/v2/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product info v2: ${response.statusText}`);
  }
  return response.json();
}

export {
  getProductInfoV2
};
