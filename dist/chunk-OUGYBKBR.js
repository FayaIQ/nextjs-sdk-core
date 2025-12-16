import {
  Api
} from "./chunk-FY27PB4C.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";
import {
  getWithAuth
} from "./chunk-ITFNSMMK.js";

// src/inventory/items/handler/getItemsPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    params.set("GetMultipleMenu", "true");
    const queryString = params.toString();
    const url = queryString ? `${Api.getItemsPaging}?${queryString}` : `${Api.getItemsPaging}?GetMultipleMenu=true`;
    const data = await getWithAuth(url);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return toNextResponseFromError(error);
  }
}

export {
  GET
};
