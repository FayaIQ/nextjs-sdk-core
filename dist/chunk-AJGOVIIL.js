// src/inventory/offers/getInvoiceDiscount.ts
async function getInvoiceDiscount(coupon) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getInvoiceDiscount(coupon));
  }
  const res = await fetch(
    `/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`
  );
  if (!res.ok)
    throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}

export {
  getInvoiceDiscount
};
