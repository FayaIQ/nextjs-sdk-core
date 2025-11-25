import {
  toNextResponseFromError
} from "../chunk-UVGXKRVD.js";
import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-TYZ7OOYL.js";
import "../chunk-AXTX3LZI.js";
import "../chunk-ROYJHVLJ.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-ZET5K2UJ.js");
    const { Api } = await import("../api-HI3ED3LJ.js");
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
