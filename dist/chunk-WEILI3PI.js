// src/inventory/orders/putOrderReferenceDeliveryId.ts
async function putOrderReferenceDeliveryId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return await putWithAuth(Api.putOrderReferenceDeliveryId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceDeliveryId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference delivery ID: ${res.statusText}`);
  }
  return res.json();
}

export {
  putOrderReferenceDeliveryId
};
