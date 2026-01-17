import { NextRequest, NextResponse } from "next/server";
import { putClient } from "../clients/putClient";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json().catch(() => ({}));
    const updated = await putClient(id, body);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
