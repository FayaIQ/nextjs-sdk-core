import {
  getMenuById
} from "./chunk-PCFD6LBG.js";

// src/inventory/menus/handler/getMenuById.ts
import { NextResponse } from "next/server";
async function GET(request, { params }) {
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

export {
  GET
};
