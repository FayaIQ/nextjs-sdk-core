import {
  getStoreDeliveryZones
} from "../../chunk-NRUUQONZ.js";
import {
  toNextResponseFromError
} from "../../chunk-RHIY7DLR.js";
import "../../chunk-QGNXZTXJ.js";
import "../../chunk-VJ3KEZLP.js";

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
