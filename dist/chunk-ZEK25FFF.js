// src/inventory/orders/getOrdersFullInfo.ts
async function getOrdersFullInfo(input) {
  const orderIds = Array.isArray(input) ? input : input.orderIds ?? input.body ?? [];
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.getOrderFullInfo, { orderIds });
  }
  const response = await fetch("/api/orders/full-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderIds })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

export {
  getOrdersFullInfo
};
