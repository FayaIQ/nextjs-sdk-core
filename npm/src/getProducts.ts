import { apiFetch } from "./fetcher";
import getToken from "./token";
import { Product } from "./types";
import { Api } from "./app/api/api";
import { ItemsFilterParameters } from "./filter-models";
export async function getProducts({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<Product> {
  const params = filterParams.toURLSearchParams();
  params.set("havePicture", "true");
  // Map categoryId -> menuId and remove categoryId
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch<Product>(`${Api.getProducts}${params.toString()}`, {
      token,
    });
  } else {
    return fetch(`/api/getProducts?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
