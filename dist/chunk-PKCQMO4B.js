// src/inventory/offers/postOffersAddItemsByFilter.ts
async function postOffersAddItemsByFilter(offerId, forceUpdate, payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.postOffersAddItemsByFilter(offerId, forceUpdate), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/add-items-by-filter/${String(forceUpdate)}`, {
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
  postOffersAddItemsByFilter
};
