import { getWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";
import { WishesResponse } from "./types";

export interface GetWishesParams {
  currentPage?: number;
  pageSize?: number;
  // Add other filter params as needed
}

/**
 * Get wishes with pagination
 * @param params - Pagination and filter parameters
 * @returns Promise with WishesResponse
 */
export async function getWishes(
  params?: GetWishesParams
): Promise<WishesResponse> {
  if (typeof window === "undefined") {
    // Server-side: call API directly
    const queryParams = new URLSearchParams();
    
    if (params?.currentPage) {
      queryParams.set("currentPage", params.currentPage.toString());
    }
    if (params?.pageSize) {
      queryParams.set("pageSize", params.pageSize.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${Api.getWishes}?${queryString}` : Api.getWishes;

    return getWithAuth<WishesResponse>(url);
  }

  // Client-side: proxy through Next.js API route
  const queryParams = new URLSearchParams();
  
  if (params?.currentPage) {
    queryParams.set("currentPage", params.currentPage.toString());
  }
  if (params?.pageSize) {
    queryParams.set("pageSize", params.pageSize.toString());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/api/wishes?${queryString}` : `/api/wishes`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch wishes: ${res.statusText}`);
  return res.json();
}
