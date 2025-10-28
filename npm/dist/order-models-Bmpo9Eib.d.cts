/**
 * Order filter models and API integration
 * Based on the Orders/Paging API endpoint
 */
/**
 * Order type classification
 */
declare enum OrderType {
    UnderAcceptance = 1,
    Conformed = 2,
    UnderPreparing = 3,
    Delivering = 4,
    Prepared = 5,
    Delivered = 6,
    Rejected = 7,
    Canceled = 8,
    Unknown = 9
}
declare enum PayType {
    None = 0,
    CashOnDelivery = 1,
    CashOnStore = 2,
    CashOnline = 3
}
/**
 * Delivery method types
 */
declare enum DeliveryType {
    None = 0,
    StorePickup = 1,
    HomeDelivery = 2
}
/**
 * Sign/comparison operators for filtering
 */
declare enum Sign {
    Equal = 0,
    NotEqual = 1,
    GreaterThan = 2,
    LessThan = 3,
    GreaterThanOrEqual = 4,
    LessThanOrEqual = 5
}
/**
 * Paging and sorting configuration for orders
 */
declare class OrderPagingParameters {
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
 * Comprehensive order filtering parameters
 */
declare class OrdersFilterParameters {
    pagingParameters: OrderPagingParameters;
    storeId: number | null;
    menuId: number | null;
    dateFrom: string | null;
    dateTo: string | null;
    startTime: string | null;
    endTime: string | null;
    orderStatusId: number | null;
    orderStatusIds: number[] | null;
    isCanceled: boolean | null;
    isConfirmed: boolean | null;
    isRejected: boolean | null;
    isPrint: boolean | null;
    number: number | null;
    referenceId: string | null;
    referenceDeliveryId: string | null;
    locationId: number | null;
    countryId: number | null;
    cityId: number | null;
    districtId: number | null;
    buildingId: number | null;
    apartmentId: number | null;
    orderType: OrderType | null;
    payType: PayType | null;
    deliveryType: DeliveryType | null;
    username: string | null;
    customerId: string | null;
    delegateId: string | null;
    delegateWithCustomerId: string | null;
    statusChangedBy: string | null;
    viewInMainCurrency: boolean | null;
    totalAmount: number | null;
    sign: Sign | null;
    couponOfferId: string | null;
    applicationId: string | null;
    constructor({ pagingParameters, storeId, menuId, dateFrom, dateTo, startTime, endTime, orderStatusId, orderStatusIds, isCanceled, isConfirmed, isRejected, isPrint, number, referenceId, referenceDeliveryId, locationId, countryId, cityId, districtId, buildingId, apartmentId, orderType, payType, deliveryType, username, customerId, delegateId, delegateWithCustomerId, statusChangedBy, viewInMainCurrency, totalAmount, sign, couponOfferId, applicationId, }?: {
        pagingParameters?: OrderPagingParameters;
        storeId?: number | null;
        menuId?: number | null;
        dateFrom?: string | null;
        dateTo?: string | null;
        startTime?: string | null;
        endTime?: string | null;
        orderStatusId?: number | null;
        orderStatusIds?: number[] | null;
        isCanceled?: boolean | null;
        isConfirmed?: boolean | null;
        isRejected?: boolean | null;
        isPrint?: boolean | null;
        number?: number | null;
        referenceId?: string | null;
        referenceDeliveryId?: string | null;
        locationId?: number | null;
        countryId?: number | null;
        cityId?: number | null;
        districtId?: number | null;
        buildingId?: number | null;
        apartmentId?: number | null;
        orderType?: OrderType | null;
        payType?: PayType | null;
        deliveryType?: DeliveryType | null;
        username?: string | null;
        customerId?: string | null;
        delegateId?: string | null;
        delegateWithCustomerId?: string | null;
        statusChangedBy?: string | null;
        viewInMainCurrency?: boolean | null;
        totalAmount?: number | null;
        sign?: Sign | null;
        couponOfferId?: string | null;
        applicationId?: string | null;
    });
    /**
     * Create a copy with updated parameters
     */
    copyWith(updates: Partial<OrdersFilterParameters>): OrdersFilterParameters;
    /**
     * Convert to URL search parameters
     */
    toURLSearchParams(): URLSearchParams;
    /**
     * Convert to plain object map
     */
    toMap(): Record<string, any>;
    /**
     * Create filter from URL search parameters
     */
    static fromURLSearchParams(params: URLSearchParams): OrdersFilterParameters;
}
interface Order {
    id: string;
    number: number;
    storeId: number;
    customerId: string;
    totalAmount: number;
    orderType: OrderType;
    payType: PayType;
    deliveryType: DeliveryType;
    orderStatusId: number;
    dateCreated: string;
}

export { DeliveryType as D, type Order as O, PayType as P, Sign as S, OrdersFilterParameters as a, OrderType as b, OrderPagingParameters as c };
