import { ProductResponse } from "./types";
import { ItemsFilterParameters } from "./filter-models";

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
