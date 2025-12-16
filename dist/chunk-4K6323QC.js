// src/inventory/payments/getPaymentById.ts
async function getPaymentById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getPayment(id));
  }
  const res = await fetch(`/api/payments/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch payment: ${res.statusText}`);
  return res.json();
}

export {
  getPaymentById
};
