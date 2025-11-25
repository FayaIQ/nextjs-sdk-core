import type { QueryParams } from "../../core/fetcher";

export async function getPayments(query?: QueryParams): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getPayments, query);
  }

  const params = new URLSearchParams();
  if (query) Object.entries(query).forEach(([k, v]) => { if (v !== undefined && v !== null) params.append(k, String(v)); });

  const res = await fetch(`/api/payments?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch payments: ${res.statusText}`);
  return res.json();
}
