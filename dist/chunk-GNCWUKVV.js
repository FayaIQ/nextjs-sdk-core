import {
  Api
} from "./chunk-3XSMIWLO.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";
import {
  getWithAuth
} from "./chunk-QGNXZTXJ.js";

// src/stores/handler/getStoreUsersPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });
    const queryString = params.toString();
    const url = queryString ? `${Api.getStoreUsersPaging}?${queryString}` : Api.getStoreUsersPaging;
    const data = await getWithAuth(url);
    return NextResponse.json(data);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
