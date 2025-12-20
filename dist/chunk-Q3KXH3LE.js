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
    GetBrand = false,
    getColors = false,
    getColorsDefaultPictures = null,
    getOffer = false,
    getSize = false,
    getCollections = false,
    branchId = null,
    storeId = null,
    id = null,
    ids = null,
    excludeId = null,
    CategoryId2 = null,
    CategoryId3 = null,
    CategoryId4 = null,
    NameOrBarcode = null,
    BarCode = null,
    FilterCollections = null,
    SizeValueId = null,
    ColorId = null,
    SizePatternId = null,
    OfferGuid = null,
    GetColorsPictures = null,
    GetGeneralPictures = null,
    GetSizeSet = null,
    GetSizeSetValues = null,
    GetPointOffer = null,
    GetMenu = null,
    GetMultipleMenu = null,
    GetLikes = null,
    GetWishes = null,
    GetFavourites = null,
    GetRating = null,
    GetTempPicture = null,
    GetCategory = null,
    GetUnit = null,
    GetStoreId = null,
    GetPoints = null,
    GetPriceAfterDiscount = null,
    GetSyncThirdPartyId = null,
    GetDarkOffer = null,
    CombineNameAndBarcode = null,
    availability = null,
    minRating = null,
    hasDiscount = null,
    minDiscountPercentage = null,
    ItemQuantityStatus = null,
    RejectionNote = null,
    Deliveryability = null,
    Availability = null,
    SyncThirdPartyIds = null,
    SyncThirdPartyId = null,
    IsMultiMenuStore = null,
    UseApprovalSystem = null,
    CurrentSortField = null,
    CurrentSortOrder = null,
    Code = null,
    barcode = null,
    IsFeatured = null,
    IsActive = null,
    ApprovedStatus = null,
    HavePicture = null,
    HaveDescription = null,
    HaveColor = null,
    HaveOffer = null,
    HaveItemCollectionOffer = null,
    IsDeleted = null,
    CheckQuantityBeforeSale = null,
    CreatedAt = null,
    UpdatedAt = null,
    CreatedBy = null,
    UpdatedBy = null
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
    this.GetBrand = GetBrand;
    this.getColors = getColors;
    this.getColorsDefaultPictures = getColorsDefaultPictures;
    this.getOffer = getOffer;
    this.getSize = getSize;
    this.getCollections = getCollections;
    this.branchId = branchId;
    this.storeId = storeId;
    this.availability = availability;
    this.minRating = minRating;
    this.hasDiscount = hasDiscount;
    this.minDiscountPercentage = minDiscountPercentage;
    this.ItemQuantityStatus = ItemQuantityStatus;
    this.SyncThirdPartyIds = SyncThirdPartyIds;
    this.SyncThirdPartyId = SyncThirdPartyId;
    this.id = id;
    this.ids = ids;
    this.excludeId = excludeId;
    this.CategoryId2 = CategoryId2;
    this.CategoryId3 = CategoryId3;
    this.CategoryId4 = CategoryId4;
    this.NameOrBarcode = NameOrBarcode;
    this.BarCode = BarCode;
    this.FilterCollections = FilterCollections;
    this.SizeValueId = SizeValueId;
    this.ColorId = ColorId;
    this.SizePatternId = SizePatternId;
    this.OfferGuid = OfferGuid;
    this.GetColorsPictures = GetColorsPictures;
    this.GetGeneralPictures = GetGeneralPictures;
    this.GetSizeSet = GetSizeSet;
    this.GetSizeSetValues = GetSizeSetValues;
    this.GetPointOffer = GetPointOffer;
    this.GetMenu = GetMenu;
    this.GetMultipleMenu = GetMultipleMenu;
    this.GetLikes = GetLikes;
    this.GetWishes = GetWishes;
    this.GetFavourites = GetFavourites;
    this.GetRating = GetRating;
    this.GetTempPicture = GetTempPicture;
    this.GetCategory = GetCategory;
    this.GetUnit = GetUnit;
    this.GetStoreId = GetStoreId;
    this.GetPoints = GetPoints;
    this.GetPriceAfterDiscount = GetPriceAfterDiscount;
    this.GetSyncThirdPartyId = GetSyncThirdPartyId;
    this.GetDarkOffer = GetDarkOffer;
    this.CombineNameAndBarcode = CombineNameAndBarcode;
    this.RejectionNote = RejectionNote;
    this.Deliveryability = Deliveryability;
    this.Availability = Availability;
    this.IsMultiMenuStore = IsMultiMenuStore;
    this.UseApprovalSystem = UseApprovalSystem;
    this.CurrentSortField = CurrentSortField;
    this.CurrentSortOrder = CurrentSortOrder;
    this.Code = Code;
    this.barcode = barcode;
    this.IsFeatured = IsFeatured;
    this.IsActive = IsActive;
    this.ApprovedStatus = ApprovedStatus;
    this.HavePicture = HavePicture;
    this.HaveDescription = HaveDescription;
    this.HaveColor = HaveColor;
    this.HaveOffer = HaveOffer;
    this.HaveItemCollectionOffer = HaveItemCollectionOffer;
    this.IsDeleted = IsDeleted;
    this.CheckQuantityBeforeSale = CheckQuantityBeforeSale;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.CreatedBy = CreatedBy;
    this.UpdatedBy = UpdatedBy;
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
      GetBrand: updates.GetBrand !== void 0 ? updates.GetBrand : this.GetBrand,
      getColors: updates.getColors !== void 0 ? updates.getColors : this.getColors,
      getColorsDefaultPictures: updates.getColorsDefaultPictures !== void 0 ? updates.getColorsDefaultPictures : this.getColorsDefaultPictures,
      getOffer: updates.getOffer !== void 0 ? updates.getOffer : this.getOffer,
      getSize: updates.getSize !== void 0 ? updates.getSize : this.getSize,
      getCollections: updates.getCollections !== void 0 ? updates.getCollections : this.getCollections,
      branchId: updates.branchId !== void 0 ? updates.branchId : this.branchId,
      storeId: updates.storeId !== void 0 ? updates.storeId : this.storeId,
      availability: updates.availability !== void 0 ? updates.availability : this.availability,
      minRating: updates.minRating !== void 0 ? updates.minRating : this.minRating,
      hasDiscount: updates.hasDiscount !== void 0 ? updates.hasDiscount : this.hasDiscount,
      minDiscountPercentage: updates.minDiscountPercentage !== void 0 ? updates.minDiscountPercentage : this.minDiscountPercentage,
      ItemQuantityStatus: updates.ItemQuantityStatus !== void 0 ? updates.ItemQuantityStatus : this.ItemQuantityStatus,
      SyncThirdPartyIds: updates.SyncThirdPartyIds !== void 0 ? updates.SyncThirdPartyIds : this.SyncThirdPartyIds,
      SyncThirdPartyId: updates.SyncThirdPartyId !== void 0 ? updates.SyncThirdPartyId : this.SyncThirdPartyId,
      RejectionNote: updates.RejectionNote !== void 0 ? updates.RejectionNote : this.RejectionNote,
      Deliveryability: updates.Deliveryability !== void 0 ? updates.Deliveryability : this.Deliveryability,
      Availability: updates.Availability !== void 0 ? updates.Availability : this.Availability,
      IsMultiMenuStore: updates.IsMultiMenuStore !== void 0 ? updates.IsMultiMenuStore : this.IsMultiMenuStore,
      UseApprovalSystem: updates.UseApprovalSystem !== void 0 ? updates.UseApprovalSystem : this.UseApprovalSystem,
      CurrentSortField: updates.CurrentSortField !== void 0 ? updates.CurrentSortField : this.CurrentSortField,
      CurrentSortOrder: updates.CurrentSortOrder !== void 0 ? updates.CurrentSortOrder : this.CurrentSortOrder,
      Code: updates.Code !== void 0 ? updates.Code : this.Code,
      barcode: updates.barcode !== void 0 ? updates.barcode : this.barcode,
      IsFeatured: updates.IsFeatured !== void 0 ? updates.IsFeatured : this.IsFeatured,
      IsActive: updates.IsActive !== void 0 ? updates.IsActive : this.IsActive,
      ApprovedStatus: updates.ApprovedStatus !== void 0 ? updates.ApprovedStatus : this.ApprovedStatus,
      HavePicture: updates.HavePicture !== void 0 ? updates.HavePicture : this.HavePicture,
      HaveDescription: updates.HaveDescription !== void 0 ? updates.HaveDescription : this.HaveDescription,
      HaveColor: updates.HaveColor !== void 0 ? updates.HaveColor : this.HaveColor,
      HaveOffer: updates.HaveOffer !== void 0 ? updates.HaveOffer : this.HaveOffer,
      HaveItemCollectionOffer: updates.HaveItemCollectionOffer !== void 0 ? updates.HaveItemCollectionOffer : this.HaveItemCollectionOffer,
      IsDeleted: updates.IsDeleted !== void 0 ? updates.IsDeleted : this.IsDeleted,
      CreatedAt: updates.CreatedAt !== void 0 ? updates.CreatedAt : this.CreatedAt,
      UpdatedAt: updates.UpdatedAt !== void 0 ? updates.UpdatedAt : this.UpdatedAt,
      CreatedBy: updates.CreatedBy !== void 0 ? updates.CreatedBy : this.CreatedBy,
      UpdatedBy: updates.UpdatedBy !== void 0 ? updates.UpdatedBy : this.UpdatedBy,
      CheckQuantityBeforeSale: updates.CheckQuantityBeforeSale !== void 0 ? updates.CheckQuantityBeforeSale : this.CheckQuantityBeforeSale,
      // new fields
      id: updates.id !== void 0 ? updates.id : this.id,
      ids: updates.ids !== void 0 ? updates.ids : this.ids,
      excludeId: updates.excludeId !== void 0 ? updates.excludeId : this.excludeId,
      CategoryId2: updates.CategoryId2 !== void 0 ? updates.CategoryId2 : this.CategoryId2,
      CategoryId3: updates.CategoryId3 !== void 0 ? updates.CategoryId3 : this.CategoryId3,
      CategoryId4: updates.CategoryId4 !== void 0 ? updates.CategoryId4 : this.CategoryId4,
      NameOrBarcode: updates.NameOrBarcode !== void 0 ? updates.NameOrBarcode : this.NameOrBarcode,
      BarCode: updates.BarCode !== void 0 ? updates.BarCode : this.BarCode,
      FilterCollections: updates.FilterCollections !== void 0 ? updates.FilterCollections : this.FilterCollections,
      SizeValueId: updates.SizeValueId !== void 0 ? updates.SizeValueId : this.SizeValueId,
      ColorId: updates.ColorId !== void 0 ? updates.ColorId : this.ColorId,
      SizePatternId: updates.SizePatternId !== void 0 ? updates.SizePatternId : this.SizePatternId,
      OfferGuid: updates.OfferGuid !== void 0 ? updates.OfferGuid : this.OfferGuid,
      GetColorsPictures: updates.GetColorsPictures !== void 0 ? updates.GetColorsPictures : this.GetColorsPictures,
      GetGeneralPictures: updates.GetGeneralPictures !== void 0 ? updates.GetGeneralPictures : this.GetGeneralPictures,
      GetSizeSet: updates.GetSizeSet !== void 0 ? updates.GetSizeSet : this.GetSizeSet,
      GetSizeSetValues: updates.GetSizeSetValues !== void 0 ? updates.GetSizeSetValues : this.GetSizeSetValues,
      GetPointOffer: updates.GetPointOffer !== void 0 ? updates.GetPointOffer : this.GetPointOffer,
      GetMenu: updates.GetMenu !== void 0 ? updates.GetMenu : this.GetMenu,
      GetMultipleMenu: updates.GetMultipleMenu !== void 0 ? updates.GetMultipleMenu : this.GetMultipleMenu,
      GetLikes: updates.GetLikes !== void 0 ? updates.GetLikes : this.GetLikes,
      GetWishes: updates.GetWishes !== void 0 ? updates.GetWishes : this.GetWishes,
      GetFavourites: updates.GetFavourites !== void 0 ? updates.GetFavourites : this.GetFavourites,
      GetRating: updates.GetRating !== void 0 ? updates.GetRating : this.GetRating,
      GetTempPicture: updates.GetTempPicture !== void 0 ? updates.GetTempPicture : this.GetTempPicture,
      GetCategory: updates.GetCategory !== void 0 ? updates.GetCategory : this.GetCategory,
      GetUnit: updates.GetUnit !== void 0 ? updates.GetUnit : this.GetUnit,
      GetStoreId: updates.GetStoreId !== void 0 ? updates.GetStoreId : this.GetStoreId,
      GetPoints: updates.GetPoints !== void 0 ? updates.GetPoints : this.GetPoints,
      GetPriceAfterDiscount: updates.GetPriceAfterDiscount !== void 0 ? updates.GetPriceAfterDiscount : this.GetPriceAfterDiscount,
      GetSyncThirdPartyId: updates.GetSyncThirdPartyId !== void 0 ? updates.GetSyncThirdPartyId : this.GetSyncThirdPartyId,
      GetDarkOffer: updates.GetDarkOffer !== void 0 ? updates.GetDarkOffer : this.GetDarkOffer,
      CombineNameAndBarcode: updates.CombineNameAndBarcode !== void 0 ? updates.CombineNameAndBarcode : this.CombineNameAndBarcode
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
    if (this.GetBrand) {
      params.set("GetBrand", "true");
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
    if (this.storeId !== null) {
      params.set("StoreId", this.storeId.toString());
      params.set("storeId", this.storeId.toString());
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
    if (this.SyncThirdPartyId !== null) {
      params.set("SyncThirdPartyId", this.SyncThirdPartyId);
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
    if (this.IsMultiMenuStore !== null) {
      params.set("IsMultiMenuStore", String(this.IsMultiMenuStore));
    }
    if (this.UseApprovalSystem !== null) {
      params.set("UseApprovalSystem", String(this.UseApprovalSystem));
    }
    if (this.CurrentSortField !== null) {
      params.set("CurrentSortField", this.CurrentSortField);
    }
    if (this.CurrentSortOrder !== null) {
      params.set("CurrentSortOrder", this.CurrentSortOrder);
    }
    if (this.Code !== null && this.Code.trim() !== "") {
      params.set("Code", this.Code.trim());
    }
    if (this.barcode !== null && this.barcode.trim() !== "") {
      params.set("barcode", this.barcode.trim());
    }
    if (this.IsFeatured !== null) {
      params.set("IsFeatured", String(this.IsFeatured));
    }
    if (this.IsActive !== null) {
      params.set("IsActive", String(this.IsActive));
    }
    if (this.ApprovedStatus !== null) {
      params.set("ApprovedStatus", this.ApprovedStatus.toString());
    }
    if (this.HavePicture !== null) {
      params.set("HavePicture", String(this.HavePicture));
    }
    if (this.HaveDescription !== null) {
      params.set("HaveDescription", String(this.HaveDescription));
    }
    if (this.HaveColor !== null) {
      params.set("HaveColor", String(this.HaveColor));
    }
    if (this.HaveOffer !== null) {
      params.set("HaveOffer", String(this.HaveOffer));
    }
    if (this.HaveItemCollectionOffer !== null) {
      params.set(
        "HaveItemCollectionOffer",
        String(this.HaveItemCollectionOffer)
      );
    }
    if (this.IsDeleted !== null) {
      params.set("IsDeleted", String(this.IsDeleted));
    }
    if (this.CheckQuantityBeforeSale !== null) {
      params.set(
        "CheckQuantityBeforeSale",
        String(this.CheckQuantityBeforeSale)
      );
    }
    if (this.CreatedAt !== null) {
      params.set("CreatedAt", this.CreatedAt);
    }
    if (this.UpdatedAt !== null) {
      params.set("UpdatedAt", this.UpdatedAt);
    }
    if (this.CreatedBy !== null) {
      params.set("CreatedBy", this.CreatedBy);
    }
    if (this.UpdatedBy !== null) {
      params.set("UpdatedBy", this.UpdatedBy);
    }
    if (this.id !== null) params.set("id", this.id.toString());
    if (this.ids !== null && Array.isArray(this.ids) && this.ids.length > 0)
      params.set("ids", this.ids.join(","));
    if (this.excludeId !== null) params.set("excludeId", this.excludeId.toString());
    if (this.CategoryId2 !== null) params.set("CategoryId2", this.CategoryId2.toString());
    if (this.CategoryId3 !== null) params.set("CategoryId3", this.CategoryId3.toString());
    if (this.CategoryId4 !== null) params.set("CategoryId4", this.CategoryId4.toString());
    if (this.NameOrBarcode !== null && this.NameOrBarcode.trim() !== "")
      params.set("NameOrBarcode", this.NameOrBarcode.trim());
    if (this.BarCode !== null && this.BarCode.trim() !== "") params.set("BarCode", this.BarCode.trim());
    if (this.FilterCollections !== null) params.set("FilterCollections", String(this.FilterCollections));
    if (this.SizeValueId !== null) params.set("SizeValueId", this.SizeValueId.toString());
    if (this.ColorId !== null) params.set("ColorId", this.ColorId.toString());
    if (this.SizePatternId !== null) params.set("SizePatternId", this.SizePatternId);
    if (this.OfferGuid !== null) params.set("OfferGuid", this.OfferGuid);
    if (this.GetColorsPictures) params.set("GetColorsPictures", "true");
    if (this.GetGeneralPictures) params.set("GetGeneralPictures", "true");
    if (this.GetSizeSet) params.set("GetSizeSet", "true");
    if (this.GetSizeSetValues) params.set("GetSizeSetValues", "true");
    if (this.GetPointOffer) params.set("GetPointOffer", "true");
    if (this.GetMenu) params.set("GetMenu", "true");
    if (this.GetMultipleMenu) params.set("GetMultipleMenu", "true");
    if (this.GetLikes) params.set("GetLikes", "true");
    if (this.GetWishes) params.set("GetWishes", "true");
    if (this.GetFavourites) params.set("GetFavourites", "true");
    if (this.GetRating) params.set("GetRating", "true");
    if (this.GetTempPicture) params.set("GetTempPicture", "true");
    if (this.GetCategory) params.set("GetCategory", "true");
    if (this.GetUnit) params.set("GetUnit", "true");
    if (this.GetStoreId) params.set("GetStoreId", "true");
    if (this.GetPoints) params.set("GetPoints", "true");
    if (this.GetPriceAfterDiscount) params.set("GetPriceAfterDiscount", "true");
    if (this.GetSyncThirdPartyId) params.set("GetSyncThirdPartyId", "true");
    if (this.GetDarkOffer) params.set("GetDarkOffer", "true");
    if (this.CombineNameAndBarcode !== null)
      params.set("CombineNameAndBarcode", String(this.CombineNameAndBarcode));
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
    if (this.GetBrand) map.GetBrand = true;
    if (this.getColors) map.getColors = true;
    if (this.getColorsDefaultPictures) map.getColorsDefaultPictures = true;
    if (this.getOffer) map.getOffer = true;
    if (this.getSize) map.getSize = true;
    if (this.getCollections) map.getCollections = true;
    if (this.branchId !== null) map.branchId = this.branchId;
    if (this.storeId !== null) {
      map.StoreId = this.storeId;
      map.storeId = this.storeId;
    }
    if (this.id !== null) map.id = this.id;
    if (this.ids !== null && Array.isArray(this.ids) && this.ids.length > 0)
      map.ids = this.ids;
    if (this.excludeId !== null) map.excludeId = this.excludeId;
    if (this.CategoryId2 !== null) map.CategoryId2 = this.CategoryId2;
    if (this.CategoryId3 !== null) map.CategoryId3 = this.CategoryId3;
    if (this.CategoryId4 !== null) map.CategoryId4 = this.CategoryId4;
    if (this.NameOrBarcode !== null && this.NameOrBarcode.trim() !== "")
      map.NameOrBarcode = this.NameOrBarcode.trim();
    if (this.BarCode !== null && this.BarCode.trim() !== "") map.BarCode = this.BarCode.trim();
    if (this.FilterCollections !== null) map.FilterCollections = this.FilterCollections;
    if (this.SizeValueId !== null) map.SizeValueId = this.SizeValueId;
    if (this.ColorId !== null) map.ColorId = this.ColorId;
    if (this.SizePatternId !== null) map.SizePatternId = this.SizePatternId;
    if (this.OfferGuid !== null) map.OfferGuid = this.OfferGuid;
    if (this.GetColorsPictures) map.GetColorsPictures = true;
    if (this.GetGeneralPictures) map.GetGeneralPictures = true;
    if (this.GetSizeSet) map.GetSizeSet = true;
    if (this.GetSizeSetValues) map.GetSizeSetValues = true;
    if (this.GetPointOffer) map.GetPointOffer = true;
    if (this.GetMenu) map.GetMenu = true;
    if (this.GetMultipleMenu) map.GetMultipleMenu = true;
    if (this.GetLikes) map.GetLikes = true;
    if (this.GetWishes) map.GetWishes = true;
    if (this.GetFavourites) map.GetFavourites = true;
    if (this.GetRating) map.GetRating = true;
    if (this.GetTempPicture) map.GetTempPicture = true;
    if (this.GetCategory) map.GetCategory = true;
    if (this.GetUnit) map.GetUnit = true;
    if (this.GetStoreId) map.GetStoreId = true;
    if (this.GetPoints) map.GetPoints = true;
    if (this.GetPriceAfterDiscount) map.GetPriceAfterDiscount = true;
    if (this.GetSyncThirdPartyId) map.GetSyncThirdPartyId = true;
    if (this.GetDarkOffer) map.GetDarkOffer = true;
    if (this.CombineNameAndBarcode !== null) map.CombineNameAndBarcode = this.CombineNameAndBarcode;
    if (this.availability !== null) map.availability = this.availability;
    if (this.minRating !== null) map.minRating = this.minRating;
    if (this.hasDiscount !== null) map.hasDiscount = this.hasDiscount;
    if (this.minDiscountPercentage !== null)
      map.minDiscountPercentage = this.minDiscountPercentage;
    if (this.ItemQuantityStatus !== null)
      map.ItemQuantityStatus = this.ItemQuantityStatus;
    if (this.SyncThirdPartyIds !== null)
      map.SyncThirdPartyIds = this.SyncThirdPartyIds;
    if (this.SyncThirdPartyId !== null)
      map.SyncThirdPartyId = this.SyncThirdPartyId;
    if (this.RejectionNote !== null) map.RejectionNote = this.RejectionNote;
    if (this.Deliveryability !== null)
      map.Deliveryability = this.Deliveryability;
    if (this.Availability !== null) map.Availability = this.Availability;
    if (this.IsMultiMenuStore !== null)
      map.IsMultiMenuStore = this.IsMultiMenuStore;
    if (this.UseApprovalSystem !== null)
      map.UseApprovalSystem = this.UseApprovalSystem;
    if (this.CurrentSortField !== null)
      map.CurrentSortField = this.CurrentSortField;
    if (this.CurrentSortOrder !== null)
      map.CurrentSortOrder = this.CurrentSortOrder;
    if (this.Code !== null && this.Code.trim() !== "")
      map.Code = this.Code.trim();
    if (this.barcode !== null && this.barcode.trim() !== "")
      map.barcode = this.barcode.trim();
    if (this.IsFeatured !== null) map.IsFeatured = this.IsFeatured;
    if (this.IsActive !== null) map.IsActive = this.IsActive;
    if (this.ApprovedStatus !== null) map.ApprovedStatus = this.ApprovedStatus;
    if (this.HavePicture !== null) map.HavePicture = this.HavePicture;
    if (this.HaveDescription !== null)
      map.HaveDescription = this.HaveDescription;
    if (this.HaveColor !== null) map.HaveColor = this.HaveColor;
    if (this.HaveOffer !== null) map.HaveOffer = this.HaveOffer;
    if (this.HaveItemCollectionOffer !== null)
      map.HaveItemCollectionOffer = this.HaveItemCollectionOffer;
    if (this.IsDeleted !== null) map.IsDeleted = this.IsDeleted;
    if (this.CheckQuantityBeforeSale !== null)
      map.CheckQuantityBeforeSale = this.CheckQuantityBeforeSale;
    if (this.CreatedAt !== null) map.CreatedAt = this.CreatedAt;
    if (this.UpdatedAt !== null) map.UpdatedAt = this.UpdatedAt;
    if (this.CreatedBy !== null) map.CreatedBy = this.CreatedBy;
    if (this.UpdatedBy !== null) map.UpdatedBy = this.UpdatedBy;
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
      GetBrand: params.get("GetBrand") === "true",
      getColors: params.get("getColors") === "true",
      getColorsDefaultPictures: params.get("getColorsDefaultPictures") === "true" || null,
      getOffer: params.get("getOffer") === "true",
      getSize: params.get("getSize") === "true",
      getCollections: params.get("getCollections") === "true",
      branchId: params.get("branchId") ? parseInt(params.get("branchId")) : null,
      // Accept both "StoreId" and "storeId" when parsing query params.
      storeId: params.get("StoreId") ? parseInt(params.get("StoreId")) : params.get("storeId") ? parseInt(params.get("storeId")) : null,
      availability: params.get("availability") ? params.get("availability") === "true" : null,
      minRating: params.get("minRating") ? parseFloat(params.get("minRating")) : null,
      hasDiscount: params.get("hasDiscount") ? params.get("hasDiscount") === "true" : null,
      minDiscountPercentage: params.get("minDiscountPercentage") ? parseFloat(params.get("minDiscountPercentage")) : null,
      ItemQuantityStatus: params.get("ItemQuantityStatus") ? parseInt(params.get("ItemQuantityStatus")) : null,
      SyncThirdPartyIds: params.get("SyncThirdPartyIds") || null,
      SyncThirdPartyId: params.get("SyncThirdPartyId") || null,
      RejectionNote: params.get("RejectionNote") || null,
      // new identifier and collection fields
      id: params.get("id") ? parseInt(params.get("id")) : null,
      ids: params.get("ids") ? params.get("ids").split(",").map((s) => parseInt(s)).filter((n) => !Number.isNaN(n)) : null,
      excludeId: params.get("excludeId") ? parseInt(params.get("excludeId")) : null,
      CategoryId2: params.get("CategoryId2") ? parseInt(params.get("CategoryId2")) : null,
      CategoryId3: params.get("CategoryId3") ? parseInt(params.get("CategoryId3")) : null,
      CategoryId4: params.get("CategoryId4") ? parseInt(params.get("CategoryId4")) : null,
      NameOrBarcode: params.get("NameOrBarcode") || null,
      BarCode: params.get("BarCode") || null,
      FilterCollections: params.get("FilterCollections") ? params.get("FilterCollections") === "true" : null,
      SizeValueId: params.get("SizeValueId") ? parseInt(params.get("SizeValueId")) : null,
      ColorId: params.get("ColorId") ? parseInt(params.get("ColorId")) : null,
      SizePatternId: params.get("SizePatternId") || null,
      OfferGuid: params.get("OfferGuid") || null,
      GetColorsPictures: params.get("GetColorsPictures") === "true",
      GetGeneralPictures: params.get("GetGeneralPictures") === "true",
      GetSizeSet: params.get("GetSizeSet") === "true",
      GetSizeSetValues: params.get("GetSizeSetValues") === "true",
      GetPointOffer: params.get("GetPointOffer") === "true",
      GetMenu: params.get("GetMenu") === "true",
      GetMultipleMenu: params.get("GetMultipleMenu") === "true",
      GetLikes: params.get("GetLikes") === "true",
      GetWishes: params.get("GetWishes") === "true",
      GetFavourites: params.get("GetFavourites") === "true",
      GetRating: params.get("GetRating") === "true",
      GetTempPicture: params.get("GetTempPicture") === "true",
      GetCategory: params.get("GetCategory") === "true",
      GetUnit: params.get("GetUnit") === "true",
      GetStoreId: params.get("GetStoreId") === "true",
      GetPoints: params.get("GetPoints") === "true",
      GetPriceAfterDiscount: params.get("GetPriceAfterDiscount") === "true",
      GetSyncThirdPartyId: params.get("GetSyncThirdPartyId") === "true",
      GetDarkOffer: params.get("GetDarkOffer") === "true",
      CombineNameAndBarcode: params.get("CombineNameAndBarcode") ? params.get("CombineNameAndBarcode") === "true" : null,
      Deliveryability: params.get("Deliveryability") ? params.get("Deliveryability") === "true" : null,
      Availability: params.get("Availability") ? params.get("Availability") === "true" : null,
      IsMultiMenuStore: params.get("IsMultiMenuStore") ? params.get("IsMultiMenuStore") === "true" : null,
      UseApprovalSystem: params.get("UseApprovalSystem") ? params.get("UseApprovalSystem") === "true" : null,
      CurrentSortField: params.get("CurrentSortField") || null,
      CurrentSortOrder: params.get("CurrentSortOrder") || null,
      Code: params.get("Code") || null,
      barcode: params.get("barcode") || null,
      IsFeatured: params.get("IsFeatured") ? params.get("IsFeatured") === "true" : null,
      IsActive: params.get("IsActive") ? params.get("IsActive") === "true" : null,
      ApprovedStatus: params.get("ApprovedStatus") ? parseInt(params.get("ApprovedStatus")) : null,
      HavePicture: params.get("HavePicture") ? params.get("HavePicture") === "true" : null,
      HaveDescription: params.get("HaveDescription") ? params.get("HaveDescription") === "true" : null,
      HaveColor: params.get("HaveColor") ? params.get("HaveColor") === "true" : null,
      HaveOffer: params.get("HaveOffer") ? params.get("HaveOffer") === "true" : null,
      HaveItemCollectionOffer: params.get("HaveItemCollectionOffer") ? params.get("HaveItemCollectionOffer") === "true" : null,
      CreatedAt: params.get("CreatedAt") || null,
      UpdatedAt: params.get("UpdatedAt") || null,
      CreatedBy: params.get("CreatedBy") || null,
      UpdatedBy: params.get("UpdatedBy") || null,
      IsDeleted: params.get("IsDeleted") ? params.get("IsDeleted") === "true" : null,
      CheckQuantityBeforeSale: params.get("CheckQuantityBeforeSale") ? params.get("CheckQuantityBeforeSale") === "true" : null
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
