// src/inventory/offers/getCoupons.ts
async function getCoupons() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-JWWNRBX7.js");
    return getWithAuth(Api.getCouponOffers);
  }
  const response = await fetch(`/api/offers/coupons`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/offers/handler/coupons.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const Coupons = await getCoupons();
    return NextResponse.json(Coupons);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export {
  GET as CouponsGET,
  getCoupons
};
