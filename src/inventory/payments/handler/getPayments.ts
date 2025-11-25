import { NextRequest, NextResponse } from "next/server";
import { getPayments } from "../getPayments";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPayments(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
