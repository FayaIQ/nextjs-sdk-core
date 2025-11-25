import {
  toNextResponseFromError
} from "../chunk-KXSRVMWN.js";
import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-WWJ43JTV.js";
import "../chunk-GBLWFIA2.js";
import "../chunk-5WA3ZRLC.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-OYBMXYXN.js");
    const { Api } = await import("../api-RHFGMX5X.js");
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
