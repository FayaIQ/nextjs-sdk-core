// src/inventory/payments/getStorePayments.ts
async function getStorePayments(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getStorePayments(storeId));
  }
  const res = await fetch(`/api/stores/${storeId}/payments`);
  if (!res.ok) throw new Error(`Failed to fetch store payments: ${res.statusText}`);
  return res.json();
}

export {
  getStorePayments
};
