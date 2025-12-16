import {
  getClientsPaging
} from "./chunk-LH56CB7D.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/crm/handler/getClientsPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const obj = {};
    params.forEach((v, k) => obj[k] = v);
    const result = await getClientsPaging(obj);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
