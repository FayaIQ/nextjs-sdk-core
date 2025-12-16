import { NextRequest, NextResponse } from "next/server";
import { getClientsPaging } from "../getClientsPaging";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const obj: Record<string, string> = {};
    params.forEach((v, k) => (obj[k] = v));
    const result = await getClientsPaging(obj);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
