import {
  getClients
} from "../../../chunk-YIAK6L6N.js";
import {
  toNextResponseFromError
} from "../../../chunk-3ZI5QZAW.js";
import "../../../chunk-TOM4IICH.js";
import "../../../chunk-SFHDV4E2.js";

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
