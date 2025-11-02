export async function getInvoiceDiscount(coupon: string): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithoutAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithoutAuth<any>(Api.getInvoiceDiscount(coupon));
  }

  const res = await fetch(`/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`);
  if (!res.ok) throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}
