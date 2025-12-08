// src/inventory/offers/getOfferById.ts
async function getOfferById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getOfferById(id));
  }
  const res = await fetch(`/api/offers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch offer ${id}: ${res.statusText}`);
  return res.json();
}

export {
  getOfferById
};
