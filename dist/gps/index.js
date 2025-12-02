import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-DZQVL457.js";
import {
  getAddressById
} from "../chunk-RYOP4JPD.js";
import {
  toNextResponseFromError
} from "../chunk-5526RT3R.js";
import "../chunk-FXVF23HR.js";
import "../chunk-MGHQYVNO.js";
import "../chunk-3RG5ZIWI.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-KMVB5KUG.js");
    const { Api } = await import("../api-RO5SLBPK.js");
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
  getAddressById,
  getCities,
  getCountries,
  getDeliveryZones,
  getDistricts,
  getLocationChildren
};
