// file   : nextjs-sdk-core/npm/src/inventory/offers/handler/coupons.ts

import { NextRequest, NextResponse } from "next/server";
import { getCoupons } from "../getCoupons";

/**
 * Ready-to-use API route handler for coupons
 * Users can simply re-export this in their app/api/getCoupons/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/coupons';
 */
export async function GET(request: NextRequest) {
  try {
    const Coupons = await getCoupons();
    return NextResponse.json(Coupons);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
