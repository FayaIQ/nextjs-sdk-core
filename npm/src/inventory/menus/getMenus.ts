import { Category } from "../../types";
import { ItemsFilterParameters } from "../items/filter-models";
export async function getMenus({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<Category[]> {
  const params = filterParams.toURLSearchParams();
  // Map categoryId -> menuId and remove categoryId
  if (typeof window === "undefined") {
    const {getWithAuth} = await import("../../core");
    const { Api } = await import("../../api/api");

    return getWithAuth<Category>(`${Api.getMenus}?${params.toString()}`, {
    });
  } else {
    return fetch(`/api/menus?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
