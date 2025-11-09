// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-STP4FF3T.js");
    const { Api } = await import("../../api-2XXZYWI5.js");
    return getWithAuth(Api.getSlideShows);
  }
  const response = await fetch(`/api/slides?`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

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
  getSlides,
  GET as getSlidesGET
};
