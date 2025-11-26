import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-ZSAQD7CN.js";
import {
  toNextResponseFromError
} from "../chunk-I2UEIWLH.js";
import "../chunk-HJ7BD7D3.js";
import "../chunk-TA6JZYYA.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-HF5W5PJ3.js");
    const { Api } = await import("../api-HF64SQC2.js");
    return getWithAuth(Api.getDeliveryZones);
  }
  const res = await fetch(`/api/gps/delivery-zones`);
  if (!res.ok) throw new Error(`Failed to fetch delivery zones: ${res.statusText}`);
  return res.json();
}

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
  GET as GetDeliveryZonesGET,
  getCities,
  getCountries,
  getDeliveryZones,
  getDistricts,
  getLocationChildren
};
