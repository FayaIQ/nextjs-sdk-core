// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { default: getToken } = await import("./token.js");
    const { Api } = await import("./api/api.js");
    const token = await getToken();
    return getWithAuth(
      `${Api.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

export {
  getOrders
};
