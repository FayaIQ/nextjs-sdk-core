import { Category } from "./types";

/**
 * Fetches a list of categories from the server
 * Works in both server and client components
 *
 * @returns Promise with category data
 *
 * @example
 * // Server component
 * const categories = await getCatigories();
 *
 * @example
 * // Client component
 * const categories = await getCatigories();
 */
export async function getCatigories(): Promise<Category[]> {
  if (typeof window === "undefined") {
    const {getWithAuth} = await import("../../core");
    const { Api } = await import("../../api/api");

    return getWithAuth<Category[]>(`${Api.getCatigories}`, {
    });
  } else {
    return fetch(`/api/categories`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
