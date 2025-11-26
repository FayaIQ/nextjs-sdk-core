import {
  getAddressById
} from "../../chunk-X3E4AE7S.js";
import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../../chunk-HPOBI62I.js";
import {
  toNextResponseFromError
} from "../../chunk-2MRUSURF.js";
import "../../chunk-UEYGZNEP.js";
import "../../chunk-CRASKSJL.js";

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

// src/gps/locations/handler/getAddressById.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const address = await getAddressById(id);
    return NextResponse3.json(address);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  getAddressById,
  GET3 as getAddressByIdHandler,
  getCities,
  getCountries,
  GET as getCountriesHandler,
  getDistricts,
  getLocationChildren,
  GET2 as getLocationChildrenHandler
};
