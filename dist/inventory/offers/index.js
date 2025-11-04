// src/inventory/offers/getOffersPaging.ts
async function getOffersPaging(query) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { getWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithAuth(Api.getOfferById(id));
  }
  const res = await fetch(`/api/offers/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch offer ${id}: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/deleteOffer.ts
async function deleteOffer(id) {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { getWithoutAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithoutAuth(Api.getInvoiceDiscount(coupon));
  }
  const res = await fetch(`/api/offers/invoice-discount/${encodeURIComponent(String(coupon))}`);
  if (!res.ok) throw new Error(`Failed to fetch invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersItemsDropdown.ts
async function getOffersItemsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithAuth(Api.getOffersItemsDropdown);
  }
  const res = await fetch(`/api/offers/items/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers items dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/getOffersCouponsDropdown.ts
async function getOffersCouponsDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithAuth(Api.getOffersCouponsDropdown);
  }
  const res = await fetch(`/api/offers/coupons/dropdown`);
  if (!res.ok) throw new Error(`Failed to fetch offers coupons dropdown: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersItemsDiscount.ts
async function postOffersItemsDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { getWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithAuth(Api.getOffersCustomers);
  }
  const res = await fetch(`/api/offers/customers`);
  if (!res.ok) throw new Error(`Failed to fetch offers customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/postOffersCustomerDiscount.ts
async function postOffersCustomerDiscount(payload) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { postWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { postWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { postWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
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
    const { Api } = await import("../../api-NLZGVKFO.js");
    return getWithAuth(Api.getCouponOffers);
  }
  const response = await fetch(`/api/offers/coupons`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/offers/putOffersCustomerDiscount.ts
async function putOffersCustomerDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return putWithAuth(Api.putOffersCustomerDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/customer-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put customer discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersExtraItemDiscount.ts
async function putOffersExtraItemDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return putWithAuth(Api.putOffersExtraItemDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/extra-item-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put extra item discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersInvoiceDiscount.ts
async function putOffersInvoiceDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return putWithAuth(Api.putOffersInvoiceDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/invoice-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put invoice discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersItemsDiscountCustomers.ts
async function putOffersItemsDiscountCustomers(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return putWithAuth(Api.putOffersItemsDiscountCustomers(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/items-discount/customers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put items discount customers: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/putOffersShippingDiscount.ts
async function putOffersShippingDiscount(id, payload) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../fetcher-KXVTZLUJ.js");
    const { Api } = await import("../../api-NLZGVKFO.js");
    return putWithAuth(Api.putOffersShippingDiscount(id), payload);
  }
  const res = await fetch(`/api/offers/${id}/shipping-discount`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Failed to put shipping discount: ${res.statusText}`);
  return res.json();
}

// src/inventory/offers/offer-model.ts
var offerTypes = /* @__PURE__ */ ((offerTypes2) => {
  offerTypes2[offerTypes2["ItemsDiscount"] = 1] = "ItemsDiscount";
  offerTypes2[offerTypes2["InvoiceDiscount"] = 2] = "InvoiceDiscount";
  offerTypes2[offerTypes2["ExtraItemDiscount"] = 3] = "ExtraItemDiscount";
  offerTypes2[offerTypes2["ShippingDiscount"] = 4] = "ShippingDiscount";
  offerTypes2[offerTypes2["CustomerDiscount"] = 5] = "CustomerDiscount";
  offerTypes2[offerTypes2["CustomerItemsDiscount"] = 6] = "CustomerItemsDiscount";
  return offerTypes2;
})(offerTypes || {});
var OfferPagingParameters = class {
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null,
    currentSortField = null,
    currentSortOrder = null
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.currentSortField = currentSortField;
    this.currentSortOrder = currentSortOrder;
  }
  toURLParams() {
    const params = {
      CurrentPage: this.currentPage.toString(),
      PageSize: this.pageSize.toString()
    };
    if (this.sortField) params.SortField = this.sortField;
    if (this.currentSortField) params.CurrentSortField = this.currentSortField;
    if (this.currentSortOrder) params.CurrentSortOrder = this.currentSortOrder;
    return params;
  }
};
var OffersFilterParameters = class _OffersFilterParameters {
  constructor({
    pagingParameters = new OfferPagingParameters(),
    Name = null,
    Start = null,
    End = null,
    DiscountType = null,
    IsActive = null,
    HasCouponCode = null,
    OfferFilterType = null,
    ItemId = null,
    Barcode = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.Name = Name;
    this.Start = Start;
    this.End = End;
    this.DiscountType = DiscountType;
    this.IsActive = IsActive;
    this.HasCouponCode = HasCouponCode;
    this.OfferFilterType = OfferFilterType;
    this.ItemId = ItemId;
    this.Barcode = Barcode;
  }
  toURLSearchParams() {
    const params = new URLSearchParams();
    const paging = this.pagingParameters.toURLParams();
    Object.entries(paging).forEach(([k, v]) => params.set(k, v));
    if (this.Name !== null) params.set("Name", this.Name);
    if (this.Start !== null) params.set("Start", this.Start);
    if (this.End !== null) params.set("End", this.End);
    if (this.DiscountType !== null) params.set("DiscountType", String(this.DiscountType));
    if (this.IsActive !== null) params.set("IsActive", String(this.IsActive));
    if (this.HasCouponCode !== null) params.set("HasCouponCode", String(this.HasCouponCode));
    if (this.OfferFilterType !== null) params.set("OfferFilterType", String(this.OfferFilterType));
    if (this.ItemId !== null) params.set("ItemId", String(this.ItemId));
    if (this.Barcode !== null) params.set("Barcode", this.Barcode);
    return params;
  }
  toMap() {
    const map = {};
    Object.assign(map, this.pagingParameters.toURLParams());
    if (this.Name !== null) map.Name = this.Name;
    if (this.Start !== null) map.Start = this.Start;
    if (this.End !== null) map.End = this.End;
    if (this.DiscountType !== null) map.DiscountType = this.DiscountType;
    if (this.IsActive !== null) map.IsActive = this.IsActive;
    if (this.HasCouponCode !== null) map.HasCouponCode = this.HasCouponCode;
    if (this.OfferFilterType !== null) map.OfferFilterType = this.OfferFilterType;
    if (this.ItemId !== null) map.ItemId = this.ItemId;
    if (this.Barcode !== null) map.Barcode = this.Barcode;
    return map;
  }
  static fromURLSearchParams(params) {
    const paging = new OfferPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null
    });
    return new _OffersFilterParameters({
      pagingParameters: paging,
      Name: params.get("Name") || null,
      Start: params.get("Start") || null,
      End: params.get("End") || null,
      DiscountType: params.get("DiscountType") ? parseInt(params.get("DiscountType")) : null,
      IsActive: params.get("IsActive") ? params.get("IsActive") === "true" : null,
      HasCouponCode: params.get("HasCouponCode") ? params.get("HasCouponCode") === "true" : null,
      OfferFilterType: params.get("OfferFilterType") ? parseInt(params.get("OfferFilterType")) : null,
      ItemId: params.get("ItemId") ? parseInt(params.get("ItemId")) : null,
      Barcode: params.get("Barcode") || null
    });
  }
};

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

