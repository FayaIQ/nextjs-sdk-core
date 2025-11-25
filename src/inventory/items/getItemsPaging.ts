import { getWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";
import { ItemsFilterParameters } from "./filter-models";
import { ProductResponse } from "./types";

export type GetItemsPagingParams = ItemsFilterParameters;

/**
 * Get items with pagination (v2 API)
 * @param filters - Filter parameters for items
 * @returns Promise with ProductResponse
 */
export async function getItemsPaging(
  filters?: GetItemsPagingParams
): Promise<ProductResponse> {
  // Build query params from filters
  const params = new URLSearchParams();

  if (filters) {
    const filterParams = filters.toURLSearchParams();
    filterParams.forEach((value, key) => {
      params.set(key, value);
    });
  }

  // Always set GetMultipleMenu to true
  params.set("GetMultipleMenu", "true");

  const queryString = params.toString();
  const url = queryString
    ? `${Api.getItemsPaging}?${queryString}`
    : Api.getItemsPaging;

  // Client-side: call local API route
  if (typeof window !== "undefined") {
    const localUrl = queryString
      ? `/api/items/paging?${queryString}`
      : `/api/items/paging`;
    const response = await fetch(localUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch items paging: ${response.status} ${errorText}`
      );
    }

    return response.json();
  }

  // Server-side: call external API with auth
  return getWithAuth<ProductResponse>(url);
}
