import {
  postClient
} from "../../../chunk-2C2TJZBA.js";
import {
  toNextResponseFromError
} from "../../../chunk-W22MSDJZ.js";
import "../../../chunk-ITFNSMMK.js";
import "../../../chunk-MCE7RKB4.js";

// src/crm/clients/handler/postClient.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const client = await postClient(body);
    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  POST
};
