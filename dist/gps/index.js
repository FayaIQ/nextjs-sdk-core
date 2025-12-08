import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-HLS27OTW.js";
import {
  getAddressById
} from "../chunk-X3XJJNYN.js";
import {
  toNextResponseFromError
} from "../chunk-EQRTL3D2.js";
import "../chunk-MEZUUZWF.js";
import "../chunk-QE7EUSIT.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-BER6YULF.js");
    const { Api } = await import("../api-OCFVPUT3.js");
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
