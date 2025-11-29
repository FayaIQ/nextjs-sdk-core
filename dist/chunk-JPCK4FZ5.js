import {
  getStoreDeliveryZones
} from "./chunk-O2KED3OD.js";
import {
  toNextResponseFromError
} from "./chunk-DUWXBRUL.js";

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
