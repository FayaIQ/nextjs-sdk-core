import {
  getDeliveryZones
} from "./chunk-GYK4HI5G.js";
import {
  toNextResponseFromError
} from "./chunk-MKZOJXDY.js";

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
