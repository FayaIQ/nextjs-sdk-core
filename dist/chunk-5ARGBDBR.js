// src/inventory/items/deleteItem.ts
async function deleteItem(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return deleteWithAuth(Api.deleteItem(id));
  }
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete item: ${res.statusText}`);
  return res.json();
}

export {
  deleteItem
};
