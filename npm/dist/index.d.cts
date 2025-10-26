import { S as StoreInfo, P as Product } from './types-DPi3zGBH.cjs';
export { A as Address, a as City, C as Country, D as District, b as StoreType, U as UnitInfo } from './types-DPi3zGBH.cjs';

/**
 * Fetches store information
 * Works in both server and client components
 *
 * @returns Promise with store information
 *
 * @example
 * // Server component
 * const storeInfo = await getStoreInfo();
 *
 * @example
 * // Client component
 * const storeInfo = await getStoreInfo();
 */
declare function getStoreInfo(): Promise<StoreInfo>;

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
    constructor({ pagingParameters, sortType, menuId, categoryId, minPrice, maxPrice, name, gender, age, sourceId, offerId, newArrival, getBrand, getColors, getColorsDefaultPictures, getOffer, getSize, getCollections, branchId, availability, minRating, hasDiscount, minDiscountPercentage, }?: {
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
declare function getProducts({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Product>;

/**
 * Fetches detailed information for a specific product by ID
 * Works in both server and client components
 *
 * @param id - The product ID to fetch
 * @returns Promise with product details
 *
 * @example
 * // Server component
 * const product = await getProductInfo("123");
 *
 * @example
 * // Client component
 * const product = await getProductInfo("123");
 */
declare function getProductInfo(id: string): Promise<Product>;

declare class Api {
    private static LOCAL_BASE;
    private static IDENTITY_BASE;
    private static NEWS_BASE;
    private static STORES_BASE;
    private static GPS_BASE;
    private static THEME_BASE;
    private static INVENTORY_BASE;
    static IDENTITY_URL: string;
    static signIn: string;
    static refreshToken: string;
    static sessionLogout: string;
    static clearCart: string;
    static getUserInfo: string;
    static postUserInfo: string;
    static putUserInfo: string;
    static patchUserInfo: string;
    static putUserAvatar: string;
    static putUserPassword: string;
    static getUserPreferences: string;
    static putUserPreferences: string;
    static phoneVerificationSend: string;
    static phoneVerificationVerify: string;
    static getProducts: string;
    static getCategories: string;
    static getBranches: string;
    static getBrands: string;
    static getWishes: string;
    static getOrders: string;
    static postOrders: string;
    static getStoreInfo: string;
    static getCities: string;
    static getDeliveryZones: string;
    static getSlideShows: string;
    static getProductInfo(id: string): string;
    static postWish(id: string | number): string;
    static deleteWish(id: string | number): string;
    static getCategoryProducts(id: string): string;
    static getOrder(id: string): string;
    static getOrderFullInfo: string;
    static putOrderApprove(id: string | number): string;
    static putOrderApproveList(): string;
    static putOrderDisapprove(id: string | number): string;
    static putOrderDisapproveList(): string;
    static putChangeStatusOrder(id: string | number): string;
    static cancelOrder(id: string | number): string;
    static getOrdersDelagates(id: string | number): string;
    static postOrdersDelagates(id: string | number): string;
    static putOrdersDelagatesLoggedIn(id: string | number): string;
    static postOrderDelagatesList: string;
    static deleteDelagate(orderId: string | number, delegateId: string | number): string;
    static putOrderDiscount(id: string | number): string;
    static putOrderReferenceId(id: string | number): string;
    static putOrderReferenceDeliveryId(id: string | number): string;
    static getInvoiceDiscount(code: string): string;
    static getCheckoutQuote: string;
    static getCurrentCart: string;
    static postCartItems: string;
    static patchCartItem(id: string | number): string;
    static deleteCartItem(id: string | number): string;
}

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

interface AuthConfig {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    language?: number;
    gmt?: number;
}

/**
 * Type definitions for API requests
 */
type Primitive = string | number | boolean | null | undefined;
type RequestData = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;
type QueryParams = Record<string, Primitive>;
interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: object;
    data?: RequestData;
    query?: QueryParams;
    token?: string | null;
}
/**
 * Generic API fetch wrapper with authentication and error handling
 * @param url - The API endpoint URL
 * @param options - Request configuration options
 * @returns Promise with typed response data
 */
declare function apiFetch<T>(url: string, options?: ApiRequestOptions): Promise<T>;

type TokenResponse = {
    access_token: string;
    token_type?: string;
    expires_in?: number;
    [key: string]: unknown;
};
/**
 * Retrieves or generates an access token based on the configured mode.
 *
 * Modes:
 * - "auto": automatically logs in if token missing or expired
 * - "strict": throws Unauthorized error if no token exists
 */
declare function getToken(): Promise<string>;

export { AgeGroup, Api, type AuthConfig, DeliveryType, Gender, ItemsFilterParameters, NewArrivalPeriod, type Order, OrderPagingParameters, OrderType, OrdersFilterParameters, PagingParameters, PayType, Product, Sign, SortType, StoreInfo, type TokenResponse, apiFetch, getProductInfo, getProducts, getStoreInfo, getToken };
