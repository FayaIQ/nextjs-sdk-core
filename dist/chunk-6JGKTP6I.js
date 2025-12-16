import {
  Api
} from "./chunk-P6AWSCSX.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";
import {
  getWithAuth
} from "./chunk-TOM4IICH.js";

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
