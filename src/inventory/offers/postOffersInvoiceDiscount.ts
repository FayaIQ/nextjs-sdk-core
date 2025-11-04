import { postOffersInvoiceDiscountRequest } from "./types";

export async function postOffersInvoiceDiscount(payload: postOffersInvoiceDiscountRequest): Promise<string> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
  // payload may be a stricter typed object; cast to any to satisfy RequestData index signature
  return postWithAuth<string>(Api.postOffersInvoiceDiscount, payload);
  }

  const res = await fetch(`/api/offers/invoice-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to post invoice discount: ${res.statusText}`);
  return res.json();
}
