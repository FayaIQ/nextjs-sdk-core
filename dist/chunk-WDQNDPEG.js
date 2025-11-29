// src/inventory/payments/getPaymentsReport.ts
async function getPaymentsReport(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getPaymentsReport, query);
  }
  const params = new URLSearchParams();
  if (query) Object.entries(query).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) params.append(k, String(v));
  });
  const res = await fetch(`/api/payments/report?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch payments report: ${res.statusText}`);
  return res.json();
}

export {
  getPaymentsReport
};
