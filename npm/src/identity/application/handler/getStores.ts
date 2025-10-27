import { NextRequest, NextResponse } from "next/server";
import { getStores } from "../getStores";

/**
 * Ready-to-use API route handler for stores
 * Users can simply re-export this in their app/api/applications/stores/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/applications/handler/stores';
 */
export async function GET(request: NextRequest) {
  try {
    const stores = await getStores();
    return NextResponse.json(stores);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch stores";
    console.error("stores error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}