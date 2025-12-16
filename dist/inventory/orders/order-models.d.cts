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
declare enum DeleveryType {
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
    DeleveryType: DeleveryType | null;
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
    constructor({ pagingParameters, storeId, menuId, dateFrom, dateTo, startTime, endTime, orderStatusId, orderStatusIds, isCanceled, isConfirmed, isRejected, isPrint, number, referenceId, referenceDeliveryId, locationId, countryId, cityId, districtId, buildingId, apartmentId, orderType, payType, DeleveryType, username, customerId, delegateId, delegateWithCustomerId, statusChangedBy, viewInMainCurrency, totalAmount, sign, couponOfferId, applicationId, }?: {
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
        DeleveryType?: DeleveryType | null;
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
     * FIXED: This is the key method that was causing the issue
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
interface CurrentPhase {
    orderPhaseID: number;
    statusID: number;
    status: string;
    status_en: string;
    time: string;
    username: string;
    note: string | null;
}
interface OrderAddress {
    id: number;
    gps: string;
    distance: number;
    country: {
        id: number;
        name: string;
        name_en: string;
    };
    city: {
        id: number;
        name: string;
        name_en: string;
    };
    district: {
        id: number;
        name: string;
        name_en: string;
    };
    building: string | null;
    appartmentNumber: string | null;
    note: string;
}
interface OrdersApiResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string;
    currentSortField: string;
    currentSortOrder: string;
    nextSortOrder: string;
    results: Order[];
}
interface OrderCustomer {
    id: string;
    username: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    gender: number;
    birthdate: string;
    address: OrderAddress;
}
interface OrderClient {
    id: string;
    name: string;
    storeId: number;
    locationId: number;
    address: string | null;
    addressId: number;
    email: string;
    phoneCode: string | null;
    phoneNumber: string;
    createdBy: string | null;
    isApproved: boolean;
    isAddedByAdmin: boolean;
    isPublic: boolean;
    clientTypeId: string;
    clientType: unknown | null;
    classId: string;
    class: unknown | null;
}
interface OrderItem {
    orderItemID: number;
    itemID: number;
    price: number;
    total: number;
    quantity: number;
    discountType?: number;
    payType: number;
    offerDesc?: string;
    isCanceled: boolean;
    note?: string | null;
    itemInfo: {
        name: string;
        nameSecondary: string | null;
        iconPath: string;
        picturePath: string;
        barcode: string;
        code: string | null;
    };
    collectionInfo?: {
        color?: {
            code: string;
            colorName: string;
            secondaryColorName?: string;
            picturePath?: string;
            iconPath?: string;
            isDefault?: boolean | null;
            syncThirdPartyId?: string | null;
        };
        size?: {
            val1: string;
        };
    };
}
interface Order {
    orderID: number;
    orderNo: number;
    orderDate: string;
    total: number;
    orderType: number;
    payType: number;
    deleveryType: number;
    deliveryPrice: number;
    orderDeleveryDate: string | null;
    orderPhaseID: number;
    coupanCode?: string | undefined;
    storeId: string | null;
    storeName?: string | null;
    discountType?: number | null;
    discountValue?: string | number;
    totalAmount: number;
    referenceId?: string | null;
    latestOrderStatus: number;
    currentPhase: CurrentPhase;
    currencyExchangeRateHistory?: null;
    isRejected?: boolean;
    rejectionNote?: string | null;
    laserNote?: string | null;
    giftNote?: string | null;
    customer?: OrderCustomer;
    client?: OrderClient | null;
    address?: OrderAddress;
    orderItems?: OrderItem[];
    orderPhases?: CurrentPhase[];
    paymentStatus?: string;
    couponOffer?: {
        name: string;
        couponCode: string;
        discountType: number;
        discountValue: number;
    };
}
interface OrderDetail {
    orderID: number;
    orderDate: string;
    orderDeleveryDate: string | null;
    orderNo: number;
    total: number;
    deliveryPrice: number;
    totalAmount: number;
    orderType: number;
    payType: number;
    deleveryType: number;
    orderPhaseID: number;
    storeId: string | null;
    latestOrderStatus: number;
    currentPhase: CurrentPhase;
    discountType?: number | null;
    discountValue?: string | number | undefined;
    isRejected?: boolean;
    rejectionNote?: string | null;
    laserNote?: string | null;
    giftNote?: string | null;
    customer?: OrderCustomer;
    client?: OrderClient | null;
    address?: OrderAddress;
    orderItems?: OrderItem[];
    orderPhases: CurrentPhase[];
    referenceId?: string | null;
    referenceDeliveryId?: string | null;
    gatewayType?: number;
    paymentStatus?: string;
    couponOffer?: {
        name?: string;
        couponCode?: string;
        discountType?: number;
        discountValue?: number;
    };
}
interface PostOrderItemRequest {
    itemId: number;
    quantity: number;
    freeQuantity?: number;
    discount?: number;
    colorId?: number | null;
    sizeId?: number | null;
    unitLevel?: number;
    note?: string | null;
    costPrice?: number | null;
    price?: number | null;
    pricePack1?: number | null;
    pricePack2?: number | null;
}
interface PostOrderAddressRequest {
    gps?: string | null;
    districtId?: number | null;
    note?: string | null;
    appartmentId?: number | null;
}
interface PostOrderRequest {
    storeId?: number;
    address?: PostOrderAddressRequest | null;
    orderType?: number;
    payType?: number;
    gatewayType?: number;
    deleveryType?: number;
    orderDeleveryDate?: string | null;
    note?: string | null;
    currencyId?: number;
    couponCode?: string | null;
    laserNote?: string | null;
    giftNote?: string | null;
    clientId?: string | null;
    paymentTokenId?: string | null;
    points?: number;
    applyDarkOffer?: boolean;
    orderItems?: PostOrderItemRequest[];
}

export { type CurrentPhase, DeleveryType, type Order, type OrderAddress, type OrderClient, type OrderCustomer, type OrderDetail, type OrderItem, OrderPagingParameters, OrderType, type OrdersApiResponse, OrdersFilterParameters, PayType, type PostOrderAddressRequest, type PostOrderItemRequest, type PostOrderRequest, Sign };
