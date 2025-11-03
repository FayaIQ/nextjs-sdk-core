export async function postOffersShippingDiscount(payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersShippingDiscount, payload);
  }

  const res = await fetch(`/api/offers/shipping-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to post shipping discount: ${res.statusText}`);
  return res.json();
}
