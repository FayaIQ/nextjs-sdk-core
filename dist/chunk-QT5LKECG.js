// src/inventory/reports/getOrderSales.ts
async function getReportsOrderSales(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getReportsOrderSales, query);
  }
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
  }
  const res = await fetch(`/api/reports/order-sales?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch order sales report: ${res.statusText}`);
  return res.json();
}

export {
  getReportsOrderSales
};
