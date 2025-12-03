import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-HRYNTB66.js";
import {
  getAddressById
} from "../chunk-FXQN3QNN.js";
import {
  toNextResponseFromError
} from "../chunk-4DPJZ6ZU.js";
import "../chunk-ISX4EOFW.js";
import "../chunk-35YYLZPN.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-442K4FV3.js");
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
