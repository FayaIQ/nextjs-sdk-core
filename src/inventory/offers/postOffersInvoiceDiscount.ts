export async function postOffersInvoiceDiscount(payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersInvoiceDiscount, payload);
  }

  const res = await fetch(`/api/offers/invoice-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to post invoice discount: ${res.statusText}`);
  return res.json();
}
