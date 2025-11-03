export { g as getStoreInfo } from './storeInfo-DjUhUpxm.cjs';
export { a as getProductInfo, g as getProducts } from './getProductInfo-CYdJPSnS.cjs';
export { g as getMenus } from './getMenus-jUDQWR__.cjs';
export { g as getOrders } from './getOrders-DRGRR3-D.cjs';
export { A as Address, C as Category, b as City, a as Country, D as District, S as StoreType } from './types-D0Xbpetb.cjs';
export { A as AgeGroup, G as Gender, I as ItemsFilterParameters, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from './filter-models-BrX8v95o.cjs';
export { C as CurrentPhase, D as DeleveryType, h as Order, d as OrderAddress, f as OrderClient, e as OrderCustomer, i as OrderDetail, g as OrderItem, c as OrderPagingParameters, b as OrderType, a as OrdersApiResponse, O as OrdersFilterParameters, P as PayType, S as Sign } from './order-models-DdD4MxCq.cjs';
export { a as apiFetch } from './index-LWUFWO9Q.cjs';

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
declare function getSlides(): Promise<any>;

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
    static getItemsPaging: string;
    static getProductInfo(id: string): string;
    static getMenus: string;
    static getMenusDropdown: string;
    static getMenuById(id: string | number): string;
    static getOffersPaging: string;
    static getOfferById(id: string | number): string;
    static deleteOffer(id: string | number): string;
    static getOffersCustomerItemLoggedIn: string;
    static getStoreInvoiceDiscount(storeId: string | number, coupon: string): string;
    static getDeliveryZoneDiscount(deliveryZoneId: string | number): string;
    static getOffersItemsDropdown: string;
    static getOffersSlideShowsDropdown: string;
    static getOffersItemsStores: string;
    static getOffersPointsDropdown: string;
    static getOffersNewsDropdown: string;
    static getOffersCouponsDropdown: string;
    static postOffersItemsDiscount: string;
    static postOffersAddItemsByFilter(offerId: string | number, forceUpdate: boolean | string): string;
    static postOffersItemsDiscountCustomers: string;
    static postOffersExtraItemDiscount: string;
    static postOffersCustomerDiscount: string;
    static postOffersInvoiceDiscount: string;
    static postOffersMultiCouponDiscount: string;
    static postOffersShippingDiscount: string;
    static postOffersPointDiscount: string;
    static postOffersItemCollectionDiscount: string;
    static postOffersDarkDiscount: string;
    static putOffersCustomerDiscount(id: string | number): string;
    static putOffersExtraItemDiscount(id: string | number): string;
    static putOffersInvoiceDiscount(id: string | number): string;
    static putOffersItemsDiscount(id: string | number): string;
    static putOffersItemsDiscountCustomers(id: string | number): string;
    static putOffersShippingDiscount(id: string | number): string;
    static putOffersPointDiscount(id: string | number): string;
    static putOffersItemCollectionDiscount(id: string | number): string;
    static putOffersMultiCouponDiscount(id: string | number): string;
    static putOffersDarkDiscount(id: string | number): string;
    static getOffersCustomers: string;
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
    static getItemById(id: string | number): string;
    static postWish(id: string | number): string;
    static deleteWish(id: string | number): string;
    static getCategoryProducts(id: string): string;
    static getOrder(id: string): string;
    static getOrderItem(orderId: string | number, itemId: string | number): string;
    static postOrderItem(orderId: string | number): string;
    static putOrderItemCancel(orderId: string | number, itemId: string | number): string;
    static putOrderItemUndoCancel(orderId: string | number, itemId: string | number): string;
    static putOrderItemUpdate(orderId: string | number, itemId: string | number): string;
    static getOrderFullInfo: string;
    static putOrderApprove(id: string | number): string;
    static putOrderApproveList: string;
    static putOrderDisapprove(id: string | number): string;
    static putOrderDisapproveList: string;
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
    static getCatigories: string;
    static getApplicationsStores: string;
    static getCustomersDropdown: string;
    static getItemsSource: string;
    static getCountries: string;
    static getParentProducts: string;
    static postCopyParentStore: string;
    static putItemActivate(id: string | number): string;
    static putItemDeactivate(id: string | number): string;
    static putItem(id: string | number): string;
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

export { Api, type AuthConfig, type TokenResponse, getSlides, getToken };
