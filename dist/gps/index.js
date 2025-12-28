import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-26BJQC3Y.js";
import {
  getAddressById
} from "../chunk-3KVUPPNG.js";
import {
  toNextResponseFromError
} from "../chunk-6CRK5UOV.js";
import "../chunk-LNETFEBQ.js";
import "../chunk-IUIUHPNR.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-VGCQIDM6.js");
    const { Api } = await import("../api-UEHYIAOC.js");
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
