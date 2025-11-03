import { NextRequest, NextResponse } from "next/server";
import { postOffersAddItemsByFilter } from "../postOffersAddItemsByFilter";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; forceUpdate: string }> }
) {
  try {
    const body = await request.json();
    const p = await params;
    const force = p.forceUpdate === "true" || p.forceUpdate === "1";
    const result = await postOffersAddItemsByFilter(p.id, force, body);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
