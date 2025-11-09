export async function postOffersDeliveryZones(offerId: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersDeliveryZones(offerId), payload);
  }

  const res = await fetch(`/api/offers/${offerId}/delivery-zones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`${err.message || res.statusText}`);
  }
  return res.json();
}
