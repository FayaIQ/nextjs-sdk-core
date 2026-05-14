export async function getOfferGroupsCoupons(offerId: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOfferGroupsCoupons(offerId));
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups/coupons`);
  if (!res.ok) throw new Error(`Failed to fetch offer groups coupons: ${res.statusText}`);
  return res.json();
}
