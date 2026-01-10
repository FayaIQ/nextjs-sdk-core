import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
<<<<<<< HEAD
} from "../../chunk-2LTRX55A.js";
import {
  getAddressById
} from "../../chunk-RQK54OQG.js";
import {
  toNextResponseFromError
} from "../../chunk-IOZDQE5Y.js";
import "../../chunk-P2EDC6QH.js";
import "../../chunk-BNWD4DSM.js";
=======
} from "../../chunk-KZMUMDLE.js";
import {
  getAddressById
} from "../../chunk-X5C5SZKA.js";
import {
  toNextResponseFromError
} from "../../chunk-YWYY4STJ.js";
import "../../chunk-DU5RCNSK.js";
import "../../chunk-FBLW4A4O.js";
>>>>>>> parent of cc81c84 (Refactor decryption functions to use async/await for improved handling of encrypted cookies and tokens)

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
