import { NextRequest, NextResponse } from 'next/server';

interface OfferPostRequest {
    offerType: number;
    name: string;
    start: string;
    end: string;
    countLimit?: number;
    description?: string;
    discountValue: number;
    discountType?: number;
    maxDiscountFlatPrice: number;
    isPointsRewardsAllowed?: boolean;
    isSpecific?: boolean;
    isActive?: boolean;
    unitLevel?: number;
}
interface postCustomerRequest extends OfferPostRequest {
    minimumCartValue?: number;
}
interface postOffersInvoiceDiscountRequest extends OfferPostRequest {
    minimumCartValue?: number;
    couponCode?: string;
    useCouponMultipleTimesBySameUserCount?: number;
}
interface OffersFilters {
    Name?: string | null;
    Start?: Date | null;
    End?: Date | null;
    DiscountType?: number | null;
    IsActive?: boolean | null;
    HasCouponCode?: boolean | null;
    OfferFilterType?: number | null;
    ItemId?: number | null;
    Barcode?: string | null;
}
interface Offer {
    id: string;
    name: string;
    description: string | null;
    start: Date;
    end: Date;
    offerType: number;
    countLimit: number;
    discountValue: number;
    discountType: number | null;
    minimumCartValue: number | null;
    minimumItemsQuntity: number | null;
    maxDiscountFlatPrice: number | null;
    couponCode: string | null;
    useCouponMultipleTimesBySameUserCount: number | null;
    canApplyRewardMultipleTimes: boolean | null;
    isPointsRewardsAllowed: boolean | null;
    pointOfferUserType: string | null;
    unitLevel: number | null;
    numberOfPaidItems: number | null;
}
interface OffersPagingResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string;
    currentSortField: string;
    currentSortOrder: string;
    nextSortOrder: string;
    results: Offer[];
}

/**
 * Fetch paginated offers
 */
declare function getOffersPaging(query?: Record<string, any>): Promise<OffersPagingResponse>;

declare function getOfferById(id: string | number): Promise<any>;

declare function deleteOffer(id: string | number): Promise<any>;

declare function getInvoiceDiscount(coupon: string): Promise<any>;

declare function getOffersItemsDropdown(): Promise<any>;

declare function getOffersCouponsDropdown(): Promise<any>;

declare function postOffersItemsDiscount(payload: OfferPostRequest): Promise<any>;

declare function putOffersItemsDiscount(id: string | number, payload: any): Promise<any>;

declare function getOffersCustomers(): Promise<any>;

declare function postOffersCustomerDiscount(payload: any): Promise<any>;

declare function postOffersInvoiceDiscount(payload: postOffersInvoiceDiscountRequest): Promise<string>;

declare function postOffersShippingDiscount(payload: any): Promise<any>;

declare function postOffersAddItemsByFilter(offerId: string | number, forceUpdate: boolean, payload: {
    menuId: number;
    brandId: number;
    itemAge: number;
    itemGender: number;
    minPriceRange: number;
    maxPriceRange: number;
    forceUpdate?: boolean;
}): Promise<any>;

/**
 * Fetches a list of products with optional filtering and pagination
 * Works in both server and client components
 *
 * @param filterParams - Filter parameters for products (pagination, sorting, etc.)
 * @returns Promise with product data
 *
 * @example
 * // Server component
 * const products = await getProducts({
 *   filterParams: new ItemsFilterParameters({ currentPage: 1, pageSize: 20 })
 * });
 *
 * @example
 * // Client component
 * const products = await getProducts({
 *   filterParams: new ItemsFilterParameters({ sortType: SortType.Newest })
 * });
 */
declare function getCoupons(): Promise<any>;

declare function postOffersDeliveryZones(offerId: string | number, payload: any): Promise<any>;

declare function getOffersGroups(offerId: string | number): Promise<any>;

declare function putOffersGroup(offerId: string | number, id: string | number, payload: any): Promise<any>;

