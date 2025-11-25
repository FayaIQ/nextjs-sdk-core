import { NextRequest, NextResponse } from "next/server";
import { getProductInfoV2 as fetchProductInfoV2 } from "../getProductInfoV2";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await fetchProductInfoV2(id);
    return NextResponse.json(product);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}
