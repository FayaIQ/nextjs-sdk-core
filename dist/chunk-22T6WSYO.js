import {
  postClient
} from "./chunk-EA4DJ5UC.js";
import {
  toNextResponseFromError
} from "./chunk-O4TRWZWB.js";

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
