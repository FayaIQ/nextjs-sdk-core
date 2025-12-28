export async function getOffersDeliveryZones(id: string): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOffersDeliveryZones(id));
  }

  const res = await fetch(`/api/offers/delivery-zones/${id}`);
  if (!res.ok)
    throw new Error(`Failed to fetch offers deivery zones: ${res.statusText}`);
  return res.json();
}
