// src/inventory/items/putActivate.ts
async function putActivateItem(id) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(Api.putItemActivate(id));
  }
  const res = await fetch(`/api/items/${id}/activate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Activate item failed: ${res.statusText}`);
  return res.json();
}

export {
  putActivateItem
};
