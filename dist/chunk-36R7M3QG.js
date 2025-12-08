import {
  getClientsPaging
} from "./chunk-72J2VCBK.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

// src/crm/handler/getClientsPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const obj = {};
    console.log("GET clients paging request url:", request.url);
    params.forEach((v, k) => obj[k] = v);
    console.log("GET clients paging params:", obj);
    const result = await getClientsPaging(obj);
    console.log("GET clients paging result:", result);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
