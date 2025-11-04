export async function putOffersShippingDiscount(id: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<any>(Api.putOffersShippingDiscount(id), payload);
  }

  const res = await fetch(`/api/offers/${id}/shipping-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to put shipping discount: ${res.statusText}`);
  return res.json();
}
