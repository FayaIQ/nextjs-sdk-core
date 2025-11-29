import {
  getMenusDropdown
} from "./chunk-T7KMZA76.js";

// src/inventory/menus/handler/getMenusDropdown.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const menus = await getMenusDropdown();
    return NextResponse.json(menus);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
