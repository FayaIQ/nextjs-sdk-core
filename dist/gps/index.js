import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-H2RJQFDD.js";
import {
  getAddressById
} from "../chunk-RIXDKXT2.js";
import {
  toNextResponseFromError
} from "../chunk-U356OEBM.js";
import "../chunk-WLBM7SWW.js";
import "../chunk-5UZNI7GZ.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-UBKYMKSK.js");
    const { Api } = await import("../api-IZXQRBVZ.js");
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
