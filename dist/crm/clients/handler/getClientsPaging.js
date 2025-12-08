import {
  getClientsPaging
} from "../../../chunk-4TXXK4AK.js";
import {
  toNextResponseFromError
} from "../../../chunk-RHIY7DLR.js";
import "../../../chunk-QGNXZTXJ.js";
import "../../../chunk-VJ3KEZLP.js";

// src/crm/clients/handler/getClientsPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
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
