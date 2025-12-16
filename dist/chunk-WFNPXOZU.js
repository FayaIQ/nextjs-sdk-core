// src/inventory/orders/getOrder.ts
async function getOrder(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(
      `${Api.getOrder(id)}`
    );
  }
  const response = await fetch(`/api/orders/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

export {
  getOrder
};
