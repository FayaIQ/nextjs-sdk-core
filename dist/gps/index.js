import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-QVVRR452.js";
import {
  getAddressById
} from "../chunk-YNJ6OGDL.js";
import {
  toNextResponseFromError
} from "../chunk-GYNOH4CA.js";
import "../chunk-WDERMAWM.js";
import "../chunk-E7TJCOFK.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-RIVZ2SH3.js");
    const { Api } = await import("../api-QG2WVXL6.js");
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
