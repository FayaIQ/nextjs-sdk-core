import {
  getSlides
} from "./chunk-WF27CXOT.js";

// src/inventory/slides/handler/slides.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const Slides = await getSlides();
    return NextResponse.json(Slides);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch slides";
    console.error("slides error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
