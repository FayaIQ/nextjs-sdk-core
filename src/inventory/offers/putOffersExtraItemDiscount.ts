export async function putOffersExtraItemDiscount(id: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<any>(Api.putOffersExtraItemDiscount(id), payload);
  }

  const res = await fetch(`/api/offers/${id}/extra-item-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to put extra item discount: ${res.statusText}`);
  return res.json();
}
