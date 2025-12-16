// src/inventory/payments/putPayment.ts
async function putPayment(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(Api.putPayment(id), payload);
  }
  const res = await fetch(`/api/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to update payment: ${res.statusText}`);
  return res.json();
}

export {
  putPayment
};
