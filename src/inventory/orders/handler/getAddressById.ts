import { NextRequest, NextResponse } from "next/server";
import { getAddressById } from "../../../gps/locations/getAddressById";

export async function GET(request: NextRequest) {
  try {
    // extract id from url: expecting /api/addresses/:id or similar routing where id is last segment
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse.json(address);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch address';
    console.error('address error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
