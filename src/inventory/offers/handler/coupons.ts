// file   : nextjs-sdk-core/npm/src/inventory/offers/handler/coupons.ts

import { NextRequest, NextResponse } from "next/server";
import { getCoupons } from "../getCoupons";
import { toNextResponseFromError } from "../../../core/errorResponse";

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
    return toNextResponseFromError(error);
  }
}
