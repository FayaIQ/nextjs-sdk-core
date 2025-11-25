import { ProductResponse } from "./types";
import { ItemsFilterParameters } from "./filter-models";


/**
 * Fetches a list of products with optional filtering and pagination

  * Works in both server and client components
  *
  * @returns Promise with product data
  * @example
  * // Server component
  * const filterParams = new ItemsFilterParameters();
  * filterParams.page = 1;
  * const products = await getParentProducts({ filterParams });
  * @example
  * // Client component
  * const filterParams = new ItemsFilterParameters();
  * filterParams.page = 1;
  * const products = await getParentProducts({ filterParams });
  * /
  * */
 
export async function getParentProducts({
  filterParams,
}: {
  filterParams: ItemsFilterParameters
}): Promise<ProductResponse> {
  if (typeof window === "undefined") {
    const {getWithAuth} = await import("../../core");
    const { Api } = await import("../../api/api");
     const params = filterParams.toURLSearchParams();

    return getWithAuth<ProductResponse>(`${Api.getParentProducts}?${params.toString()}`, {
    });
  } else {
    return fetch(`/api/items/parent?${filterParams.toURLSearchParams().toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
