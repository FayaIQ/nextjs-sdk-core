import { NextRequest, NextResponse } from "next/server";
import { postPayment } from "../postPayment";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await postPayment(body);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
