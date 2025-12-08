import {
  postClient
} from "../../../chunk-CGYQXIIV.js";
import {
  toNextResponseFromError
} from "../../../chunk-RHIY7DLR.js";
import "../../../chunk-QGNXZTXJ.js";
import "../../../chunk-VJ3KEZLP.js";

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
