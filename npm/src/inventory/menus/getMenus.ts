import { apiFetch } from "../../fetcher";
import getToken from "../../token";
import { Category } from "../../types";
import { Api } from "../../api/api";
import { ItemsFilterParameters } from "../../filter-models";
export async function getMenus({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<Category> {
  const params = filterParams.toURLSearchParams();
  params.set("havePicture", "true");
  // Map categoryId -> menuId and remove categoryId
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch<Category>(`${Api.getMenus}?${params.toString()}`, {
      token,
    });
  } else {
    return fetch(`/api/Menus?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
