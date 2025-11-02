export async function deleteOffer(id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return deleteWithAuth<any>(Api.deleteOffer(id));
  }

  const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete offer ${id}: ${res.statusText}`);
  return res.json();
}
