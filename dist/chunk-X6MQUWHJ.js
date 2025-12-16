import {
  getStoreDeliveryZones
} from "./chunk-CZKXSNBL.js";
import {
  toNextResponseFromError
} from "./chunk-3ZI5QZAW.js";

// src/stores/handler/getStoreDeliveryZones.ts
async function GET(request, { params }) {
  try {
    const result = await getStoreDeliveryZones((await params).storeId);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
