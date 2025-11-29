import {
  postClient
} from "../../../chunk-V3C4SPQ4.js";
import {
  toNextResponseFromError
} from "../../../chunk-DUWXBRUL.js";
import "../../../chunk-43V4HC6L.js";
import "../../../chunk-3Z4WZE2U.js";

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
