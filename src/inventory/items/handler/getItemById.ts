import { NextRequest, NextResponse } from "next/server";
import { getItemById } from "../getItemById";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    const result = await getItemById(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch item";
    console.error("getItemById error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
