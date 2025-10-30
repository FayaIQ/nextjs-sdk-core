// src/inventory/items/filter-models.ts
var SortType = /* @__PURE__ */ ((SortType2) => {
  SortType2["None"] = "None";
  SortType2["Newest"] = "Newest";
  SortType2["LowPrice"] = "LowPrice";
  SortType2["HighPrice"] = "HighPrice";
  SortType2["BestSelling"] = "BestSelling";
  SortType2["MostViewed"] = "MostViewed";
  SortType2["Name"] = "Name";
  return SortType2;
})(SortType || {});
var Gender = /* @__PURE__ */ ((Gender2) => {
  Gender2[Gender2["Male"] = 1] = "Male";
  Gender2[Gender2["Female"] = 2] = "Female";
  Gender2[Gender2["Unisex"] = 3] = "Unisex";
  return Gender2;
})(Gender || {});
var AgeGroup = /* @__PURE__ */ ((AgeGroup2) => {
  AgeGroup2[AgeGroup2["Baby"] = 1] = "Baby";
  AgeGroup2[AgeGroup2["Kids"] = 2] = "Kids";
  AgeGroup2[AgeGroup2["Teens"] = 3] = "Teens";
  AgeGroup2[AgeGroup2["Adults"] = 4] = "Adults";
  AgeGroup2[AgeGroup2["Seniors"] = 5] = "Seniors";
  return AgeGroup2;
})(AgeGroup || {});
var NewArrivalPeriod = /* @__PURE__ */ ((NewArrivalPeriod2) => {
  NewArrivalPeriod2["Last_7_Days"] = "Last_7_Days";
  NewArrivalPeriod2["Last_30_Days"] = "Last_30_Days";
  NewArrivalPeriod2["Last_90_Days"] = "Last_90_Days";
  return NewArrivalPeriod2;
})(NewArrivalPeriod || {});
var PagingParameters = class {
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
  }
  /**
   * Convert to URL parameters
   */
  toURLParams() {
    const params = {
      currentPage: this.currentPage.toString(),
      pageSize: this.pageSize.toString()
    };
    if (this.sortField) {
      params.sortField = this.sortField;
    }
    return params;
  }
};
var ItemsFilterParameters = class _ItemsFilterParameters {
  constructor({
    pagingParameters = new PagingParameters(),
    sortType = "None" /* None */,
    menuId = null,
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    name = null,
    gender = null,
    age = null,
    sourceId = null,
    offerId = null,
    newArrival = null,
    getBrand = false,
    getColors = false,
    getColorsDefaultPictures = null,
    getOffer = false,
    getSize = false,
    getCollections = false,
    branchId = null,
    availability = null,
    minRating = null,
    hasDiscount = null,
    minDiscountPercentage = null,
    ItemQuantityStatus = null,
    RejectionNote = null,
    Deliveryability = null,
    Availability = null,
    SyncThirdPartyIds = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.sortType = sortType;
    this.menuId = menuId;
    this.categoryId = categoryId;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.sourceId = sourceId;
    this.offerId = offerId;
    this.newArrival = newArrival;
    this.getBrand = getBrand;
    this.getColors = getColors;
    this.getColorsDefaultPictures = getColorsDefaultPictures;
    this.getOffer = getOffer;
    this.getSize = getSize;
    this.getCollections = getCollections;
    this.branchId = branchId;
    this.availability = availability;
    this.minRating = minRating;
    this.hasDiscount = hasDiscount;
    this.minDiscountPercentage = minDiscountPercentage;
    this.ItemQuantityStatus = ItemQuantityStatus;
    this.SyncThirdPartyIds = SyncThirdPartyIds;
    this.RejectionNote = RejectionNote;
    this.Deliveryability = Deliveryability;
    this.Availability = Availability;
  }
  /**
   * Create a copy of the filter with updated parameters
   */
  copyWith(updates) {
    return new _ItemsFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      sortType: updates.sortType !== void 0 ? updates.sortType : this.sortType,
      menuId: updates.menuId !== void 0 ? updates.menuId : this.menuId,
      categoryId: updates.categoryId !== void 0 ? updates.categoryId : this.categoryId,
      minPrice: updates.minPrice !== void 0 ? updates.minPrice : this.minPrice,
      maxPrice: updates.maxPrice !== void 0 ? updates.maxPrice : this.maxPrice,
      name: updates.name !== void 0 ? updates.name : this.name,
      gender: updates.gender !== void 0 ? updates.gender : this.gender,
      age: updates.age !== void 0 ? updates.age : this.age,
      sourceId: updates.sourceId !== void 0 ? updates.sourceId : this.sourceId,
      offerId: updates.offerId !== void 0 ? updates.offerId : this.offerId,
      newArrival: updates.newArrival !== void 0 ? updates.newArrival : this.newArrival,
      getBrand: updates.getBrand !== void 0 ? updates.getBrand : this.getBrand,
      getColors: updates.getColors !== void 0 ? updates.getColors : this.getColors,
      getColorsDefaultPictures: updates.getColorsDefaultPictures !== void 0 ? updates.getColorsDefaultPictures : this.getColorsDefaultPictures,
      getOffer: updates.getOffer !== void 0 ? updates.getOffer : this.getOffer,
      getSize: updates.getSize !== void 0 ? updates.getSize : this.getSize,
      getCollections: updates.getCollections !== void 0 ? updates.getCollections : this.getCollections,
      branchId: updates.branchId !== void 0 ? updates.branchId : this.branchId,
      availability: updates.availability !== void 0 ? updates.availability : this.availability,
      minRating: updates.minRating !== void 0 ? updates.minRating : this.minRating,
      hasDiscount: updates.hasDiscount !== void 0 ? updates.hasDiscount : this.hasDiscount,
      minDiscountPercentage: updates.minDiscountPercentage !== void 0 ? updates.minDiscountPercentage : this.minDiscountPercentage,
      ItemQuantityStatus: updates.ItemQuantityStatus !== void 0 ? updates.ItemQuantityStatus : this.ItemQuantityStatus,
      SyncThirdPartyIds: updates.SyncThirdPartyIds !== void 0 ? updates.SyncThirdPartyIds : this.SyncThirdPartyIds,
      RejectionNote: updates.RejectionNote !== void 0 ? updates.RejectionNote : this.RejectionNote,
      Deliveryability: updates.Deliveryability !== void 0 ? updates.Deliveryability : this.Deliveryability,
      Availability: updates.Availability !== void 0 ? updates.Availability : this.Availability
    });
  }
  /**
   * Convert filter parameters to URL search parameters
   */
  toURLSearchParams() {
    const params = new URLSearchParams();
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        params.set(key, value);
      }
    });
    if (this.sortType !== "None" /* None */) {
      params.set("sortType", this.sortType);
    }
    if (this.menuId !== null) {
      params.set("menuId", this.menuId.toString());
    }
    if (this.categoryId !== null) {
      params.set("categoryId", this.categoryId.toString());
    }
    if (this.minPrice !== null) {
      params.set("minPrice", this.minPrice.toString());
    }
    if (this.maxPrice !== null) {
      params.set("maxPrice", this.maxPrice.toString());
    }
    if (this.name !== null && this.name.trim() !== "") {
      params.set("name", this.name.trim());
    }
    if (this.gender !== null) {
      params.set("gender", this.gender.toString());
    }
    if (this.age !== null) {
      params.set("age", this.age.toString());
    }
    if (this.sourceId !== null) {
      params.set("sourceId", this.sourceId.toString());
    }
    if (this.offerId !== null) {
      params.set("offerId", this.offerId.toString());
    }
    if (this.newArrival !== null) {
      params.set("newArrival", this.newArrival);
    }
    if (this.getBrand) {
      params.set("getBrand", "true");
    }
    if (this.getColors) {
      params.set("getColors", "true");
    }
    if (this.getColorsDefaultPictures) {
      params.set("getColorsDefaultPictures", "true");
    }
    if (this.getOffer) {
      params.set("getOffer", "true");
    }
    if (this.getSize) {
      params.set("getSize", "true");
    }
    if (this.getCollections) {
      params.set("getCollections", "true");
    }
    if (this.branchId !== null) {
      params.set("branchId", this.branchId.toString());
    }
    if (this.availability !== null) {
      params.set("availability", this.availability.toString());
    }
    if (this.minRating !== null) {
      params.set("minRating", this.minRating.toString());
    }
    if (this.hasDiscount !== null) {
      params.set("hasDiscount", this.hasDiscount.toString());
    }
    if (this.minDiscountPercentage !== null) {
      params.set(
        "minDiscountPercentage",
        this.minDiscountPercentage.toString()
      );
    }
    if (this.ItemQuantityStatus !== null) {
      params.set("ItemQuantityStatus", this.ItemQuantityStatus.toString());
    }
    if (this.SyncThirdPartyIds !== null) {
      params.set("SyncThirdPartyIds", this.SyncThirdPartyIds);
    }
    if (this.RejectionNote !== null) {
      params.set("RejectionNote", this.RejectionNote);
    }
    if (this.Deliveryability !== null) {
      params.set("Deliveryability", String(this.Deliveryability));
    }
    if (this.Availability !== null) {
      params.set("Availability", String(this.Availability));
    }
    return params;
  }
  /**
   * Convert to a plain object map
   */
  toMap() {
    const map = {};
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);
    if (this.sortType !== "None" /* None */) map.sortType = this.sortType;
    if (this.menuId !== null) map.menuId = this.menuId;
    if (this.categoryId !== null) map.categoryId = this.categoryId;
    if (this.minPrice !== null) map.minPrice = this.minPrice;
    if (this.maxPrice !== null) map.maxPrice = this.maxPrice;
    if (this.name !== null && this.name.trim() !== "")
      map.name = this.name.trim();
    if (this.gender !== null) map.gender = this.gender;
    if (this.age !== null) map.age = this.age;
    if (this.sourceId !== null) map.sourceId = this.sourceId;
    if (this.offerId !== null) map.offerId = this.offerId;
    if (this.newArrival !== null) map.newArrival = this.newArrival;
    if (this.getBrand) map.getBrand = true;
    if (this.getColors) map.getColors = true;
    if (this.getColorsDefaultPictures) map.getColorsDefaultPictures = true;
    if (this.getOffer) map.getOffer = true;
    if (this.getSize) map.getSize = true;
    if (this.getCollections) map.getCollections = true;
    if (this.branchId !== null) map.branchId = this.branchId;
    if (this.availability !== null) map.availability = this.availability;
    if (this.minRating !== null) map.minRating = this.minRating;
    if (this.hasDiscount !== null) map.hasDiscount = this.hasDiscount;
    if (this.minDiscountPercentage !== null)
      map.minDiscountPercentage = this.minDiscountPercentage;
    if (this.ItemQuantityStatus !== null)
      map.ItemQuantityStatus = this.ItemQuantityStatus;
    if (this.SyncThirdPartyIds !== null)
      map.SyncThirdPartyIds = this.SyncThirdPartyIds;
    if (this.RejectionNote !== null)
      map.RejectionNote = this.RejectionNote;
    if (this.Deliveryability !== null)
      map.Deliveryability = this.Deliveryability;
    if (this.Availability !== null)
      map.Availability = this.Availability;
    return map;
  }
  /**
   * Create filter from URL search parameters
   */
  static fromURLSearchParams(params) {
    const pagingParameters = new PagingParameters({
      currentPage: params.get("currentPage") ? parseInt(params.get("currentPage")) : 1,
      pageSize: params.get("pageSize") ? parseInt(params.get("pageSize")) : 20,
      sortField: params.get("sortField") || null
    });
    return new _ItemsFilterParameters({
      pagingParameters,
      sortType: params.get("sortType") || "None" /* None */,
      menuId: params.get("menuId") ? parseInt(params.get("menuId")) : null,
      categoryId: params.get("categoryId") ? parseInt(params.get("categoryId")) : null,
      minPrice: params.get("minPrice") ? parseFloat(params.get("minPrice")) : null,
      maxPrice: params.get("maxPrice") ? parseFloat(params.get("maxPrice")) : null,
      name: params.get("name") || null,
      gender: params.get("gender") ? parseInt(params.get("gender")) : null,
      age: params.get("age") ? parseInt(params.get("age")) : null,
      sourceId: params.get("sourceId") ? parseInt(params.get("sourceId")) : null,
      offerId: params.get("offerId") ? parseInt(params.get("offerId")) : null,
      newArrival: params.get("newArrival") || null,
      getBrand: params.get("getBrand") === "true",
      getColors: params.get("getColors") === "true",
      getColorsDefaultPictures: params.get("getColorsDefaultPictures") === "true" || null,
      getOffer: params.get("getOffer") === "true",
      getSize: params.get("getSize") === "true",
      getCollections: params.get("getCollections") === "true",
      branchId: params.get("branchId") ? parseInt(params.get("branchId")) : null,
      availability: params.get("availability") ? params.get("availability") === "true" : null,
      minRating: params.get("minRating") ? parseFloat(params.get("minRating")) : null,
      hasDiscount: params.get("hasDiscount") ? params.get("hasDiscount") === "true" : null,
      minDiscountPercentage: params.get("minDiscountPercentage") ? parseFloat(params.get("minDiscountPercentage")) : null
    });
  }
};

export {
  SortType,
  Gender,
  AgeGroup,
  NewArrivalPeriod,
  PagingParameters,
  ItemsFilterParameters
};
