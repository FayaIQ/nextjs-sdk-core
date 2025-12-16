// src/inventory/orders/putOrderReferenceId.ts
async function putOrderReferenceId(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return await putWithAuth(Api.putOrderReferenceId(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/referenceId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference ID: ${res.statusText}`);
  }
  return res.json();
}

export {
  putOrderReferenceId
};
