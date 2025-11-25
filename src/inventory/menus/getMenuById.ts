import { Category } from "../../types";

/**
 * Fetch a single menu by ID (v1)
 */
export async function getMenuById(id: string | number): Promise<Category> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Category>(Api.getMenuById(id));
  }

  const res = await fetch(`/api/menus/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch menu ${id}: ${res.statusText}`);
  return res.json();
}
