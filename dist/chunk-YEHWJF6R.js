import {
  getCatigories
} from "./chunk-SRH4A6AH.js";

// src/inventory/category/handler/categories.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const categories = await getCatigories();
    return NextResponse.json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
