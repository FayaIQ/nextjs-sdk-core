import { NextRequest, NextResponse } from "next/server";
import { getMenuById } from "../getMenuById";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getMenuById(params.id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch menu";
    console.error("getMenuById error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
