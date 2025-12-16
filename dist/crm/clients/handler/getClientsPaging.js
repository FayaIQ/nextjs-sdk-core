import {
  getClientsPaging
} from "../../../chunk-UWFK2U4B.js";
import {
  toNextResponseFromError
} from "../../../chunk-3ZI5QZAW.js";
import "../../../chunk-TOM4IICH.js";
import "../../../chunk-SFHDV4E2.js";

// src/crm/clients/handler/getClientsPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = request.nextUrl.searchParams;
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
