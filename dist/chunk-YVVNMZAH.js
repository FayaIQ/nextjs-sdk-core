import {
  getMenus
} from "./chunk-OLP3OFS6.js";
import {
  ItemsFilterParameters
} from "./chunk-3K4HOFQA.js";

// src/inventory/menus/handler/getMenus.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterParams = ItemsFilterParameters.fromURLSearchParams(searchParams);
    const menus = await getMenus({ filterParams });
    return NextResponse.json(menus);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
