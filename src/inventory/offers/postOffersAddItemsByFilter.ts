export async function postOffersAddItemsByFilter(
  offerId: string | number,
  forceUpdate: boolean,
  payload: {
    menuId: number;
    brandId: number;
    itemAge: number;
    itemGender: number;
    minPriceRange: number;
    maxPriceRange: number;
    forceUpdate?: boolean;
  }
): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersAddItemsByFilter(offerId, forceUpdate), payload as any);
  }

  const res = await fetch(`/api/offers/${offerId}/add-items-by-filter/${String(forceUpdate)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add items by filter: ${res.statusText}`);
  return res.json();
}
