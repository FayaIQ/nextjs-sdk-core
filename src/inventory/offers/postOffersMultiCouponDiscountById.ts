import { postOffersMultiCouponDiscountRequest } from "./types";

export async function postOffersMultiCouponDiscountById(id: string | number, payload: postOffersMultiCouponDiscountRequest): Promise<string> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<string>(Api.postOffersMultiCouponDiscountById(id), payload);
  }

  const res = await fetch(`/api/offers/${id}/multi-coupon-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    const errorBody = await res.json();
    errorMessage = errorBody.error || errorBody.message || errorMessage;
    throw new Error(errorMessage);
  }
  return res.json();
}
