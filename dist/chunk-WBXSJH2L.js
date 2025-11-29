// src/inventory/items/getItemById.ts
async function getItemById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getItemById(id));
  }
  const response = await fetch(`/api/items/${id}/info`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item: ${response.statusText}`);
  }
  return response.json();
}

export {
  getItemById
};
