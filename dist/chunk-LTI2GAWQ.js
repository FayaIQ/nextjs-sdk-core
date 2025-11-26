// src/inventory/offers/putOffersShippingDiscount.ts
async function putOffersShippingDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return putWithAuth(Api.putOffersShippingDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/shipping-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}

export {
  putOffersShippingDiscount
};
