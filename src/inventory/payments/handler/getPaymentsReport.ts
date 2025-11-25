import { NextRequest, NextResponse } from "next/server";
import { getPaymentsReport } from "../getPaymentsReport";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPaymentsReport(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
