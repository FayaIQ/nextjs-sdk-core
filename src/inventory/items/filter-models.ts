/**
 * Sort types available for product filtering
 * Based on the API documentation
 */
export enum SortType {
  None = "None",
  Newest = "Newest",
  LowPrice = "LowPrice",
  HighPrice = "HighPrice",
  BestSelling = "BestSelling",
  MostViewed = "MostViewed", // For most viewed products
  Name = "Name", // A-Z alphabetical sorting
}
/**
 * Gender filter options
 */
export enum Gender {
  Male = 1,
  Female = 2,
  Unisex = 3,
}
/**
 * Age group filter options
 */
export enum AgeGroup {
  Baby = 1,
  Kids = 2,
  Teens = 3,
  Adults = 4,
  Seniors = 5,
}
/**
 * New arrival time periods
 */
export enum NewArrivalPeriod {
  Last_7_Days = "Last_7_Days",
  Last_30_Days = "Last_30_Days",
  Last_90_Days = "Last_90_Days",
}
/**
 * Paging and basic sorting configuration
 */
export class PagingParameters {
  currentPage: number;
  pageSize: number;
  sortField: string | null;
  constructor({
    currentPage = 1,
    pageSize = 20,
    sortField = null,
  }: {
    currentPage?: number;
    pageSize?: number;
    sortField?: string | null;
  } = {}) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sortField = sortField;
  }
  /**
   * Convert to URL parameters
   */
  toURLParams(): Record<string, string> {
    const params: Record<string, string> = {
      currentPage: this.currentPage.toString(),
      pageSize: this.pageSize.toString(),
    };
    if (this.sortField) {
      params.sortField = this.sortField;
    }
    return params;
  }
}
/**
 * Main filter class that handles all product filtering and sorting parameters
 */
export class ItemsFilterParameters {
  // Pagination
  pagingParameters: PagingParameters;
  // Sorting
  sortType: SortType;

  // Category filtering
  menuId: number | null;
  categoryId: number | null;
  // Price filtering
  minPrice: number | null;
  maxPrice: number | null;
  // Search
  name: string | null;
  // Demographics
  gender: Gender | null;
  age: AgeGroup | null;
  // Brand/Source

  sourceId: number | null;
  // Offers
  offerId: number | null;
  // Time-based filtering
  newArrival: NewArrivalPeriod | null;
  // Additional data flags
  GetBrand: boolean;
  getColors: boolean;
  getColorsDefaultPictures: boolean | null;
  getOffer: boolean;
  getSize: boolean;
  // Collections
  getCollections: boolean;
  // Location-based
  branchId: number | null;
  // Store filtering
  storeId: number | null;
  // Identifiers and extras
  id: number | null;
  ids: number[] | null;
  excludeId: number | null;
  CategoryId2: number | null;
  CategoryId3: number | null;
  CategoryId4: number | null;
  NameOrBarcode: string | null;
  BarCode: string | null;
  // Filter collections flag
  FilterCollections: boolean | null;
  // Size / color / patterns
  SizeValueId: number | null;
  ColorId: number | null;
  SizePatternId: string | null;
  // Offer may be passed as GUID in some APIs
  OfferGuid: string | null;
  // Additional getter flags
  GetColorsPictures: boolean | null;
  GetGeneralPictures: boolean | null;
  GetSizeSet: boolean | null;
  GetSizeSetValues: boolean | null;
  GetPointOffer: boolean | null;
  GetMenu: boolean | null;
  GetMultipleMenu: boolean | null;
  GetLikes: boolean | null;
  GetWishes: boolean | null;
  GetFavourites: boolean | null;
  GetRating: boolean | null;
  GetTempPicture: boolean | null;
  GetCategory: boolean | null;
  GetUnit: boolean | null;
  GetStoreId: boolean | null;
  GetPoints: boolean | null;
  GetPriceAfterDiscount: boolean | null;
  GetSyncThirdPartyId: boolean | null;
  GetDarkOffer: boolean | null;
  CombineNameAndBarcode: boolean | null;
  // Availability
  availability: boolean | null;
  // Rating
  minRating: number | null;
  // Discount
  hasDiscount: boolean | null;
  minDiscountPercentage: number | null;
  //
  ItemQuantityStatus: number | null;
  SyncThirdPartyIds: string | null;
  SyncThirdPartyId: string | null;

