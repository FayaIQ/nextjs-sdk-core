// src/inventory/items/getParentProducts.ts
async function getParentProducts({
  filterParams
}) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    const params = filterParams.toURLSearchParams();
    return getWithAuth(`${Api.getParentProducts}?${params.toString()}`, {});
  } else {
    return fetch(`/api/items/parent?${filterParams.toURLSearchParams().toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getParentProducts
};
