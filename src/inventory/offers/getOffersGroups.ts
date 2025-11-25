export async function getOffersGroups(offerId: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOffersGroups(offerId));
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups`);
  if (!res.ok) throw new Error(`Failed to fetch offer groups: ${res.statusText}`);
  return res.json();
}
