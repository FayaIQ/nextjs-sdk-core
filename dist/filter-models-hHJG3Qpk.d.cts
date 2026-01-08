/**
 * Sort types available for product filtering
 * Based on the API documentation
 */
declare enum SortType {
    None = "None",
    Newest = "Newest",
    LowPrice = "LowPrice",
    HighPrice = "HighPrice",
    BestSelling = "BestSelling",
    MostViewed = "MostViewed",// For most viewed products
    Name = "Name"
}
/**
 * Gender filter options
 */
declare enum Gender {
    Male = 1,
    Female = 2,
    Unisex = 3
}
/**
 * Age group filter options
 */
declare enum AgeGroup {
    Baby = 1,
    Kids = 2,
    Teens = 3,
    Adults = 4,
    Seniors = 5
}
/**
 * New arrival time periods
 */
declare enum NewArrivalPeriod {
    Last_7_Days = "Last_7_Days",
    Last_30_Days = "Last_30_Days",
    Last_90_Days = "Last_90_Days"
}
/**
 * Paging and basic sorting configuration
 */
declare class PagingParameters {
    currentPage: number;
    pageSize: number;
    sortField: string | null;
    constructor({ currentPage, pageSize, sortField, }?: {
        currentPage?: number;
        pageSize?: number;
        sortField?: string | null;
    });
    /**
     * Convert to URL parameters
     */
    toURLParams(): Record<string, string>;
}
/**
 * Main filter class that handles all product filtering and sorting parameters
 */
declare class ItemsFilterParameters {
    pagingParameters: PagingParameters;
    sortType: SortType;
    menuId: number | null;
    categoryId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    name: string | null;
    gender: Gender | null;
    age: AgeGroup | null;
    sourceId: number | null;
    offerId: number | null;
    newArrival: NewArrivalPeriod | null;
    GetBrand: boolean;
    getColors: boolean;
    getColorsDefaultPictures: boolean | null;
    getOffer: boolean;
    getSize: boolean;
    getCollections: boolean;
    branchId: number | null;
    storeId: number | null;
    id: number | null;
    ids: number[] | null;
    excludeId: number | null;
    CategoryId2: number | null;
    CategoryId3: number | null;
    CategoryId4: number | null;
    NameOrBarcode: string | null;
    BarCode: string | null;
    FilterCollections: boolean | null;
    SizeValueId: number | null;
    ColorId: number | null;
    SizePatternId: string | null;
    OfferGuid: string | null;
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
    availability: boolean | null;
    minRating: number | null;
    hasDiscount: boolean | null;
    minDiscountPercentage: number | null;
    ItemQuantityStatus: number | null;
    SyncThirdPartyIds: string | null;
    SyncThirdPartyId: string | null;
    RejectionNote: string | null;
    Deliveryability: boolean | null;
    Availability: boolean | null;
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
    constructor({ pagingParameters, sortType, menuId, categoryId, minPrice, maxPrice, name, gender, age, sourceId, offerId, newArrival, GetBrand, getColors, getColorsDefaultPictures, getOffer, getSize, getCollections, branchId, storeId, id, ids, excludeId, CategoryId2, CategoryId3, CategoryId4, NameOrBarcode, BarCode, FilterCollections, SizeValueId, ColorId, SizePatternId, OfferGuid, GetColorsPictures, GetGeneralPictures, GetSizeSet, GetSizeSetValues, GetPointOffer, GetMenu, GetMultipleMenu, GetLikes, GetWishes, GetFavourites, GetRating, GetTempPicture, GetCategory, GetUnit, GetStoreId, GetPoints, GetPriceAfterDiscount, GetSyncThirdPartyId, GetDarkOffer, CombineNameAndBarcode, availability, minRating, hasDiscount, minDiscountPercentage, ItemQuantityStatus, RejectionNote, Deliveryability, Availability, SyncThirdPartyIds, SyncThirdPartyId, IsMultiMenuStore, UseApprovalSystem, CurrentSortField, CurrentSortOrder, Code, barcode, IsFeatured, IsActive, ApprovedStatus, HavePicture, HaveDescription, HaveColor, HaveOffer, HaveItemCollectionOffer, IsDeleted, CheckQuantityBeforeSale, CreatedAt, UpdatedAt, CreatedBy, UpdatedBy, }?: {
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
    });
    /**
     * Create a copy of the filter with updated parameters
     */
    copyWith(updates: Partial<ItemsFilterParameters>): ItemsFilterParameters;
    /**
     * Convert filter parameters to URL search parameters
     */
    toURLSearchParams(): URLSearchParams;
    /**
     * Convert to a plain object map
     */
    toMap(): Record<string, any>;
    /**
     * Create filter from URL search parameters
     */
    static fromURLSearchParams(params: URLSearchParams): ItemsFilterParameters;
}

export { AgeGroup as A, Gender as G, ItemsFilterParameters as I, NewArrivalPeriod as N, PagingParameters as P, SortType as S };
