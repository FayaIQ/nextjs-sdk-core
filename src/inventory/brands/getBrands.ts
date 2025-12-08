import { GetBrandsResponse } from "./types";

/**
 * Get menu brands list
 *
 * Server-side: Uses authenticated API call with getWithAuth
 * Client-side: Uses Next.js API route handler
 *
 * @returns Promise with brands array
 *
 * @example
 * // Server Component
 * const brands = await getBrands();
 *
 * @example
 * // Client Component
 * const brands = await getBrands();
 */
export async function getBrands(): Promise<GetBrandsResponse> {
  if (typeof window === "undefined") {
    // Server-side: use authenticated request
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");

    return getWithAuth<GetBrandsResponse>(Api.getBrands);
  } else {
    // Client-side: use Next.js API route
    const response = await fetch("/api/brands");
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  }
}
