import {
  toNextResponseFromError
} from "../chunk-PCIBAALY.js";
import "../chunk-3K4CRJFB.js";
import "../chunk-Y7DKXAVF.js";
import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-VKVAIB7J.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AJXAI5P7.js");
    const { Api } = await import("../api-XKV6O6PD.js");
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
