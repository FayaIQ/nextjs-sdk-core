import { NextRequest, NextResponse } from "next/server";
import { getProductInfo as fetchProductInfo } from "../getProductInfo";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await fetchProductInfo(id);
    return NextResponse.json(product);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}
