import {
  getClients
} from "../../../chunk-7CRKCUFR.js";
import {
  toNextResponseFromError
} from "../../../chunk-RHIY7DLR.js";
import "../../../chunk-QGNXZTXJ.js";
import "../../../chunk-VJ3KEZLP.js";

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
