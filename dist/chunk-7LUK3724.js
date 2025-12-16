// src/inventory/items/putDeactivate.ts
async function putDeactivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(Api.putItemDeactivate(id));
  }
  const res = await fetch(`/api/items/${id}/deactivate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Deactivate item failed: ${res.statusText}`);
  return res.json();
}

export {
  putDeactivateItem
};
