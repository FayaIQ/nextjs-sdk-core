import { NextResponse } from "next/server";
import { getStoreInfo as fetchStoreInfo } from "../storeInfo";

/**
 * Ready-to-use API route handler for store info
 * Users can simply re-export this in their app/api/storeInfo/route.ts:
 * 
 * @example
 * export { GET } from 'my-next-core/handlers/storeInfo';
 */
export async function GET() {
  try {
    const storeInfo = await fetchStoreInfo();
    return NextResponse.json(storeInfo);
  } catch (error) {
    console.error("Failed to fetch store info:", error);
    return NextResponse.json(
      { error: "Failed to fetch store info" },
      { status: 500 }
    );
  }
}
