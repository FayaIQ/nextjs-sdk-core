import type { QueryParams } from "../../core/fetcher";

export async function getReportsCustomerOrders(query?: QueryParams): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getReportsCustomerOrders, query);
  }

  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, String(v));
    });
  }

  const res = await fetch(`/api/reports/customer-orders?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch customer orders report: ${res.statusText}`);
  return res.json();
}
