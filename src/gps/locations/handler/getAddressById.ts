import { NextRequest, NextResponse } from "next/server";
import { getAddressById } from "../getAddressById";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    // extract id from url: expecting /api/addresses/:id
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse.json(address);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
