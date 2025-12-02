// src/inventory/items/getProducts.ts
async function getProducts({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-3V27P4JR.js");
    const { Api } = await import("./api-RO5SLBPK.js");
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
    const { getWithAuth } = await import("./fetcher-3V27P4JR.js");
    const { Api } = await import("./api-RO5SLBPK.js");
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
