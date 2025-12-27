export async function getOffersDeliveryZones(): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<any>(Api.getOffersDeiveryZones);
  }

  const res = await fetch(`/api/offers/deliveryZones`);
  if (!res.ok)
    throw new Error(`Failed to fetch offers deivery zones: ${res.statusText}`);
  return res.json();
}
