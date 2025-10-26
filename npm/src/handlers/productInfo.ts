import { NextRequest, NextResponse } from "next/server";
import { getProductInfo as fetchProductInfo } from "../getProductInfo";

/**
 * Ready-to-use API route handler for product info
 * Users can simply re-export this in their app/api/productInfo/[id]/route.ts:
 * 
 * @example
 * export { GET } from 'my-next-core/handlers/productInfo';
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await fetchProductInfo(params.id);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product info:", error);
    return NextResponse.json(
      { error: "Failed to fetch product info" },
      { status: 500 }
    );
  }
}
