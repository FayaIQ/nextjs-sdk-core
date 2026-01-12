import {
  COOKIE_NAMES,
  SECURE_COOKIE_OPTIONS,
  deleteCookie,
  getEncryptedCookie,
  setEncryptedCookie,
  setPlainCookie
} from "./chunk-UMRPSREQ.js";
import {
  apiFetch
} from "./chunk-V6ZCF377.js";
import {
  getToken
} from "./chunk-X5OKGW5W.js";
import {
  Api
} from "./chunk-B7VMWVKJ.js";
import {
  getFirebaseApp,
  getPrimaryApp,
  getSecondaryApp
} from "./chunk-IB4I2AKX.js";

// src/identity/application/storeInfo.ts
async function getStoreInfo() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core-JPQ7VQS3.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return getWithAuth(Api2.getStoreInfo);
  }
  const response = await fetch("/api/storeInfo");
  if (!response.ok) {
    throw new Error(`Failed to fetch store info: ${response.statusText}`);
  }
  return response.json();
}

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

// src/inventory/items/getProducts.ts
async function getProducts({
  filterParams
}) {
  const validSortValues = Object.values(SortType);
  if (!filterParams.sortType || !validSortValues.includes(filterParams.sortType)) {
    filterParams = filterParams.copyWith({ sortType: "None" /* None */ });
  }
  const params = filterParams.toURLSearchParams();
  console.log("Fetching products with params:", params.toString());
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    console.log(
      "Server-side fetching products with params:",
      `${Api2.getProducts}?${params.toString()}`
    );
    return getWithAuth(
      `${Api2.getProducts}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return getWithAuth(`${Api2.getProductInfo(id)}`);
  }
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/menus/getMenus.ts
async function getMenus({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core-JPQ7VQS3.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return getWithAuth(`${Api2.getMenus}?${params.toString()}`, {});
  } else {
    return fetch(`/api/menus?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

// src/inventory/orders/getOrders.ts
async function getOrders({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { default: getToken2 } = await import("./token-5GKCOF35.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    const token = await getToken2();
    return getWithAuth(
      `${Api2.getOrders}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/orders?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/brands/getBrands.ts
async function getBrands() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core-JPQ7VQS3.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return getWithAuth(Api2.getBrands);
  } else {
    const response = await fetch("/api/brands");
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  }
}

// src/inventory/items/putItemCollection.ts
async function putItemCollection(id, collectionId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return putWithAuth(Api2.putItemCollection(id, collectionId), data);
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json-patch+json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/items/putItemCollectionActivate.ts
async function putItemCollectionActivate(id, collectionId) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return putWithAuth(Api2.putItemCollectionActivate(id, collectionId));
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}/activate`, {
    method: "PUT"
  });
  if (!res.ok) {
    let err = `failed: ${res.status} ${res.statusText}`;
    try {
      const b = await res.json();
      err = b.error || b.message || err;
    } catch {
    }
    throw new Error(err);
  }
  return res.json();
}

// src/inventory/items/putItemCollectionDeactivate.ts
async function putItemCollectionDeactivate(id, collectionId) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-2NEA6CD6.js");
    const { Api: Api2 } = await import("./api-IWWKU55Q.js");
    return putWithAuth(Api2.putItemCollectionDeactivate(id, collectionId));
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}/deactivate`, {
    method: "PUT"
  });
  if (!res.ok) {
    let err = `failed: ${res.status} ${res.statusText}`;
    try {
      const b = await res.json();
      err = b.error || b.message || err;
    } catch {
    }
    throw new Error(err);
  }
  return res.json();
}

// src/inventory/orders/order-models.ts
var OrderType = /* @__PURE__ */ ((OrderType2) => {
  OrderType2[OrderType2["UnderAcceptance"] = 1] = "UnderAcceptance";
  OrderType2[OrderType2["Conformed"] = 2] = "Conformed";
  OrderType2[OrderType2["UnderPreparing"] = 3] = "UnderPreparing";
  OrderType2[OrderType2["Delivering"] = 4] = "Delivering";
  OrderType2[OrderType2["Prepared"] = 5] = "Prepared";
  OrderType2[OrderType2["Delivered"] = 6] = "Delivered";
  OrderType2[OrderType2["Rejected"] = 7] = "Rejected";
  OrderType2[OrderType2["Canceled"] = 8] = "Canceled";
  OrderType2[OrderType2["Unknown"] = 9] = "Unknown";
  return OrderType2;
})(OrderType || {});
var PayType = /* @__PURE__ */ ((PayType2) => {
  PayType2[PayType2["None"] = 0] = "None";
  PayType2[PayType2["CashOnDelivery"] = 1] = "CashOnDelivery";
  PayType2[PayType2["CashOnStore"] = 2] = "CashOnStore";
  PayType2[PayType2["CashOnline"] = 3] = "CashOnline";
  return PayType2;
})(PayType || {});
var DeleveryType = /* @__PURE__ */ ((DeleveryType2) => {
  DeleveryType2[DeleveryType2["None"] = 0] = "None";
  DeleveryType2[DeleveryType2["StorePickup"] = 1] = "StorePickup";
  DeleveryType2[DeleveryType2["HomeDelivery"] = 2] = "HomeDelivery";
  return DeleveryType2;
})(DeleveryType || {});
var Sign = /* @__PURE__ */ ((Sign2) => {
  Sign2[Sign2["Equal"] = 0] = "Equal";
  Sign2[Sign2["NotEqual"] = 1] = "NotEqual";
  Sign2[Sign2["GreaterThan"] = 2] = "GreaterThan";
  Sign2[Sign2["LessThan"] = 3] = "LessThan";
  Sign2[Sign2["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
  Sign2[Sign2["LessThanOrEqual"] = 5] = "LessThanOrEqual";
  return Sign2;
})(Sign || {});
var OrderPagingParameters = class {
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
var OrdersFilterParameters = class _OrdersFilterParameters {
  // UUID
  constructor({
    pagingParameters = new OrderPagingParameters(),
    storeId = null,
    menuId = null,
    dateFrom = null,
    dateTo = null,
    startTime = null,
    endTime = null,
    orderStatusId = null,
    orderStatusIds = null,
    isCanceled = null,
    isConfirmed = null,
    isRejected = null,
    isPrint = null,
    number = null,
    referenceId = null,
    referenceDeliveryId = null,
    locationId = null,
    countryId = null,
    cityId = null,
    districtId = null,
    buildingId = null,
    apartmentId = null,
    orderType = null,
    payType = null,
    DeleveryType: DeleveryType2 = null,
    username = null,
    customerId = null,
    delegateId = null,
    delegateWithCustomerId = null,
    statusChangedBy = null,
    viewInMainCurrency = null,
    totalAmount = null,
    sign = null,
    couponOfferId = null,
    applicationId = null
  } = {}) {
    this.pagingParameters = pagingParameters;
    this.storeId = storeId;
    this.menuId = menuId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.startTime = startTime;
    this.endTime = endTime;
    this.orderStatusId = orderStatusId;
    this.orderStatusIds = orderStatusIds;
    this.isCanceled = isCanceled;
    this.isConfirmed = isConfirmed;
    this.isRejected = isRejected;
    this.isPrint = isPrint;
    this.number = number;
    this.referenceId = referenceId;
    this.referenceDeliveryId = referenceDeliveryId;
    this.locationId = locationId;
    this.countryId = countryId;
    this.cityId = cityId;
    this.districtId = districtId;
    this.buildingId = buildingId;
    this.apartmentId = apartmentId;
    this.orderType = orderType;
    this.payType = payType;
    this.DeleveryType = DeleveryType2;
    this.username = username;
    this.customerId = customerId;
    this.delegateId = delegateId;
    this.delegateWithCustomerId = delegateWithCustomerId;
    this.statusChangedBy = statusChangedBy;
    this.viewInMainCurrency = viewInMainCurrency;
    this.totalAmount = totalAmount;
    this.sign = sign;
    this.couponOfferId = couponOfferId;
    this.applicationId = applicationId;
  }
  /**
   * Create a copy with updated parameters
   */
  copyWith(updates) {
    return new _OrdersFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      storeId: updates.storeId !== void 0 ? updates.storeId : this.storeId,
      menuId: updates.menuId !== void 0 ? updates.menuId : this.menuId,
      dateFrom: updates.dateFrom !== void 0 ? updates.dateFrom : this.dateFrom,
      dateTo: updates.dateTo !== void 0 ? updates.dateTo : this.dateTo,
      startTime: updates.startTime !== void 0 ? updates.startTime : this.startTime,
      endTime: updates.endTime !== void 0 ? updates.endTime : this.endTime,
      orderStatusId: updates.orderStatusId !== void 0 ? updates.orderStatusId : this.orderStatusId,
      orderStatusIds: updates.orderStatusIds !== void 0 ? updates.orderStatusIds : this.orderStatusIds,
      isCanceled: updates.isCanceled !== void 0 ? updates.isCanceled : this.isCanceled,
      isConfirmed: updates.isConfirmed !== void 0 ? updates.isConfirmed : this.isConfirmed,
      isRejected: updates.isRejected !== void 0 ? updates.isRejected : this.isRejected,
      isPrint: updates.isPrint !== void 0 ? updates.isPrint : this.isPrint,
      number: updates.number !== void 0 ? updates.number : this.number,
      referenceId: updates.referenceId !== void 0 ? updates.referenceId : this.referenceId,
      referenceDeliveryId: updates.referenceDeliveryId !== void 0 ? updates.referenceDeliveryId : this.referenceDeliveryId,
      locationId: updates.locationId !== void 0 ? updates.locationId : this.locationId,
      countryId: updates.countryId !== void 0 ? updates.countryId : this.countryId,
      cityId: updates.cityId !== void 0 ? updates.cityId : this.cityId,
      districtId: updates.districtId !== void 0 ? updates.districtId : this.districtId,
      buildingId: updates.buildingId !== void 0 ? updates.buildingId : this.buildingId,
      apartmentId: updates.apartmentId !== void 0 ? updates.apartmentId : this.apartmentId,
      orderType: updates.orderType !== void 0 ? updates.orderType : this.orderType,
      payType: updates.payType !== void 0 ? updates.payType : this.payType,
      DeleveryType: updates.DeleveryType !== void 0 ? updates.DeleveryType : this.DeleveryType,
      username: updates.username !== void 0 ? updates.username : this.username,
      customerId: updates.customerId !== void 0 ? updates.customerId : this.customerId,
      delegateId: updates.delegateId !== void 0 ? updates.delegateId : this.delegateId,
      delegateWithCustomerId: updates.delegateWithCustomerId !== void 0 ? updates.delegateWithCustomerId : this.delegateWithCustomerId,
      statusChangedBy: updates.statusChangedBy !== void 0 ? updates.statusChangedBy : this.statusChangedBy,
      viewInMainCurrency: updates.viewInMainCurrency !== void 0 ? updates.viewInMainCurrency : this.viewInMainCurrency,
      totalAmount: updates.totalAmount !== void 0 ? updates.totalAmount : this.totalAmount,
      sign: updates.sign !== void 0 ? updates.sign : this.sign,
      couponOfferId: updates.couponOfferId !== void 0 ? updates.couponOfferId : this.couponOfferId,
      applicationId: updates.applicationId !== void 0 ? updates.applicationId : this.applicationId
    });
  }
  /**
   * Convert to URL search parameters
   * FIXED: This is the key method that was causing the issue
   */
  toURLSearchParams() {
    const params = new URLSearchParams();
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        params.set(key, value);
      }
    });
    if (this.storeId !== null) params.set("StoreId", this.storeId.toString());
    if (this.menuId !== null) params.set("MenuId", this.menuId.toString());
    if (this.dateFrom !== null) params.set("DateFrom", this.dateFrom);
    if (this.dateTo !== null) params.set("DateTo", this.dateTo);
    if (this.startTime !== null) params.set("StartTime", this.startTime);
    if (this.endTime !== null) params.set("EndTime", this.endTime);
    if (this.orderStatusId !== null) params.set("OrderStatusId", this.orderStatusId.toString());
    if (this.orderStatusIds !== null && this.orderStatusIds.length > 0) {
      this.orderStatusIds.forEach((id) => params.append("OrderStatusIds", id.toString()));
    }
    if (this.isCanceled !== null) params.set("IsCancled", this.isCanceled.toString());
    if (this.isConfirmed !== null) params.set("IsConformed", this.isConfirmed.toString());
    if (this.isRejected !== null) params.set("IsRejected", this.isRejected.toString());
    if (this.isPrint !== null) params.set("IsPrint", this.isPrint.toString());
    if (this.number !== null) params.set("Number", this.number.toString());
    if (this.referenceId !== null) params.set("ReferenceId", this.referenceId);
    if (this.referenceDeliveryId !== null) params.set("ReferenceDeliveryId", this.referenceDeliveryId);
    if (this.locationId !== null) params.set("LocationId", this.locationId.toString());
    if (this.countryId !== null) params.set("CountryId", this.countryId.toString());
    if (this.cityId !== null) params.set("CityId", this.cityId.toString());
    if (this.districtId !== null) params.set("DistrictId", this.districtId.toString());
    if (this.buildingId !== null) params.set("BuildingId", this.buildingId.toString());
    if (this.apartmentId !== null) params.set("AppartmentId", this.apartmentId.toString());
    if (this.orderType !== null) params.set("OrderType", this.orderType.toString());
    if (this.payType !== null) params.set("PayType", this.payType.toString());
    if (this.DeleveryType !== null) params.set("DeleveryType", this.DeleveryType.toString());
    if (this.username !== null) params.set("Username", this.username);
    if (this.customerId !== null) params.set("CustomerId", this.customerId);
    if (this.delegateId !== null) params.set("DelagateId", this.delegateId);
    if (this.delegateWithCustomerId !== null) params.set("DelegateWithCustomerId", this.delegateWithCustomerId);
    if (this.statusChangedBy !== null) params.set("StatusChangedBy", this.statusChangedBy);
    if (this.viewInMainCurrency !== null) params.set("ViewInMainCurrency", this.viewInMainCurrency.toString());
    if (this.totalAmount !== null) params.set("TotalAmount", this.totalAmount.toString());
    if (this.sign !== null) params.set("Sign", this.sign.toString());
    if (this.couponOfferId !== null) params.set("CouponOfferId", this.couponOfferId);
    if (this.applicationId !== null) params.set("ApplicationId", this.applicationId);
    return params;
  }
  /**
   * Convert to plain object map
   */
  toMap() {
    const map = {};
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);
    if (this.storeId !== null) map.StoreId = this.storeId;
    if (this.menuId !== null) map.MenuId = this.menuId;
    if (this.dateFrom !== null) map.DateFrom = this.dateFrom;
    if (this.dateTo !== null) map.DateTo = this.dateTo;
    if (this.startTime !== null) map.StartTime = this.startTime;
    if (this.endTime !== null) map.EndTime = this.endTime;
    if (this.orderStatusId !== null) map.OrderStatusId = this.orderStatusId;
    if (this.orderStatusIds !== null) map.OrderStatusIds = this.orderStatusIds;
    if (this.isCanceled !== null) map.IsCancled = this.isCanceled;
    if (this.isConfirmed !== null) map.IsConformed = this.isConfirmed;
    if (this.isRejected !== null) map.IsRejected = this.isRejected;
    if (this.isPrint !== null) map.IsPrint = this.isPrint;
    if (this.number !== null) map.Number = this.number;
    if (this.referenceId !== null) map.ReferenceId = this.referenceId;
    if (this.referenceDeliveryId !== null) map.ReferenceDeliveryId = this.referenceDeliveryId;
    if (this.locationId !== null) map.LocationId = this.locationId;
    if (this.countryId !== null) map.CountryId = this.countryId;
    if (this.cityId !== null) map.CityId = this.cityId;
    if (this.districtId !== null) map.DistrictId = this.districtId;
    if (this.buildingId !== null) map.BuildingId = this.buildingId;
    if (this.apartmentId !== null) map.AppartmentId = this.apartmentId;
    if (this.orderType !== null) map.OrderType = this.orderType;
    if (this.payType !== null) map.PayType = this.payType;
    if (this.DeleveryType !== null) map.DeleveryType = this.DeleveryType;
    if (this.username !== null) map.Username = this.username;
    if (this.customerId !== null) map.CustomerId = this.customerId;
    if (this.delegateId !== null) map.DelagateId = this.delegateId;
    if (this.delegateWithCustomerId !== null) map.DelegateWithCustomerId = this.delegateWithCustomerId;
    if (this.statusChangedBy !== null) map.StatusChangedBy = this.statusChangedBy;
    if (this.viewInMainCurrency !== null) map.ViewInMainCurrency = this.viewInMainCurrency;
    if (this.totalAmount !== null) map.TotalAmount = this.totalAmount;
    if (this.sign !== null) map.Sign = this.sign;
    if (this.couponOfferId !== null) map.CouponOfferId = this.couponOfferId;
    if (this.applicationId !== null) map.ApplicationId = this.applicationId;
    return map;
  }
  /**
   * Create filter from URL search parameters
   */
  static fromURLSearchParams(params) {
    const pagingParameters = new OrderPagingParameters({
      currentPage: params.get("CurrentPage") ? parseInt(params.get("CurrentPage")) : 1,
      pageSize: params.get("PageSize") ? parseInt(params.get("PageSize")) : 20,
      sortField: params.get("SortField") || null,
      currentSortField: params.get("CurrentSortField") || null,
      currentSortOrder: params.get("CurrentSortOrder") || null
    });
    const orderStatusIds = params.getAll("OrderStatusIds").map((id) => parseInt(id));
    return new _OrdersFilterParameters({
      pagingParameters,
      storeId: params.get("StoreId") ? parseInt(params.get("StoreId")) : null,
      menuId: params.get("MenuId") ? parseInt(params.get("MenuId")) : null,
      dateFrom: params.get("DateFrom") || null,
      dateTo: params.get("DateTo") || null,
      startTime: params.get("StartTime") || null,
      endTime: params.get("EndTime") || null,
      orderStatusId: params.get("OrderStatusId") ? parseInt(params.get("OrderStatusId")) : null,
      orderStatusIds: orderStatusIds.length > 0 ? orderStatusIds : null,
      isCanceled: params.get("IsCancled") ? params.get("IsCancled") === "true" : null,
      isConfirmed: params.get("IsConformed") ? params.get("IsConformed") === "true" : null,
      isRejected: params.get("IsRejected") ? params.get("IsRejected") === "true" : null,
      isPrint: params.get("IsPrint") ? params.get("IsPrint") === "true" : null,
      number: params.get("Number") ? parseInt(params.get("Number")) : null,
      referenceId: params.get("ReferenceId") || null,
      referenceDeliveryId: params.get("ReferenceDeliveryId") || null,
      locationId: params.get("LocationId") ? parseInt(params.get("LocationId")) : null,
      countryId: params.get("CountryId") ? parseInt(params.get("CountryId")) : null,
      cityId: params.get("CityId") ? parseInt(params.get("CityId")) : null,
      districtId: params.get("DistrictId") ? parseInt(params.get("DistrictId")) : null,
      buildingId: params.get("BuildingId") ? parseInt(params.get("BuildingId")) : null,
      apartmentId: params.get("AppartmentId") ? parseInt(params.get("AppartmentId")) : null,
      orderType: params.get("OrderType") ? parseInt(params.get("OrderType")) : null,
      payType: params.get("PayType") ? parseInt(params.get("PayType")) : null,
      DeleveryType: params.get("DeleveryType") ? parseInt(params.get("DeleveryType")) : null,
      username: params.get("Username") || null,
      customerId: params.get("CustomerId") || null,
      delegateId: params.get("DelagateId") || null,
      delegateWithCustomerId: params.get("DelegateWithCustomerId") || null,
      statusChangedBy: params.get("StatusChangedBy") || null,
      viewInMainCurrency: params.get("ViewInMainCurrency") ? params.get("ViewInMainCurrency") === "true" : null,
      totalAmount: params.get("TotalAmount") ? parseFloat(params.get("TotalAmount")) : null,
      sign: params.get("Sign") ? parseInt(params.get("Sign")) : null,
      couponOfferId: params.get("CouponOfferId") || null,
      applicationId: params.get("ApplicationId") || null
    });
  }
};

// src/firebase/auth.ts
function decodeJwtPayload(token) {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const normalized = base64.replace(/-/g, "+").replace(/_/g, "/");
    const json = typeof window !== "undefined" && typeof atob === "function" ? atob(normalized) : Buffer.from(normalized, "base64").toString();
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function extractProjectIdFromIss(iss) {
  if (!iss) return null;
  const atIdx = iss.indexOf("@");
  const suffix = ".iam.gserviceaccount.com";
  if (atIdx > -1 && iss.endsWith(suffix)) {
    const host = iss.slice(atIdx + 1);
    const projectId = host.slice(0, host.length - suffix.length);
    return projectId || null;
  }
  return null;
}
async function startPhoneSignIn(phoneNumber, options) {
  if (typeof window === "undefined") {
    throw new Error("startPhoneSignIn must be called in the browser");
  }
  console.log("[firebase:startPhoneSignIn]", { phoneNumber });
  const { getSecondaryApp: getSecondaryApp2 } = await import("./config-QZGDPFPW.js");
  const { getFunctions, httpsCallable } = await import("firebase/functions");
  const secondaryApp = await getSecondaryApp2();
  const functions = getFunctions(secondaryApp);
  const sendFunctionName = options?.sendFunctionName || "whatsapp";
  const sendOtpFunction = httpsCallable(functions, sendFunctionName);
  try {
    await sendOtpFunction({
      phoneNumber,
      projectName: options?.projectName || "serlab"
    });
    console.log("[firebase:startPhoneSignIn] OTP sent via WhatsApp");
  } catch (error) {
    console.error("[firebase:startPhoneSignIn] failed to send OTP", error);
    throw error;
  }
  return {
    confirm: async (code) => {
      console.log("[firebase:confirmPhoneCode] verifying code");
      __isSigningIn = true;
      const verifyFunctionName = options?.verifyFunctionName || "verifySMS";
      const verifyOtpFunction = httpsCallable(functions, verifyFunctionName);
      try {
        const response = await verifyOtpFunction({
          phoneNumber,
          code,
          projectName: options?.projectName || "serlab"
        });
        const customToken = response.data.token;
        console.log("[firebase:confirmPhoneCode] custom token received");
        const { getPrimaryApp: getPrimaryApp2 } = await import("./config-QZGDPFPW.js");
        const {
          getAuth,
          signInWithCustomToken,
          setPersistence,
          browserLocalPersistence
        } = await import("firebase/auth");
        const primaryApp = await getPrimaryApp2();
        const auth = getAuth(primaryApp);
        try {
          await setPersistence(auth, browserLocalPersistence);
          console.log(":confirmPhoneCode] persistence set to LOCAL");
        } catch (e) {
          console.warn(
            "[firebase:confirmPhoneCode] failed to set persistence",
            e
          );
        }
        try {
          await signInWithCustomToken(auth, customToken);
          console.log(
            "[firebase:confirmPhoneCode] user signed in on primary app"
          );
        } catch (e) {
          const appProjectId = primaryApp?.options?.projectId;
          const payload = decodeJwtPayload(customToken) || {};
          const tokenProjectId = extractProjectIdFromIss(payload.iss) || payload.project_id || null;
          const code2 = e?.code || e?.message || String(e);
          const likelyMismatch = code2?.includes("auth/custom-token-mismatch") || code2?.includes("custom-token-mismatch") || code2?.includes("auth/invalid-custom-token") || code2?.includes("invalid-custom-token") || code2?.includes("CREDENTIAL_MISMATCH");
          if (likelyMismatch) {
            console.error(
              "[firebase:confirmPhoneCode] CREDENTIAL_MISMATCH \u2192 token project != client app",
              {
                code: code2,
                clientProjectId: appProjectId,
                tokenIss: payload.iss,
                tokenProjectId,
                tokenAud: payload.aud
              }
            );
            throw new Error(
              `CREDENTIAL_MISMATCH: Custom token was minted for project "${tokenProjectId ?? "<unknown>"}" but you are signing into "${appProjectId}". Ensure your verifySMS Cloud Function mints tokens using the PRIMARY project's service account (the same project used by getPrimaryApp).`
            );
          }
          throw e;
        }
        const { onAuthStateChanged } = await import("firebase/auth");
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });
        const { getIdToken } = await import("firebase/auth");
        const idToken = await getIdToken(auth.currentUser, true);
        console.log(
          "[firebase:confirmPhoneCode] ID token obtained (refreshed)"
        );
        __isSigningIn = false;
        console.log("[firebase:confirmPhoneCode] sign-in flag cleared");
        return idToken;
      } catch (error) {
        console.error("[firebase:confirmPhoneCode] verification failed", error);
        __isSigningIn = false;
        throw error;
      }
    }
  };
}
async function getFirebaseIdToken(forceRefresh = false) {
  if (typeof window === "undefined") return null;
  const [{ getAuth }, { getIdToken }, { getPrimaryApp: getPrimaryApp2 }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/auth"),
    import("./config-QZGDPFPW.js")
  ]);
  const app = await getPrimaryApp2();
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) return null;
  try {
    console.log("[firebase:getFirebaseIdToken] fetching token", {
      forceRefresh
    });
    return await getIdToken(user, forceRefresh);
  } catch (e) {
    console.log("[firebase:getFirebaseIdToken] failed to get ID token", e);
    return null;
  }
}
async function signOutFirebase() {
  if (typeof window === "undefined") return;
  const [{ getAuth, signOut }, { getPrimaryApp: getPrimaryApp2 }] = await Promise.all([
    import("firebase/auth"),
    import("./config-QZGDPFPW.js")
  ]);
  const app = await getPrimaryApp2();
  const auth = getAuth(app);
  console.log("[firebase:signOutFirebase] signing out");
  await signOut(auth);
}
var __authSyncUnsubscribe = null;
var __authSyncPromise = null;
var __lastSyncedToken = null;
var __lastSyncTime = 0;
var __isSigningIn = false;
async function startAuthStateSync(options) {
  if (typeof window === "undefined") return () => {
  };
  if (__authSyncPromise) return __authSyncPromise;
  __authSyncPromise = (async () => {
    const {
      getAuth,
      onIdTokenChanged,
      getIdToken,
      setPersistence,
      browserLocalPersistence
    } = await import("firebase/auth");
    const { getPrimaryApp: getPrimaryApp2 } = await import("./config-QZGDPFPW.js");
    const app = await getPrimaryApp2();
    const auth = getAuth(app);
    const endpoint = options?.loginEndpoint || "/api/auth/login";
    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log("[firebase:startAuthStateSync] persistence set");
    } catch (e) {
      console.warn(
        "[firebase:startAuthStateSync] failed to set persistence",
        e
      );
    }
    const STORAGE_KEY = "erp_core_last_sync_hash";
    const hashToken = async (token) => {
      try {
        if (typeof crypto !== "undefined" && crypto.subtle) {
          const encoder = new TextEncoder();
          const data = encoder.encode(token);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        }
      } catch {
      }
      let hash = 2166136261;
      for (let i = 0; i < token.length; i++) {
        hash ^= token.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      return (hash >>> 0).toString(36);
    };
    const pushTokenToServer = async (forceRefresh = false) => {
      if (__isSigningIn) {
        console.log(
          "[firebase:startAuthStateSync] skipping sync during sign-in"
        );
        return;
      }
      try {
        const user = auth.currentUser;
        if (!user) return;
        const token = await getIdToken(user, forceRefresh);
        if (!token) return;
        const now = Date.now();
        if (token === __lastSyncedToken && now - __lastSyncTime < 3e3) return;
        const tokenHash = await hashToken(token);
        try {
          const lastPersistedHash = sessionStorage.getItem(STORAGE_KEY);
          if (lastPersistedHash && lastPersistedHash === tokenHash) {
            console.log(
              "[firebase:startAuthStateSync] token already synced (session cache hit)"
            );
            return;
          }
        } catch {
        }
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ thirdPartyToken: token })
        });
        __lastSyncedToken = token;
        __lastSyncTime = now;
        try {
          sessionStorage.setItem(STORAGE_KEY, tokenHash);
        } catch {
        }
        console.log("[firebase:startAuthStateSync] token synced \u2192 server");
      } catch (e) {
        console.error("[firebase:startAuthStateSync] sync failed", e);
        options?.onError?.(e);
      }
    };
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) return;
      await pushTokenToServer(false);
    });
    __authSyncUnsubscribe = () => {
      try {
        unsubscribe();
      } catch {
      }
      __authSyncPromise = null;
      __authSyncUnsubscribe = null;
    };
    return __authSyncUnsubscribe;
  })();
  return __authSyncPromise;
}
export {
  AgeGroup,
  Api,
  COOKIE_NAMES,
  DeleveryType,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  OrderPagingParameters,
  OrderType,
  OrdersFilterParameters,
  PagingParameters,
  PayType,
  SECURE_COOKIE_OPTIONS,
  Sign,
  SortType,
  apiFetch,
  deleteCookie,
  getBrands,
  getEncryptedCookie,
  getFirebaseApp,
  getFirebaseIdToken,
  getMenus,
  getOrders,
  getPrimaryApp,
  getProductInfo,
  getProducts,
  getSecondaryApp,
  getStoreInfo,
  getToken,
  putItemCollection,
  putItemCollectionActivate,
  putItemCollectionDeactivate,
  setEncryptedCookie,
  setPlainCookie,
  signOutFirebase,
  startAuthStateSync,
  startPhoneSignIn
};
