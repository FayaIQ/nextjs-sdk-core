// src/stores/getStoreDeliveryZones.ts
async function getStoreDeliveryZones(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getStoreDeliveryZones(storeId));
  }
  const res = await fetch(`/api/stores/${storeId}/delivery-zones`);
  if (!res.ok) throw new Error(`Failed to fetch delivery zones: ${res.statusText}`);
  return res.json();
}

export {
  getStoreDeliveryZones
};