// src/inventory/offers/handler/putOffersCustomerDiscount.ts
import { NextResponse as NextResponse15 } from "next/server";
async function PUT2(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersCustomerDiscount((await params).id, data);
    return NextResponse15.json(result);
  } catch (err) {
    return NextResponse15.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersExtraItemDiscount.ts
import { NextResponse as NextResponse16 } from "next/server";
async function PUT3(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersExtraItemDiscount((await params).id, data);
    return NextResponse16.json(result);
  } catch (err) {
    return NextResponse16.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersInvoiceDiscount.ts
import { NextResponse as NextResponse17 } from "next/server";
async function PUT4(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersInvoiceDiscount((await params).id, data);
    return NextResponse17.json(result);
  } catch (err) {
    return NextResponse17.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersItemsDiscountCustomers.ts
import { NextResponse as NextResponse18 } from "next/server";
async function PUT5(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscountCustomers((await params).id, data);
    return NextResponse18.json(result);
  } catch (err) {
    return NextResponse18.json({ error: err }, { status: 500 });
  }
}

// src/inventory/offers/handler/putOffersShippingDiscount.ts
import { NextResponse as NextResponse19 } from "next/server";
async function PUT6(request, { params }) {
  try {
    const data = await request.json();
    const result = await putOffersShippingDiscount((await params).id, data);
    return NextResponse19.json(result);
  } catch (err) {
    return NextResponse19.json({ error: err }, { status: 500 });
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
  OfferPagingParameters,
  OffersFilterParameters,
  POST5 as PostOffersAddItemsByFilterPOST,
  POST2 as PostOffersCustomerDiscountPOST,
  POST3 as PostOffersInvoiceDiscountPOST,
  POST as PostOffersItemsDiscountPOST,
  POST4 as PostOffersShippingDiscountPOST,
  PUT2 as PutOffersCustomerDiscountPUT,
  PUT3 as PutOffersExtraItemDiscountPUT,
  PUT4 as PutOffersInvoiceDiscountPUT,
  PUT5 as PutOffersItemsDiscountCustomersPUT,
  PUT as PutOffersItemsDiscountPUT,
  PUT6 as PutOffersShippingDiscountPUT,
  deleteOffer,
  getCoupons,
  getInvoiceDiscount,
  getOfferById,
  getOffersCouponsDropdown,
  getOffersCustomers,
  getOffersItemsDropdown,
  getOffersPaging,
  offerTypes,
  postOffersAddItemsByFilter,
  postOffersCustomerDiscount,
  postOffersInvoiceDiscount,
  postOffersItemsDiscount,
  postOffersShippingDiscount,
  putOffersCustomerDiscount,
  putOffersExtraItemDiscount,
  putOffersInvoiceDiscount,
  putOffersItemsDiscount,
  putOffersItemsDiscountCustomers,
  putOffersShippingDiscount
};
