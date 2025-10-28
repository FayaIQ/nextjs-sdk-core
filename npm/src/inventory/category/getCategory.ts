import { Category } from "./types";

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