declare function deleteOffersGroup(offerId: string | number, id: string | number): Promise<any>;

declare function putOffersCustomerDiscount(id: string | number, payload: any): Promise<any>;

declare function putOffersExtraItemDiscount(id: string | number, payload: any): Promise<any>;

declare function putOffersInvoiceDiscount(id: string | number, payload: any): Promise<any>;

declare function putOffersItemsDiscountCustomers(id: string | number, payload: any): Promise<any>;

declare function putOffersShippingDiscount(id: string | number, payload: any): Promise<any>;

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

declare function GET$7(request: NextRequest): Promise<NextResponse<any>>;

/**
 * Ready-to-use API route handler for coupons
 * Users can simply re-export this in their app/api/getCoupons/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/coupons';
 */
declare function GET$6(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$5(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function DELETE$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

declare function GET$4(request: NextRequest, { params }: {
    params: Promise<{
        coupon: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET$3(): Promise<NextResponse<any>>;

declare function GET$2(): Promise<NextResponse<any>>;

declare function POST$5(request: NextRequest): Promise<NextResponse<any>>;

declare function PUT$6(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET$1(): Promise<NextResponse<any>>;

declare function POST$4(request: NextRequest): Promise<NextResponse<any>>;

declare function POST$3(request: NextRequest): Promise<NextResponse<any>>;

declare function POST$2(request: NextRequest): Promise<NextResponse<any>>;

declare function POST$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        forceUpdate: string;
    }>;
}): Promise<NextResponse<any>>;

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

declare function PUT$5(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        offerGroupId: string;
    }>;
}): Promise<NextResponse<any>>;

declare function DELETE(_request: Request, { params }: {
    params: Promise<{
        id: string;
        offerGroupId: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$4(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$3(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { DELETE$1 as DeleteOfferDELETE, DELETE as DeleteOffersGroupDELETE, GET$6 as GetCouponsGET, GET$4 as GetInvoiceDiscountGET, GET$5 as GetOfferByIdGET, GET$2 as GetOffersCouponsDropdownGET, GET$1 as GetOffersCustomersGET, GET as GetOffersGroupsGET, GET$3 as GetOffersItemsDropdownGET, GET$7 as GetOffersPagingGET, type Offer, OfferPagingParameters, type OfferPostRequest, OffersFilterParameters, type OffersFilters, type OffersPagingResponse, POST$1 as PostOffersAddItemsByFilterPOST, POST$4 as PostOffersCustomerDiscountPOST, POST as PostOffersDeliveryZonesPOST, POST$3 as PostOffersInvoiceDiscountPOST, POST$5 as PostOffersItemsDiscountPOST, POST$2 as PostOffersShippingDiscountPOST, PUT$4 as PutOffersCustomerDiscountPUT, PUT$3 as PutOffersExtraItemDiscountPUT, PUT$5 as PutOffersGroupPUT, PUT$2 as PutOffersInvoiceDiscountPUT, PUT$1 as PutOffersItemsDiscountCustomersPUT, PUT$6 as PutOffersItemsDiscountPUT, PUT as PutOffersShippingDiscountPUT, deleteOffer, deleteOffersGroup, getCoupons, getInvoiceDiscount, getOfferById, getOffersCouponsDropdown, getOffersCustomers, getOffersGroups, getOffersItemsDropdown, getOffersPaging, offerTypes, type postCustomerRequest, postOffersAddItemsByFilter, postOffersCustomerDiscount, postOffersDeliveryZones, postOffersInvoiceDiscount, type postOffersInvoiceDiscountRequest, postOffersItemsDiscount, postOffersShippingDiscount, putOffersCustomerDiscount, putOffersExtraItemDiscount, putOffersGroup, putOffersInvoiceDiscount, putOffersItemsDiscount, putOffersItemsDiscountCustomers, putOffersShippingDiscount };
