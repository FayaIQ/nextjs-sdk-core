// src/inventory/payments/getPayments.ts
async function getPayments(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getPayments, query);
  }
  const params = new URLSearchParams();
  if (query) Object.entries(query).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) params.append(k, String(v));
  });
  const res = await fetch(`/api/payments?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.statusText}`);
  return res.json();
}

export {
  getPayments
};
