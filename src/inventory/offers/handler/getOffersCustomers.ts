import { NextRequest, NextResponse } from "next/server";
import { getOffersCustomers } from "../getOffersCustomers";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET() {
  try {
    const result = await getOffersCustomers();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
