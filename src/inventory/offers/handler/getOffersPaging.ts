import { NextRequest, NextResponse } from "next/server";
import { getOffersPaging } from "../getOffersPaging";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
