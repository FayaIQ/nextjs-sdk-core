// src/stores/getStoreDeliveryZones.ts
async function getStoreDeliveryZones(storeId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getStoreDeliveryZones(storeId));
  }
  const res = await fetch(`/api/stores/${storeId}/delivery-zones`);
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export {
  getStoreDeliveryZones
};
