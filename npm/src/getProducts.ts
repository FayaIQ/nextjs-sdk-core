import { apiFetch } from "./fetcher";
import getToken from "./token";
import { API_ROUTES } from "./config";
import type { Product } from "./types";
import type { ItemsFilterParameters } from "./filter-models";

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
}): Promise<Product> {
  const params = filterParams.toURLSearchParams();
  params.set("havePicture", "true");

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch<Product>(`${API_ROUTES.products}?${params.toString()}`, {
      token,
    });
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/getProducts?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  
  return response.json();
}

