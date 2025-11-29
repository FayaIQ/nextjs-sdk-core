import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";
import {
  getStoreDeliveryZones
} from "./chunk-UMXGAETT.js";

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
