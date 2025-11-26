import {
  getLocationChildren
} from "./chunk-C7VPVZUD.js";

// src/gps/locations/handler/children.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
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
    const message = error instanceof Error ? error.message : "Failed to fetch location children";
    console.error("location children error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
