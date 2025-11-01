import { NextRequest, NextResponse } from "next/server";
import { postCopyParentStore } from "../postCopyParentStore";

export async function POST(request: NextRequest) {
  try {
    console.log("📩 [API] /api/items/copy-parent-store called");

    // Log the raw request body for debugging
    const rawBody = await request.text();
    console.log("🧾 Raw body received:", rawBody);

    // Try parsing the JSON
    let itemIds: (string | number)[] | undefined;
    try {
      const parsed = JSON.parse(rawBody || "{}");
      itemIds = parsed.itemIds;
      console.log("✅ Parsed itemIds:", itemIds);
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr);
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    // Validate that itemIds exists and is an array
    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      console.warn("⚠️ Missing or invalid itemIds:", itemIds);
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }

    console.log("🚀 Calling postCopyParentStore with:", itemIds);

    // Call your SDK function
    const result = await postCopyParentStore(itemIds);
    console.log("✅ Copy result:", result);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to copy parent items";
    console.error("💥 postCopyParentStore error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
