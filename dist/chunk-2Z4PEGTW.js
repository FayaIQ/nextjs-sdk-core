import {
  getCountries
} from "./chunk-ZT7QGCTG.js";

// src/gps/locations/handler/countries.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const countries = await getCountries();
    return NextResponse.json(countries);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch countries";
    console.error("countries error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  GET
};
