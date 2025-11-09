export async function putOffersGroup(offerId: string | number, id: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<any>(Api.putOffersGroup(offerId, id), payload);
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update offer group: ${res.statusText}`);
  return res.json();
}
