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
  getBrand: boolean;
  getColors: boolean;
  getColorsDefaultPictures: boolean | null;
  getOffer: boolean;
  getSize: boolean;
  // Collections
  getCollections: boolean;
  // Location-based
  branchId: number | null;
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
    getBrand?: boolean;
    getColors?: boolean;
    getColorsDefaultPictures?: boolean | null;
    getOffer?: boolean;
    getSize?: boolean;
    getCollections?: boolean;
    branchId?: number | null;
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
    this.SyncThirdPartyId = SyncThirdPartyId;
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
      getBrand:
        updates.getBrand !== undefined ? updates.getBrand : this.getBrand,
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
      Code:
        updates.Code !== undefined
          ? updates.Code
          : this.Code,
      barcode:
        updates.barcode !== undefined
          ? updates.barcode
          : this.barcode,
      IsFeatured:
        updates.IsFeatured !== undefined
          ? updates.IsFeatured
          : this.IsFeatured,
      IsActive:
        updates.IsActive !== undefined
          ? updates.IsActive
          : this.IsActive,
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
        updates.HaveColor !== undefined
          ? updates.HaveColor
          : this.HaveColor,
      HaveOffer:
        updates.HaveOffer !== undefined
          ? updates.HaveOffer
          : this.HaveOffer,
      HaveItemCollectionOffer:
        updates.HaveItemCollectionOffer !== undefined
          ? updates.HaveItemCollectionOffer
          : this.HaveItemCollectionOffer,
      IsDeleted:
        updates.IsDeleted !== undefined
          ? updates.IsDeleted
          : this.IsDeleted,
      CheckQuantityBeforeSale:
        updates.CheckQuantityBeforeSale !== undefined
          ? updates.CheckQuantityBeforeSale
          : this.CheckQuantityBeforeSale,
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
    // Add location filter
    if (this.branchId !== null) {
      params.set("branchId", this.branchId.toString());
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
      params.set("HaveItemCollectionOffer", String(this.HaveItemCollectionOffer));
    }
    if (this.IsDeleted !== null) {
      params.set("IsDeleted", String(this.IsDeleted));
    }
    if (this.CheckQuantityBeforeSale !== null) {
      params.set("CheckQuantityBeforeSale", String(this.CheckQuantityBeforeSale));
    }
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
    if (this.SyncThirdPartyId !== null)
      map.SyncThirdPartyId = this.SyncThirdPartyId;
    if (this.RejectionNote !== null)
      map.RejectionNote = this.RejectionNote;
    if (this.Deliveryability !== null)
      map.Deliveryability = this.Deliveryability;
    if (this.Availability !== null)
      map.Availability = this.Availability;
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
    if (this.IsFeatured !== null)
      map.IsFeatured = this.IsFeatured;
    if (this.IsActive !== null)
      map.IsActive = this.IsActive;
    if (this.ApprovedStatus !== null)
      map.ApprovedStatus = this.ApprovedStatus;
    if (this.HavePicture !== null)
      map.HavePicture = this.HavePicture;
    if (this.HaveDescription !== null)
      map.HaveDescription = this.HaveDescription;
    if (this.HaveColor !== null)
      map.HaveColor = this.HaveColor;
    if (this.HaveOffer !== null)
      map.HaveOffer = this.HaveOffer;
    if (this.HaveItemCollectionOffer !== null)
      map.HaveItemCollectionOffer = this.HaveItemCollectionOffer;
    if (this.IsDeleted !== null)
      map.IsDeleted = this.IsDeleted;
    if (this.CheckQuantityBeforeSale !== null)
      map.CheckQuantityBeforeSale = this.CheckQuantityBeforeSale;
      
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
      getBrand: params.get("getBrand") === "true",
      getColors: params.get("getColors") === "true",
      getColorsDefaultPictures:
        params.get("getColorsDefaultPictures") === "true" || null,
      getOffer: params.get("getOffer") === "true",
      getSize: params.get("getSize") === "true",
      getCollections: params.get("getCollections") === "true",
      branchId: params.get("branchId")
        ? parseInt(params.get("branchId")!)
        : null,
      availability: params.get("availability")
        ? params.get("availability") === "true"
        : null,
      minRating: params.get("minRating")
        ? parseFloat(params.get("minRatin g")!)
        : null,
      hasDiscount: params.get("hasDiscount")
        ? params.get("hasDiscount") === "true"
        : null,
      minDiscountPercentage: params.get("minDiscountPercentage")
        ? parseFloat(params.get("minDiscountPercentage")!)
        : null,
    });
  }
}






