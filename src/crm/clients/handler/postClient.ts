import { NextRequest, NextResponse } from "next/server";
import { postClient } from "../postClient";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const client = await postClient(body);
    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
