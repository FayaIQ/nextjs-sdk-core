import { NextRequest, NextResponse } from "next/server";
import { getMenuById } from "../getMenuById";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const result = await getMenuById(resolvedParams.id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch menu";
    console.error("getMenuById error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
