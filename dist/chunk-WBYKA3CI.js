// src/inventory/offers/postOffersDeliveryZones.ts
async function postOffersDeliveryZones(offerId, payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.postOffersDeliveryZones(offerId), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/delivery-zones`, {
    method: "POST",
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
  postOffersDeliveryZones
};
