// src/inventory/orders/putOrderChangeStatus.ts
async function putOrderChangeStatus(orderId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return await putWithAuth(Api.putChangeStatusOrder(orderId), data);
  }
  const res = await fetch(`/api/orders/${orderId}/change-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to change order status: ${res.statusText}`);
  }
  return res.json();
}

export {
  putOrderChangeStatus
};
