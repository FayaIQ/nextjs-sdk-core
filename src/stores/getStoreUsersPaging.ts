import type { StoreUsersPagingResponse } from "./store-users-models";

/**
 * Get store users with paging and filters.
 * Pass an optional params object to set query parameters (e.g., { Username: 'abc', CurrentPage: 1 })
 */
export async function getStoreUsersPaging(params?: Record<string, any>): Promise<StoreUsersPagingResponse> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");

    const qs = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    const url = qs ? `${Api.getStoreUsersPaging}?${qs}` : Api.getStoreUsersPaging;
    return getWithAuth<StoreUsersPagingResponse>(url);
  }

  const qs = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
  const res = await fetch(`/api/store-users/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch store users: ${res.statusText}`);
  return res.json();
}
