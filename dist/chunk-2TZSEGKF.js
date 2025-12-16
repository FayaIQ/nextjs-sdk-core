// src/inventory/offers/getOffersPaging.ts
async function getOffersPaging(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getOffersPaging, query);
  }
  const qs = query ? new URLSearchParams(query).toString() : "";
  const res = await fetch(`/api/offers/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch offers: ${res.statusText}`);
  return res.json();
}

export {
  getOffersPaging
};
