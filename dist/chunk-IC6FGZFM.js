// src/inventory/offers/getOffersGroups.ts
async function getOffersGroups(offerId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getOffersGroups(offerId));
  }
  const res = await fetch(`/api/offers/${offerId}/offer-groups`);
  if (!res.ok) throw new Error(`Failed to fetch offer groups: ${res.statusText}`);
  return res.json();
}

export {
  getOffersGroups
};
