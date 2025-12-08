import {
  getItemsSource
} from "./chunk-6DW4ZVW7.js";

// src/inventory/itemSource/handler/getItemSource.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const itemsSource = await getItemsSource();
    return NextResponse.json(itemsSource);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    console.error("Products error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
