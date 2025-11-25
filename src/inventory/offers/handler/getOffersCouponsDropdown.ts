import { NextRequest, NextResponse } from "next/server";
import { getOffersCouponsDropdown } from "../getOffersCouponsDropdown";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET() {
  try {
    const result = await getOffersCouponsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
