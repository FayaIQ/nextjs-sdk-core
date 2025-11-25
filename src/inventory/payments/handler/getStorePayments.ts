import { NextRequest, NextResponse } from "next/server";
import { getStorePayments } from "../getStorePayments";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const result = await getStorePayments(storeId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
