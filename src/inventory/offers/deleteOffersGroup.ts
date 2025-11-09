export async function deleteOffersGroup(offerId: string | number, id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return deleteWithAuth<any>(Api.deleteOffersGroup(offerId, id));
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete offer group: ${res.statusText}`);
  return res.json();
}
