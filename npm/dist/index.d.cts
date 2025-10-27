export { g as getStoreInfo } from './storeInfo-DBhU1q6N.cjs';
export { a as getProductInfo, g as getProducts } from './getProductInfo-GOz8KlkY.cjs';
export { A as Address, C as Category, b as City, a as Country, D as District, P as Product, S as StoreType, U as UnitInfo } from './types-ox64mKWv.cjs';
export { A as AgeGroup, G as Gender, I as ItemsFilterParameters, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from './filter-models-BmjANVuO.cjs';
export { C as CurrentPhase, D as DeleveryType, h as Order, c as OrderAddress, f as OrderClient, e as OrderCustomer, i as OrderDetail, g as OrderItem, a as OrderPagingParameters, O as OrderType, d as OrdersApiResponse, b as OrdersFilterParameters, P as PayType, S as Sign } from './order-models-_98VLduD.cjs';
export { a as apiFetch } from './index-LWUFWO9Q.cjs';

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
    static getCouponOffers: string;
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
    static cancelOrder(id: string | number): string;
    static getOrdersDelagates(id: string | number): string;
    static postOrdersDelagates(id: string | number): string;
    static putOrdersDelagatesLoggedIn(id: string | number): string;
    static postOrderDelagatesList: string;
    static deleteDelagate(orderId: string | number, delegateId: string | number): string;
    static putOrderDiscount(id: string | number): string;
    static putOrderReferenceId(id: string | number): string;
    static putOrderReferenceDeliveryId(id: string | number): string;
    static getApplicationsStores: string;
    static getCountries: string;
    static getLocationChildren(parentId: string | number): string;
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

export { Api, type AuthConfig, type TokenResponse, getToken };
