// src/inventory/slides/getSlides.ts
async function getSlides() {
  if (typeof window === "undefined") {
<<<<<<< HEAD
    const { getWithAuth } = await import("../../fetcher-V4JQ7DPQ.js");
=======
    const { getWithAuth } = await import("../../fetcher-3366SLXM.js");
>>>>>>> parent of cc81c84 (Refactor decryption functions to use async/await for improved handling of encrypted cookies and tokens)
    const { Api } = await import("../../api-IWWKU55Q.js");
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
