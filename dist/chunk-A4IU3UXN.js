import {
  getStoreUsersPaging
} from "./chunk-KRXNYDGH.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/stores/handler/getStoreUsersPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = {};
    for (const [k, v] of searchParams.entries()) {
      if (k === "CurrentPage" || k === "PageSize") {
        params[k] = parseInt(v, 10);
      } else if (k === "EmailConfirmed" || k === "PhoneNumberConfirmed") {
        params[k] = v === "true";
      } else if (k === "Roles") {
        params[k] = searchParams.getAll(k);
      } else {
        params[k] = v;
      }
    }
    const result = await getStoreUsersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
