import type { QueryParams } from "../../core/fetcher";
import type { OrderSalesResponse } from "./types";

export async function getReportsOrderSales(query?: QueryParams): Promise<OrderSalesResponse> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getReportsOrderSales, query);
  }

  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, String(v));
    });
  }

  const res = await fetch(`/api/reports/order-sales?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch order sales report: ${res.statusText}`);
  return res.json();
}
