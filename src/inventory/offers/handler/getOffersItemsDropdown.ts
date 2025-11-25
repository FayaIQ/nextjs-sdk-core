import { NextRequest, NextResponse } from "next/server";
import { getOffersItemsDropdown } from "../getOffersItemsDropdown";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET() {
  try {
    const result = await getOffersItemsDropdown();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
