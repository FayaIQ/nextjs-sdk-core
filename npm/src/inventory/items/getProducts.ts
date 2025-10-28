import type { Product } from "../../types";
import type { ItemsFilterParameters } from "../../filter-models";

export interface ProductResponse {
  currentPage: number;
  currentSortField: null;
  currentSortOrder: null;
  nextSortOrder: null;
  pageCount: number;
  pageSize: number;
  results: Product[];
  rowCount: number;
  sortField: null;
}
/**
 * Fetches a list of products with optional filtering and pagination
 * Works in both server and client components
 *
 * @param filterParams - Filter parameters for products (pagination, sorting, etc.)
 * @returns Promise with product data
 *
 * @example
 * // Server component
 * const products = await getProducts({
 *   filterParams: new ItemsFilterParameters({ currentPage: 1, pageSize: 20 })
 * });
 *
 * @example
 * // Client component
 * const products = await getProducts({
 *   filterParams: new ItemsFilterParameters({ sortType: SortType.Newest })
 * });
 */
export async function getProducts({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<ProductResponse> {
  const params = filterParams.toURLSearchParams();
  params.set("havePicture", "true");

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return getWithAuth<ProductResponse>(
      `${Api.getProducts}?${params.toString()}`
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/getProducts?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}