  RejectionNote: string | null;
  Deliveryability: boolean | null;
  Availability: boolean | null;

  // New parameters
  IsMultiMenuStore: boolean | null;
  UseApprovalSystem: boolean | null;
  CurrentSortField: string | null;
  CurrentSortOrder: string | null;
  Code: string | null;
  barcode: string | null;
  IsFeatured: boolean | null;
  IsActive: boolean | null;
  ApprovedStatus: number | null;
  HavePicture: boolean | null;
  HaveDescription: boolean | null;
  HaveColor: boolean | null;
  HaveOffer: boolean | null;
  HaveItemCollectionOffer: boolean | null;
  IsDeleted: boolean | null;
  CheckQuantityBeforeSale: boolean | null;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  CreatedBy: string | null;
  UpdatedBy: string | null;

  constructor({
    pagingParameters = new PagingParameters(),
    sortType = SortType.None,
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
  UpdatedBy = null,
  }: {
    pagingParameters?: PagingParameters;
    sortType?: SortType;
    menuId?: number | null;
    categoryId?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    name?: string | null;
    gender?: Gender | null;
    age?: AgeGroup | null;
    sourceId?: number | null;
    offerId?: number | null;
    newArrival?: NewArrivalPeriod | null;
    GetBrand?: boolean;
    getColors?: boolean;
    getColorsDefaultPictures?: boolean | null;
    getOffer?: boolean;
    getSize?: boolean;
    getCollections?: boolean;
    branchId?: number | null;
  storeId?: number | null;
    availability?: boolean | null;
    minRating?: number | null;
    hasDiscount?: boolean | null;
    minDiscountPercentage?: number | null;
    ItemQuantityStatus?: number | null;
    RejectionNote?: string | null;
    Deliveryability?: boolean | null;
    Availability?: boolean | null;
    SyncThirdPartyIds?: string | null;
    SyncThirdPartyId?: string | null;
    IsMultiMenuStore?: boolean | null;
    UseApprovalSystem?: boolean | null;
    CurrentSortField?: string | null;
    CurrentSortOrder?: string | null;
    Code?: string | null;
    barcode?: string | null;
    IsFeatured?: boolean | null;
    IsActive?: boolean | null;
    ApprovedStatus?: number | null;
    HavePicture?: boolean | null;
    HaveDescription?: boolean | null;
    HaveColor?: boolean | null;
    HaveOffer?: boolean | null;
    HaveItemCollectionOffer?: boolean | null;
    IsDeleted?: boolean | null;
    CheckQuantityBeforeSale?: boolean | null;
  CreatedAt?: string | null;
  UpdatedAt?: string | null;
  CreatedBy?: string | null;
  UpdatedBy?: string | null;
    // new fields
    id?: number | null;
    ids?: number[] | null;
    excludeId?: number | null;
    CategoryId2?: number | null;
    CategoryId3?: number | null;
    CategoryId4?: number | null;
    NameOrBarcode?: string | null;
    BarCode?: string | null;
    FilterCollections?: boolean | null;
    SizeValueId?: number | null;
    ColorId?: number | null;
    SizePatternId?: string | null;
    OfferGuid?: string | null;
    GetColorsPictures?: boolean | null;
    GetGeneralPictures?: boolean | null;
    GetSizeSet?: boolean | null;
    GetSizeSetValues?: boolean | null;
    GetPointOffer?: boolean | null;
    GetMenu?: boolean | null;
    GetMultipleMenu?: boolean | null;
    GetLikes?: boolean | null;
    GetWishes?: boolean | null;
    GetFavourites?: boolean | null;
    GetRating?: boolean | null;
    GetTempPicture?: boolean | null;
    GetCategory?: boolean | null;
    GetUnit?: boolean | null;
    GetStoreId?: boolean | null;
    GetPoints?: boolean | null;
    GetPriceAfterDiscount?: boolean | null;
    GetSyncThirdPartyId?: boolean | null;
    GetDarkOffer?: boolean | null;
    CombineNameAndBarcode?: boolean | null;
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
  // new fields assignment
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
  copyWith(updates: Partial<ItemsFilterParameters>): ItemsFilterParameters {
    return new ItemsFilterParameters({
      pagingParameters: updates.pagingParameters || this.pagingParameters,
      sortType:
        updates.sortType !== undefined ? updates.sortType : this.sortType,
      menuId: updates.menuId !== undefined ? updates.menuId : this.menuId,
      categoryId:
        updates.categoryId !== undefined ? updates.categoryId : this.categoryId,
      minPrice:
        updates.minPrice !== undefined ? updates.minPrice : this.minPrice,
      maxPrice:
        updates.maxPrice !== undefined ? updates.maxPrice : this.maxPrice,
      name: updates.name !== undefined ? updates.name : this.name,
      gender: updates.gender !== undefined ? updates.gender : this.gender,
      age: updates.age !== undefined ? updates.age : this.age,
      sourceId:
        updates.sourceId !== undefined ? updates.sourceId : this.sourceId,
      offerId: updates.offerId !== undefined ? updates.offerId : this.offerId,
      newArrival:
        updates.newArrival !== undefined ? updates.newArrival : this.newArrival,
      GetBrand:
        updates.GetBrand !== undefined ? updates.GetBrand : this.GetBrand,
      getColors:
        updates.getColors !== undefined ? updates.getColors : this.getColors,
      getColorsDefaultPictures:
        updates.getColorsDefaultPictures !== undefined
          ? updates.getColorsDefaultPictures
          : this.getColorsDefaultPictures,
      getOffer:
        updates.getOffer !== undefined ? updates.getOffer : this.getOffer,
      getSize: updates.getSize !== undefined ? updates.getSize : this.getSize,
      getCollections:
        updates.getCollections !== undefined
          ? updates.getCollections
          : this.getCollections,
      branchId:
        updates.branchId !== undefined ? updates.branchId : this.branchId,
      storeId: updates.storeId !== undefined ? updates.storeId : this.storeId,
      availability:
        updates.availability !== undefined
          ? updates.availability
          : this.availability,
      minRating:
        updates.minRating !== undefined ? updates.minRating : this.minRating,
      hasDiscount:
        updates.hasDiscount !== undefined
          ? updates.hasDiscount
          : this.hasDiscount,
      minDiscountPercentage:
        updates.minDiscountPercentage !== undefined
          ? updates.minDiscountPercentage
          : this.minDiscountPercentage,
      ItemQuantityStatus:
        updates.ItemQuantityStatus !== undefined
          ? updates.ItemQuantityStatus
          : this.ItemQuantityStatus,
      SyncThirdPartyIds:
        updates.SyncThirdPartyIds !== undefined
          ? updates.SyncThirdPartyIds
          : this.SyncThirdPartyIds,
      SyncThirdPartyId:
        updates.SyncThirdPartyId !== undefined
          ? updates.SyncThirdPartyId
          : this.SyncThirdPartyId,
      RejectionNote:
        updates.RejectionNote !== undefined
          ? updates.RejectionNote
          : this.RejectionNote,
      Deliveryability:
        updates.Deliveryability !== undefined
          ? updates.Deliveryability
          : this.Deliveryability,
      Availability:
        updates.Availability !== undefined
          ? updates.Availability
          : this.Availability,
      IsMultiMenuStore:
        updates.IsMultiMenuStore !== undefined
          ? updates.IsMultiMenuStore
          : this.IsMultiMenuStore,
      UseApprovalSystem:
        updates.UseApprovalSystem !== undefined
          ? updates.UseApprovalSystem
          : this.UseApprovalSystem,
      CurrentSortField:
        updates.CurrentSortField !== undefined
          ? updates.CurrentSortField
          : this.CurrentSortField,
      CurrentSortOrder:
        updates.CurrentSortOrder !== undefined
          ? updates.CurrentSortOrder
          : this.CurrentSortOrder,
      Code: updates.Code !== undefined ? updates.Code : this.Code,
      barcode: updates.barcode !== undefined ? updates.barcode : this.barcode,
      IsFeatured:
        updates.IsFeatured !== undefined ? updates.IsFeatured : this.IsFeatured,
      IsActive:
        updates.IsActive !== undefined ? updates.IsActive : this.IsActive,
      ApprovedStatus:
        updates.ApprovedStatus !== undefined
          ? updates.ApprovedStatus
          : this.ApprovedStatus,
      HavePicture:
        updates.HavePicture !== undefined
          ? updates.HavePicture
          : this.HavePicture,
      HaveDescription:
        updates.HaveDescription !== undefined
          ? updates.HaveDescription
          : this.HaveDescription,
      HaveColor:
        updates.HaveColor !== undefined ? updates.HaveColor : this.HaveColor,
      HaveOffer:
        updates.HaveOffer !== undefined ? updates.HaveOffer : this.HaveOffer,
      HaveItemCollectionOffer:
        updates.HaveItemCollectionOffer !== undefined
          ? updates.HaveItemCollectionOffer
          : this.HaveItemCollectionOffer,
      IsDeleted:
        updates.IsDeleted !== undefined ? updates.IsDeleted : this.IsDeleted,
      CreatedAt:
        updates.CreatedAt !== undefined ? updates.CreatedAt : this.CreatedAt,
      UpdatedAt:
        updates.UpdatedAt !== undefined ? updates.UpdatedAt : this.UpdatedAt,
      CreatedBy:
        updates.CreatedBy !== undefined ? updates.CreatedBy : this.CreatedBy,
      UpdatedBy:
        updates.UpdatedBy !== undefined ? updates.UpdatedBy : this.UpdatedBy,
      CheckQuantityBeforeSale:
        updates.CheckQuantityBeforeSale !== undefined
          ? updates.CheckQuantityBeforeSale
          : this.CheckQuantityBeforeSale,
      // new fields
      id: updates.id !== undefined ? updates.id : this.id,
      ids: updates.ids !== undefined ? updates.ids : this.ids,
      excludeId:
        updates.excludeId !== undefined ? updates.excludeId : this.excludeId,
      CategoryId2:
        updates.CategoryId2 !== undefined ? updates.CategoryId2 : this.CategoryId2,
      CategoryId3:
        updates.CategoryId3 !== undefined ? updates.CategoryId3 : this.CategoryId3,
      CategoryId4:
        updates.CategoryId4 !== undefined ? updates.CategoryId4 : this.CategoryId4,
      NameOrBarcode:
        updates.NameOrBarcode !== undefined ? updates.NameOrBarcode : this.NameOrBarcode,
      BarCode: updates.BarCode !== undefined ? updates.BarCode : this.BarCode,
      FilterCollections:
        updates.FilterCollections !== undefined
          ? updates.FilterCollections
          : this.FilterCollections,
      SizeValueId:
        updates.SizeValueId !== undefined ? updates.SizeValueId : this.SizeValueId,
      ColorId: updates.ColorId !== undefined ? updates.ColorId : this.ColorId,
      SizePatternId:
        updates.SizePatternId !== undefined ? updates.SizePatternId : this.SizePatternId,
      OfferGuid: updates.OfferGuid !== undefined ? updates.OfferGuid : this.OfferGuid,
      GetColorsPictures:
        updates.GetColorsPictures !== undefined
          ? updates.GetColorsPictures
          : this.GetColorsPictures,
      GetGeneralPictures:
        updates.GetGeneralPictures !== undefined
          ? updates.GetGeneralPictures
          : this.GetGeneralPictures,
      GetSizeSet:
        updates.GetSizeSet !== undefined ? updates.GetSizeSet : this.GetSizeSet,
      GetSizeSetValues:
        updates.GetSizeSetValues !== undefined
          ? updates.GetSizeSetValues
          : this.GetSizeSetValues,
      GetPointOffer:
        updates.GetPointOffer !== undefined
          ? updates.GetPointOffer
          : this.GetPointOffer,
      GetMenu: updates.GetMenu !== undefined ? updates.GetMenu : this.GetMenu,
      GetMultipleMenu:
        updates.GetMultipleMenu !== undefined
          ? updates.GetMultipleMenu
          : this.GetMultipleMenu,
      GetLikes: updates.GetLikes !== undefined ? updates.GetLikes : this.GetLikes,
      GetWishes:
        updates.GetWishes !== undefined ? updates.GetWishes : this.GetWishes,
      GetFavourites:
        updates.GetFavourites !== undefined
          ? updates.GetFavourites
          : this.GetFavourites,
      GetRating:
        updates.GetRating !== undefined ? updates.GetRating : this.GetRating,
      GetTempPicture:
        updates.GetTempPicture !== undefined
          ? updates.GetTempPicture
          : this.GetTempPicture,
      GetCategory:
        updates.GetCategory !== undefined ? updates.GetCategory : this.GetCategory,
      GetUnit: updates.GetUnit !== undefined ? updates.GetUnit : this.GetUnit,
      GetStoreId:
        updates.GetStoreId !== undefined ? updates.GetStoreId : this.GetStoreId,
      GetPoints:
        updates.GetPoints !== undefined ? updates.GetPoints : this.GetPoints,
      GetPriceAfterDiscount:
        updates.GetPriceAfterDiscount !== undefined
          ? updates.GetPriceAfterDiscount
          : this.GetPriceAfterDiscount,
      GetSyncThirdPartyId:
        updates.GetSyncThirdPartyId !== undefined
          ? updates.GetSyncThirdPartyId
          : this.GetSyncThirdPartyId,
      GetDarkOffer:
        updates.GetDarkOffer !== undefined ? updates.GetDarkOffer : this.GetDarkOffer,
      CombineNameAndBarcode:
        updates.CombineNameAndBarcode !== undefined
          ? updates.CombineNameAndBarcode
          : this.CombineNameAndBarcode,
    });
  }
  /**
   * Convert filter parameters to URL search parameters
   */
  toURLSearchParams(): URLSearchParams {
    const params = new URLSearchParams();
    // Add paging parameters
    const pagingParams = this.pagingParameters.toURLParams();
    Object.entries(pagingParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, value);
      }
    });
    // Add sort type
    if (this.sortType !== SortType.None) {
      params.set("sortType", this.sortType);
    }
    // Add category filters
    if (this.menuId !== null) {
      params.set("menuId", this.menuId.toString());
    }
    if (this.categoryId !== null) {
      params.set("categoryId", this.categoryId.toString());
    }
    // Add price filters
    if (this.minPrice !== null) {
      params.set("minPrice", this.minPrice.toString());
    }
    if (this.maxPrice !== null) {
      params.set("maxPrice", this.maxPrice.toString());
    }
    // Add search
    if (this.name !== null && this.name.trim() !== "") {
      params.set("name", this.name.trim());
    }
    // Add demographic filters
    if (this.gender !== null) {
      params.set("gender", this.gender.toString());
    }
    if (this.age !== null) {
      params.set("age", this.age.toString());
    }
    // Add brand/source filter
    if (this.sourceId !== null) {
      params.set("sourceId", this.sourceId.toString());
    }
    if (this.offerId !== null) {
      params.set("offerId", this.offerId.toString());
    }
    // Add time-based filter
    if (this.newArrival !== null) {
      params.set("newArrival", this.newArrival);
    }
    // Add additional data flags
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
    // Add location filter
    if (this.branchId !== null) {
      params.set("branchId", this.branchId.toString());
    }
    if (this.storeId !== null) {
      // Emit StoreId (capital S) to match other models/handlers which expect "StoreId".
      params.set("StoreId", this.storeId.toString());
      // Keep lowercase for backwards compatibility clients that expect it.
      params.set("storeId", this.storeId.toString());
    }
    // Add availability filter
    if (this.availability !== null) {
      params.set("availability", this.availability.toString());
    }
    // Add rating filter
    if (this.minRating !== null) {
      params.set("minRating", this.minRating.toString());
    }
    // Add discount filters
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
    // new identifier and collection fields
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
    // new Get* and other flags
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
  toMap(): Record<string, any> {
    const map: Record<string, any> = {};
    // Add paging parameters
    const pagingParams = this.pagingParameters.toURLParams();
    Object.assign(map, pagingParams);
    // Add all filter parameters
    if (this.sortType !== SortType.None) map.sortType = this.sortType;
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
    // Use StoreId key in map to match server-side naming conventions.
    map.StoreId = this.storeId;
    map.storeId = this.storeId; // keep lowercase alias for consumers
  }
    // new identifier and collection fields
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
    // Get* and other flags
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
  static fromURLSearchParams(params: URLSearchParams): ItemsFilterParameters {
    const pagingParameters = new PagingParameters({
      currentPage: params.get("currentPage")
        ? parseInt(params.get("currentPage")!)
        : 1,
      pageSize: params.get("pageSize") ? parseInt(params.get("pageSize")!) : 20,
      sortField: params.get("sortField") || null,
    });
    return new ItemsFilterParameters({
      pagingParameters,
      sortType: (params.get("sortType") as SortType) || SortType.None,
      menuId: params.get("menuId") ? parseInt(params.get("menuId")!) : null,
      categoryId: params.get("categoryId")
        ? parseInt(params.get("categoryId")!)
        : null,
      minPrice: params.get("minPrice")
        ? parseFloat(params.get("minPrice")!)
        : null,
      maxPrice: params.get("maxPrice")
        ? parseFloat(params.get("maxPrice")!)
        : null,
      name: params.get("name") || null,
      gender: params.get("gender")
        ? (parseInt(params.get("gender")!) as Gender)
        : null,
      age: params.get("age")
        ? (parseInt(params.get("age")!) as AgeGroup)
        : null,
      sourceId: params.get("sourceId")
        ? parseInt(params.get("sourceId")!)
        : null,
      offerId: params.get("offerId") ? parseInt(params.get("offerId")!) : null,
      newArrival: (params.get("newArrival") as NewArrivalPeriod) || null,
      GetBrand: params.get("GetBrand") === "true",
      getColors: params.get("getColors") === "true",
      getColorsDefaultPictures:
        params.get("getColorsDefaultPictures") === "true" || null,
      getOffer: params.get("getOffer") === "true",
      getSize: params.get("getSize") === "true",
      getCollections: params.get("getCollections") === "true",
      branchId: params.get("branchId")
        ? parseInt(params.get("branchId")!)
        : null,
      // Accept both "StoreId" and "storeId" when parsing query params.
      storeId: params.get("StoreId")
        ? parseInt(params.get("StoreId")!)
        : params.get("storeId")
        ? parseInt(params.get("storeId")!)
        : null,
      availability: params.get("availability")
        ? params.get("availability") === "true"
        : null,
      minRating: params.get("minRating")
        ? parseFloat(params.get("minRating")!)
        : null,
      hasDiscount: params.get("hasDiscount")
        ? params.get("hasDiscount") === "true"
        : null,
      minDiscountPercentage: params.get("minDiscountPercentage")
        ? parseFloat(params.get("minDiscountPercentage")!)
        : null,
      ItemQuantityStatus: params.get("ItemQuantityStatus")
        ? parseInt(params.get("ItemQuantityStatus")!)
        : null,
      SyncThirdPartyIds: params.get("SyncThirdPartyIds") || null,
      SyncThirdPartyId: params.get("SyncThirdPartyId") || null,
      RejectionNote: params.get("RejectionNote") || null,
      // new identifier and collection fields
      id: params.get("id") ? parseInt(params.get("id")!) : null,
      ids: params.get("ids")
        ? params
            .get("ids")!
            .split(",")
            .map((s) => parseInt(s))
            .filter((n) => !Number.isNaN(n))
        : null,
      excludeId: params.get("excludeId") ? parseInt(params.get("excludeId")!) : null,
      CategoryId2: params.get("CategoryId2") ? parseInt(params.get("CategoryId2")!) : null,
      CategoryId3: params.get("CategoryId3") ? parseInt(params.get("CategoryId3")!) : null,
      CategoryId4: params.get("CategoryId4") ? parseInt(params.get("CategoryId4")!) : null,
      NameOrBarcode: params.get("NameOrBarcode") || null,
      BarCode: params.get("BarCode") || null,
      FilterCollections: params.get("FilterCollections") ? params.get("FilterCollections") === "true" : null,
      SizeValueId: params.get("SizeValueId") ? parseInt(params.get("SizeValueId")!) : null,
      ColorId: params.get("ColorId") ? parseInt(params.get("ColorId")!) : null,
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
      Deliveryability: params.get("Deliveryability")
        ? params.get("Deliveryability") === "true"
        : null,
      Availability: params.get("Availability")
        ? params.get("Availability") === "true"
        : null,
      IsMultiMenuStore: params.get("IsMultiMenuStore")
        ? params.get("IsMultiMenuStore") === "true"
        : null,
      UseApprovalSystem: params.get("UseApprovalSystem")
        ? params.get("UseApprovalSystem") === "true"
        : null,
      CurrentSortField: params.get("CurrentSortField") || null,
      CurrentSortOrder: params.get("CurrentSortOrder") || null,
      Code: params.get("Code") || null,
      barcode: params.get("barcode") || null,
      IsFeatured: params.get("IsFeatured")
        ? params.get("IsFeatured") === "true"
        : null,
      IsActive: params.get("IsActive")
        ? params.get("IsActive") === "true"
        : null,
      ApprovedStatus: params.get("ApprovedStatus")
        ? parseInt(params.get("ApprovedStatus")!)
        : null,
      HavePicture: params.get("HavePicture")
        ? params.get("HavePicture") === "true"
        : null,
      HaveDescription: params.get("HaveDescription")
        ? params.get("HaveDescription") === "true"
        : null,
      HaveColor: params.get("HaveColor")
        ? params.get("HaveColor") === "true"
        : null,
      HaveOffer: params.get("HaveOffer")
        ? params.get("HaveOffer") === "true"
        : null,
      HaveItemCollectionOffer: params.get("HaveItemCollectionOffer")
        ? params.get("HaveItemCollectionOffer") === "true"
        : null,
      CreatedAt: params.get("CreatedAt") || null,
      UpdatedAt: params.get("UpdatedAt") || null,
      CreatedBy: params.get("CreatedBy") || null,
      UpdatedBy: params.get("UpdatedBy") || null,
      IsDeleted: params.get("IsDeleted")
        ? params.get("IsDeleted") === "true"
        : null,
      CheckQuantityBeforeSale: params.get("CheckQuantityBeforeSale")
        ? params.get("CheckQuantityBeforeSale") === "true"
        : null,
    });
  }
}
