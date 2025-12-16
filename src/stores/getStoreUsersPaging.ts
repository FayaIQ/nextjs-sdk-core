import type { NextRequest } from "next/server";

/**
 * Parameters accepted by getStoreUsersPaging
 */
export type StoreUserPagingParams = {
  Username?: string | null;
  FullName?: string | null;
  Email?: string | null;
  EmailConfirmed?: boolean | null;
  Phone?: string | null;
  PhoneNumberConfirmed?: boolean | null;
  Gender?: number | null;
  Birthdate?: string | null; // ISO date-time
  Role?: string | null;
  Roles?: string[] | null;
  CurrentPage?: number;
  PageSize?: number;
  SortField?: string | null;
  CurrentSortField?: string | null;
  CurrentSortOrder?: string | null;
  // allow additional arbitrary query params
  [k: string]: any;
};

/**
 * Fetch paged store users from the Store service.
 * Works both server-side (calls upstream service directly) and client-side (calls nextjs API route).
 */
export async function getStoreUsersPaging(
  params: StoreUserPagingParams = {}
): Promise<any> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      // Arrays should be serialized as repeated params
      if (Array.isArray(v)) {
        v.forEach((x) => qs.append(k, String(x)));
      } else {
        qs.append(k, String(v));
      }
    }
  });

  // Server-side: call upstream Store service
  if (typeof window === "undefined") {
  const { getWithAuth } = await import("../core/fetcher");
  const { Api } = await import("../api/api");
  const url = Api.getStoreUsersPaging;
  return getWithAuth<any>(`${url}?${qs.toString()}`);
  }

  // Client-side: proxy through local Next.js API route
  const res = await fetch(`/api/stores/users/paging?${qs.toString()}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch store users: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}
