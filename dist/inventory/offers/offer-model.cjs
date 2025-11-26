"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/inventory/offers/offer-model.ts
var offer_model_exports = {};
__export(offer_model_exports, {
  OfferPagingParameters: () => OfferPagingParameters,
  OffersFilterParameters: () => OffersFilterParameters,
  offerTypes: () => offerTypes
});
module.exports = __toCommonJS(offer_model_exports);
var offerTypes = /* @__PURE__ */ ((offerTypes2) => {
  offerTypes2[offerTypes2["ItemsDiscount"] = 0] = "ItemsDiscount";
  offerTypes2[offerTypes2["InvoiceDiscount"] = 1] = "InvoiceDiscount";
  offerTypes2[offerTypes2["ExtraItemDiscount"] = 2] = "ExtraItemDiscount";
  offerTypes2[offerTypes2["ShippingDiscount"] = 3] = "ShippingDiscount";
  offerTypes2[offerTypes2["CustomerDiscount"] = 4] = "CustomerDiscount";
  offerTypes2[offerTypes2["CustomerItemsDiscount"] = 5] = "CustomerItemsDiscount";
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OfferPagingParameters,
  OffersFilterParameters,
  offerTypes
});
