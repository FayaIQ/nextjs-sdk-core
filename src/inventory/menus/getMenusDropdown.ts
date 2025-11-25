import { Category } from "../../types";
export async function getMenusDropdown(): Promise<Category> {
  // Map categoryId -> menuId and remove categoryId
  if (typeof window === "undefined") {
    const {getWithAuth} = await import("../../core");
    const { Api } = await import("../../api/api");
    
    return getWithAuth<Category>(`${Api.getMenusDropdown}`, {
    });
  } else {
    return fetch(`/api/menus/dropdown`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}


