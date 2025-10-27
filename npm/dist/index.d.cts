<<<<<<< HEAD
import { S as StoreInfo, P as Product } from './types-DPi3zGBH.cjs';
export { A as Address, a as City, C as Country, D as District, b as StoreType, U as UnitInfo } from './types-DPi3zGBH.cjs';
export { C as CurrentPhase, D as DeliveryType, h as Order, c as OrderAddress, f as OrderClient, e as OrderCustomer, g as OrderItem, a as OrderPagingParameters, O as OrderType, d as OrdersApiResponse, b as OrdersFilterParameters, P as PayType, S as Sign } from './order-models-DRKf1XSv.cjs';
export { a as apiFetch } from './index-LWUFWO9Q.cjs';
=======
import { S as StoreInfo, P as Product } from './types-BKRI70Wb.cjs';
export { A as Address, b as Category, a as City, C as Country, D as District, c as StoreType, U as UnitInfo } from './types-BKRI70Wb.cjs';
>>>>>>> d56b8824389fb1d3e3d7cbe822fb92c1a6d7e254

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
    static getProductInfo(id: string): string;
    static getMenus: string;
    static getBranches: string;
    static getBrands: string;
    static getWishes: string;
    static getOrders: string;
    static postOrders: string;
    static getStoreInfo: string;
    static getCities: string;
    static getDeliveryZones: string;
    static getSlideShows: string;
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
    static putOrderDiscount(id: string | number): string;
    static putOrderReferenceId(id: string | number): string;
    static putOrderReferenceDeliveryId(id: string | number): string;
    static cancelOrder(id: string | number): string;
    static getOrdersDelagates(id: string | number): string;
    static postOrdersDelagates(id: string | number): string;
    static putOrdersDelagatesLoggedIn(id: string | number): string;
    static postOrderDelagatesList: string;
    static deleteDelagate(orderId: string | number, delegateId: string | number): string;
    static getInvoiceDiscount(code: string): string;
    static getCheckoutQuote: string;
    static getCurrentCart: string;
    static postCartItems: string;
    static patchCartItem(id: string | number): string;
    static deleteCartItem(id: string | number): string;
}

interface AuthConfig {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    language?: number;
    gmt?: number;
}

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

export { AgeGroup, Api, type AuthConfig, Gender, ItemsFilterParameters, NewArrivalPeriod, PagingParameters, Product, SortType, StoreInfo, type TokenResponse, getProductInfo, getProducts, getStoreInfo, getToken };
