import {
  getStoreDeliveryZones
} from "./chunk-A2C5YV2L.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
