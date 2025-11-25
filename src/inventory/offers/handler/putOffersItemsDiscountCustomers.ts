import { NextRequest, NextResponse } from "next/server";
import { putOffersItemsDiscountCustomers } from "../putOffersItemsDiscountCustomers";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscountCustomers((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
