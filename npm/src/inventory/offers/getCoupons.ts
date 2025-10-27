import { getWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

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
export async function getCoupons() {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    return getWithAuth(Api.getCouponOffers);
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/offers/coupons`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}
