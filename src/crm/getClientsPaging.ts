import { ClientsPagingResponse } from "./client-models";

/**
 * Fetch paginated clients. Accepts an optional query object which will be
 * serialized to URL parameters.
 */
export async function getClientsPaging(query?: Record<string, any>): Promise<ClientsPagingResponse> {
  const qs = query ? `?${new URLSearchParams(query as Record<string, string>).toString()}` : "";

  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<ClientsPagingResponse>(`${Api.getClientsPaging}${qs}`);
  }

  const res = await fetch(`/api/crm/clients/paging${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients paging: ${res.statusText}`);
  return res.json();
}
