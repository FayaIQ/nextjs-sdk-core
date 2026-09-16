import { SortType, ItemsFilterParameters } from "../items/filter-models";

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
export async function getFilterParams({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<any> {
  // Ensure sortType is always defined and valid.
  // If missing or invalid, default to SortType.None (safe default).
  const validSortValues = Object.values(SortType) as string[];
  if (
    !filterParams.sortType ||
    !validSortValues.includes(filterParams.sortType)
  ) {
    // Use copyWith to avoid mutating caller's instance
    filterParams = filterParams.copyWith({ sortType: SortType.None });
  }

  const params = filterParams.toURLSearchParams();
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    console.log(
      "Fetching filter parameters:",
      `${Api.getFilterParams}?${params.toString()}`,
    );
    return getWithAuth<any>(`${Api.getFilterParams}?${params.toString()}`);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/menus/filterParams?${params.toString()}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch filter parameters: ${response.statusText}`,
    );
  }

  return response.json();
}
