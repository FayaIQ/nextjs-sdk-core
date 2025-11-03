export async function postOffersCustomerDiscount(payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersCustomerDiscount, payload);
  }

  const res = await fetch(`/api/offers/customer-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to post customer discount: ${res.statusText}`);
  return res.json();
}
