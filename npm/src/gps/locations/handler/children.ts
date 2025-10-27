// file: nextjs-sdk-core/npm/src/locations/handler/children.ts

import { NextRequest, NextResponse } from "next/server";
import { getLocationChildren } from "../getLocationChildren";

/**
 * Ready-to-use API route handler for location children (cities/districts)
 * Users can simply re-export this in their app/api/locations/[parentId]/children/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/children';
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ parentId: string }> }
) {
  try {
    const { parentId: parentIdStr } = await params;
    const parentId = parseInt(parentIdStr, 10);

    if (isNaN(parentId)) {
      return NextResponse.json(
        { error: "Invalid parent ID" },
        { status: 400 }
      );
    }

    const children = await getLocationChildren(parentId);
    return NextResponse.json(children);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch location children";
    console.error("location children error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}