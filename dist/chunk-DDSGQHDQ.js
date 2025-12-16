// src/inventory/offers/putOffersItemsDiscountCustomers.ts
async function putOffersItemsDiscountCustomers(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(Api.putOffersItemsDiscountCustomers(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount/customers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put items discount customers: ${res.statusText}`);
  return res.json();
}

export {
  putOffersItemsDiscountCustomers
};
