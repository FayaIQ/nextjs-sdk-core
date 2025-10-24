import { apiFetch } from "./fetcher";
import getToken from "./token";
import { API_ROUTES } from "./config";
import type { StoreInfo } from "./types";

/**
 * Fetches store information
 * Works in both server and client components
 * 
 * @returns Promise with store information
 * 
 * @example
 * // Server component
 * const storeInfo = await getStoreInfo();
 * 
 * @example
 * // Client component
 * const storeInfo = await getStoreInfo();
 */
export async function getStoreInfo(): Promise<StoreInfo> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch<StoreInfo>(API_ROUTES.storeInfo, { token });
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/storeInfo");
  
  if (!response.ok) {
    throw new Error(`Failed to fetch store info: ${response.statusText}`);
  }
  
  return response.json();
}

