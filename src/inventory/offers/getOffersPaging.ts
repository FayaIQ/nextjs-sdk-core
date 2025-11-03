import { OffersPagingResponse } from "./types";

/**
 * Fetch paginated offers
 */
export async function getOffersPaging(query?: Record<string, any>): Promise<OffersPagingResponse> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<OffersPagingResponse>(Api.getOffersPaging, query);
  }

  const qs = query ? new URLSearchParams(query as Record<string,string>).toString() : "";
  const res = await fetch(`/api/offers/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch offers: ${res.statusText}`);
  return res.json();
}
