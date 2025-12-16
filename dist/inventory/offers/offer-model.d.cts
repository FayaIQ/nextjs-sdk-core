declare enum offerTypes {
    ItemsDiscount = 0,
    InvoiceDiscount = 1,
    ExtraItemDiscount = 2,
    ShippingDiscount = 3,
    CustomerDiscount = 4,
    CustomerItemsDiscount = 5
}
/**
 * Paging parameters for offers listing
 */
declare class OfferPagingParameters {
    currentPage: number;
    pageSize: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    constructor({ currentPage, pageSize, sortField, currentSortField, currentSortOrder, }?: {
        currentPage?: number;
        pageSize?: number;
        sortField?: string | null;
        currentSortField?: string | null;
        currentSortOrder?: string | null;
    });
    toURLParams(): Record<string, string>;
}
/**
 * Offers filter parameters matching the API query shape.
 * Supported query params:
 * - Name (string)
 * - Start (date-time string)
 * - End (date-time string)
 * - DiscountType (0,1,2)
 * - IsActive (boolean)
 * - HasCouponCode (boolean)
 * - OfferFilterType (integer)
 * - ItemId (integer)
 * - Barcode (string)
 * + paging/sorting fields: CurrentPage, PageSize, SortField, CurrentSortField, CurrentSortOrder
 */
declare class OffersFilterParameters {
    pagingParameters: OfferPagingParameters;
    Name: string | null;
    Start: string | null;
    End: string | null;
    DiscountType: number | null;
    IsActive: boolean | null;
    HasCouponCode: boolean | null;
    OfferFilterType: number | null;
    ItemId: number | null;
    Barcode: string | null;
    constructor({ pagingParameters, Name, Start, End, DiscountType, IsActive, HasCouponCode, OfferFilterType, ItemId, Barcode, }?: {
        pagingParameters?: OfferPagingParameters;
        Name?: string | null;
        Start?: string | null;
        End?: string | null;
        DiscountType?: number | null;
        IsActive?: boolean | null;
        HasCouponCode?: boolean | null;
        OfferFilterType?: number | null;
        ItemId?: number | null;
        Barcode?: string | null;
    });
    toURLSearchParams(): URLSearchParams;
    toMap(): Record<string, any>;
    static fromURLSearchParams(params: URLSearchParams): OffersFilterParameters;
}

export { OfferPagingParameters, OffersFilterParameters, offerTypes };
