import {
  getSlides
} from "../../chunk-T77RVTGJ.js";

// src/inventory/slides/handler/slides.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const Slides = await getSlides();
    return NextResponse.json(Slides);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export {
  GET,
  getSlides
};
