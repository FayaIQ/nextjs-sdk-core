// src/gps/locations/getCountries.ts
async function getCountries() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getCountries);
  }
  const response = await fetch(`/api/locations/countries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

// src/gps/locations/getLocationChildren.ts
async function getLocationChildren(parentId) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(
      `${Api.getLocationChildren(parentId)}`
    );
  }
  const response = await fetch(`/api/locations/${parentId}/children`);
  if (!response.ok) {
    throw new Error(`Failed to fetch location children: ${response.statusText}`);
  }
  return response.json();
}
async function getCities(countryId) {
  return getLocationChildren(countryId);
}
async function getDistricts(cityId) {
  return getLocationChildren(cityId);
}

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

// src/gps/locations/handler/children.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request, { params }) {
  try {
    const { parentId: parentIdStr } = await params;
    const parentId = parseInt(parentIdStr, 10);
    if (isNaN(parentId)) {
      return NextResponse2.json(
        { error: "Invalid parent ID" },
        { status: 400 }
      );
    }
    const children = await getLocationChildren(parentId);
    return NextResponse2.json(children);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch location children";
    console.error("location children error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}
export {
  getCities,
  getCountries,
  GET as getCountriesHandler,
  getDistricts,
  getLocationChildren,
  GET2 as getLocationChildrenHandler
};
