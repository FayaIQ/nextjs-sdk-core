// src/inventory/offers/getOffersPaging.ts
async function getOffersPaging(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getOffersPaging, query);
  }
  const qs = query ? new URLSearchParams(query).toString() : "";
  const res = await fetch(`/api/offers/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch offers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOfferById.ts
async function getOfferById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getOfferById(id));
  }
  const res = await fetch(`/api/offers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch offer ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/deleteOffer.ts
async function deleteOffer(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return deleteWithAuth(Api.deleteOffer(id));
  }
  const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/offers/getInvoiceDiscount.ts
async function getInvoiceDiscount(coupon) {
  if (typeof window === "undefined") {
    const { getWithoutAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithoutAuth(Api.getInvoiceDiscount(coupon));
  }
  const res = await fetch(`/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`);
  if (!res.ok) throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersItemsDropdown.ts
async function getOffersItemsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getOffersItemsDropdown);
  }
  const res = await fetch(`/api/offers/items/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers items dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCouponsDropdown.ts
async function getOffersCouponsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getOffersCouponsDropdown);
  }
  const res = await fetch(`/api/offers/coupons/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers coupons dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersItemsDiscount.ts
async function postOffersItemsDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api.postOffersItemsDiscount, payload);
  }
  const res = await fetch(`/api/offers/items-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to post items discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersItemsDiscount.ts
async function putOffersItemsDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return putWithAuth(Api.putOffersItemsDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put items discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCustomers.ts
async function getOffersCustomers() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getOffersCustomers);
  }
  const res = await fetch(`/api/offers/customers`);
  if (!res.ok) throw new Error(`Failed to fetch offers customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersCustomerDiscount.ts
async function postOffersCustomerDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api.postOffersCustomerDiscount, payload);
  }
  const res = await fetch(`/api/offers/customer-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to post customer discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersInvoiceDiscount.ts
async function postOffersInvoiceDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api.postOffersInvoiceDiscount, payload);
  }
  const res = await fetch(`/api/offers/invoice-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to post invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersShippingDiscount.ts
async function postOffersShippingDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api.postOffersShippingDiscount, payload);
  }
  const res = await fetch(`/api/offers/shipping-discount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to post shipping discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersAddItemsByFilter.ts
async function postOffersAddItemsByFilter(offerId, forceUpdate, payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-53SEI2RB.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return postWithAuth(Api.postOffersAddItemsByFilter(offerId, forceUpdate), payload);
  }
  const res = await fetch(`/api/offers/${offerId}/add-items-by-filter/${String(forceUpdate)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to add items by filter: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getCoupons.ts
async function getCoupons() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/index.js");
    const { Api } = await import("../../api-ALZDPWU7.js");
    return getWithAuth(Api.getCouponOffers);
  }
  const response = await fetch(`/api/offers/coupons`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/offers/handler/getOffersPaging.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getOffersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers";
    console.error("getOffersPaging error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/coupons.ts
import { NextResponse as NextResponse2 } from "next/server";
async function GET2(request) {
  try {
    const Coupons = await getCoupons();
    return NextResponse2.json(Coupons);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch orders";
    console.error("orders error:", message);
    return NextResponse2.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOfferById.ts
import { NextResponse as NextResponse3 } from "next/server";
async function GET3(request, { params }) {
  try {
    const result = await getOfferById((await params).id);
    return NextResponse3.json(result);
  } catch (err) {
    return NextResponse3.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/deleteOffer.ts
import { NextResponse as NextResponse4 } from "next/server";
async function DELETE(request, { params }) {
  try {
    const result = await deleteOffer((await params).id);
    return NextResponse4.json(result);
  } catch (err) {
    return NextResponse4.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/getInvoiceDiscount.ts
import { NextResponse as NextResponse5 } from "next/server";
async function GET4(request, { params }) {
  try {
    const result = await getInvoiceDiscount((await params).coupon);
    return NextResponse5.json(result);
  } catch (err) {
    return NextResponse5.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersItemsDropdown.ts
import { NextResponse as NextResponse6 } from "next/server";
async function GET5() {
  try {
    const result = await getOffersItemsDropdown();
    return NextResponse6.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers items dropdown";
    console.error("getOffersItemsDropdown error:", message);
    return NextResponse6.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersCouponsDropdown.ts
import { NextResponse as NextResponse7 } from "next/server";
async function GET6() {
  try {
    const result = await getOffersCouponsDropdown();
    return NextResponse7.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers coupons dropdown";
    console.error("getOffersCouponsDropdown error:", message);
    return NextResponse7.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersItemsDiscount.ts
import { NextResponse as NextResponse8 } from "next/server";
async function POST(request) {
  try {
    const data = await request.json();
    const result = await postOffersItemsDiscount(data);
    return NextResponse8.json(result);
  } catch (err) {
    return NextResponse8.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersItemsDiscount.ts
import { NextResponse as NextResponse9 } from "next/server";
async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscount((await params).id, data);
    return NextResponse9.json(result);
  } catch (err) {
    return NextResponse9.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/getOffersCustomers.ts
import { NextResponse as NextResponse10 } from "next/server";
async function GET7() {
  try {
    const result = await getOffersCustomers();
    return NextResponse10.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch offers customers";
    console.error("getOffersCustomers error:", message);
    return NextResponse10.json({ error: message }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersCustomerDiscount.ts
import { NextResponse as NextResponse11 } from "next/server";
async function POST2(request) {
  try {
    const data = await request.json();
    const result = await postOffersCustomerDiscount(data);
    return NextResponse11.json(result);
  } catch (err) {
    return NextResponse11.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersInvoiceDiscount.ts
import { NextResponse as NextResponse12 } from "next/server";
async function POST3(request) {
  try {
    const data = await request.json();
    const result = await postOffersInvoiceDiscount(data);
    return NextResponse12.json(result);
  } catch (err) {
    return NextResponse12.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersShippingDiscount.ts
import { NextResponse as NextResponse13 } from "next/server";
async function POST4(request) {
  try {
    const data = await request.json();
    const result = await postOffersShippingDiscount(data);
    return NextResponse13.json(result);
  } catch (err) {
    return NextResponse13.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/postOffersAddItemsByFilter.ts
import { NextResponse as NextResponse14 } from "next/server";
async function POST5(request, { params }) {
  try {
    const body = await request.json();
    const p = await params;
    const force = p.forceUpdate === "true" || p.forceUpdate === "1";
    const result = await postOffersAddItemsByFilter(p.id, force, body);
    return NextResponse14.json(result);
  } catch (err) {
    return NextResponse14.json({ error: err }, { status: 500 });
  }
}
export {
  DELETE as DeleteOfferDELETE,
  GET2 as GetCouponsGET,
  GET4 as GetInvoiceDiscountGET,
  GET3 as GetOfferByIdGET,
  GET6 as GetOffersCouponsDropdownGET,
  GET7 as GetOffersCustomersGET,
  GET5 as GetOffersItemsDropdownGET,
  GET as GetOffersPagingGET,
  POST5 as PostOffersAddItemsByFilterPOST,
  POST2 as PostOffersCustomerDiscountPOST,
  POST3 as PostOffersInvoiceDiscountPOST,
  POST as PostOffersItemsDiscountPOST,
  POST4 as PostOffersShippingDiscountPOST,
  PUT as PutOffersItemsDiscountPUT,
  deleteOffer,
  getCoupons,
  getInvoiceDiscount,
  getOfferById,
  getOffersCouponsDropdown,
  getOffersCustomers,
  getOffersItemsDropdown,
  getOffersPaging,
  postOffersAddItemsByFilter,
  postOffersCustomerDiscount,
  postOffersInvoiceDiscount,
  postOffersItemsDiscount,
  postOffersShippingDiscount,
  putOffersItemsDiscount
};
