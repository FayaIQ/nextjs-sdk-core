// src/inventory/payments/postPayment.ts
async function postPayment(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.postPayments, payload);
  }
  const res = await fetch(`/api/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to create payment: ${res.statusText}`);
  return res.json();
}

export {
  postPayment
};
