/**
 * Sort types available for product filtering
 * Based on the API documentation
 */
export declare enum SortType {
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
export declare enum Gender {
    Male = 1,
    Female = 2,
    Unisex = 3
}
/**
 * Age group filter options
 */
export declare enum AgeGroup {
    Baby = 1,
    Kids = 2,
    Teens = 3,
    Adults = 4,
    Seniors = 5
}
/**
 * New arrival time periods
 */
export declare enum NewArrivalPeriod {
    Last_7_Days = "Last_7_Days",
    Last_30_Days = "Last_30_Days",
    Last_90_Days = "Last_90_Days"
}
/**
 * Paging and basic sorting configuration
 */
export declare class PagingParameters {
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
export declare class ItemsFilterParameters {
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
    getBrand: boolean;
    getColors: boolean;
    getColorsDefaultPictures: boolean | null;
    getOffer: boolean;
    getSize: boolean;
    getCollections: boolean;
    branchId: number | null;
    availability: boolean | null;
    minRating: number | null;
    hasDiscount: boolean | null;
    minDiscountPercentage: number | null;
    constructor({ pagingParameters, sortType, menuId, categoryId, minPrice, maxPrice, name, gender, age, sourceId, offerId, newArrival, getBrand, getColors, getColorsDefaultPictures, getOffer, getSize, getCollections, branchId, availability, minRating, hasDiscount, minDiscountPercentage }?: {
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
