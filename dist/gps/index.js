import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-SI3MGOS2.js";
import {
  getAddressById
} from "../chunk-4PMVR2UD.js";
import {
  toNextResponseFromError
} from "../chunk-7AFJCJAL.js";
import "../chunk-JS4EYUML.js";
import "../chunk-66RM7E5I.js";
import "../chunk-3RG5ZIWI.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AKKDVIEJ.js");
    const { Api } = await import("../api-RSV64Y2K.js");
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
