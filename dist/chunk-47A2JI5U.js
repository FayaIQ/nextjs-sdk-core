// src/inventory/offers/getOffersDeliveryZones.ts
async function getOffersDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-RXETYHEA.js");
    const { Api } = await import("./api-GMXANBP6.js");
    return getWithAuth(Api.getOffersDeiveryZones);
  }
  const res = await fetch(`/api/offers/deliveryZones`);
  if (!res.ok)
    throw new Error(`Failed to fetch offers deivery zones: ${res.statusText}`);
  return res.json();
}

export {
  getOffersDeliveryZones
};
