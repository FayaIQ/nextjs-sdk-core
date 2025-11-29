import {
  postClient
} from "./chunk-YXBGMTIA.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";

// src/crm/handler/postClient.ts
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
