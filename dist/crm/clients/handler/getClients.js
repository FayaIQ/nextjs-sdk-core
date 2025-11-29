import {
  getClients
} from "../../../chunk-W3PFNIU7.js";
import {
  toNextResponseFromError
} from "../../../chunk-DUWXBRUL.js";
import "../../../chunk-43V4HC6L.js";
import "../../../chunk-3Z4WZE2U.js";

// src/crm/clients/handler/getClients.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const clients = await getClients({ filterParams: url.searchParams });
    return NextResponse.json(clients);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET
};
