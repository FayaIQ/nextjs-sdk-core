import { NextRequest, NextResponse } from "next/server";
import { postOrderDelegatesList } from "../postOrderDelegatesList";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    await postOrderDelegatesList(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to assign delegates";
    console.error("post order delegates list error:", message);
    const status = (err as any)?.status ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}