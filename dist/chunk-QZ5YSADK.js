import {
  getDeliveryZones
} from "./chunk-IXKYTE7O.js";
import {
  toNextResponseFromError
} from "./chunk-RHIY7DLR.js";

// src/gps/handler/getDeliveryZones.ts
async function GET(request) {
  try {
    const result = await getDeliveryZones();
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
