// file   : nextjs-sdk-core/npm/src/inventory/orders/handler/orders.ts

import { NextRequest, NextResponse } from "next/server";
import { getSlides } from "../getSlides";

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getSlides/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getSlides';
 */
export async function GET(request: NextRequest) {
  try {
    const Slides = await getSlides();
    return NextResponse.json(Slides);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch slides";
    console.error("slides error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
