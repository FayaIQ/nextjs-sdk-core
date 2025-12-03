export { g as getStoreInfo } from './storeInfo-P_uWqRYc.cjs';
export { a as getProductInfo, g as getProducts } from './getProductInfo-DqdckrpB.cjs';
export { g as getMenus } from './getMenus-DneqpZEa.cjs';
export { g as getOrders } from './getOrders-CBVmsvgl.cjs';
export { g as getBrands } from './getBrands-CWOuMjIS.cjs';
export { A as Address, C as Category, b as City, c as ColorType, a as Country, D as District, P as Product, S as SizeType, d as StoreType, U as UnitInfo } from './types-BlK7R_r9.cjs';
export { A as AgeGroup, G as Gender, I as ItemsFilterParameters, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from './filter-models-B4kRw7Xr.cjs';
export { C as CurrentPhase, D as DeleveryType, h as Order, b as OrderAddress, f as OrderClient, e as OrderCustomer, i as OrderDetail, g as OrderItem, d as OrderPagingParameters, c as OrderType, a as OrdersApiResponse, O as OrdersFilterParameters, P as PayType, k as PostOrderAddressRequest, j as PostOrderItemRequest, l as PostOrderRequest, S as Sign } from './order-models-Dqv0Jc_o.cjs';
export { a as apiFetch } from './index-BRffoVUg.cjs';
export { StartPhoneSignInResult, WhatsAppOTPOptions, getFirebaseApp, getFirebaseIdToken, getPrimaryApp, getSecondaryApp, signOutFirebase, startAuthStateSync, startPhoneSignIn } from './firebase/index.cjs';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import 'firebase/app';

declare class Api {
    private static LOCAL_BASE;
    private static IDENTITY_BASE;
    private static NEWS_BASE;
    private static STORES_BASE;
    private static GPS_BASE;
    private static THEME_BASE;
    private static INVENTORY_BASE;
    private static CRM_BASE;
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
    static getStores: string;
    static getProducts: string;
    static getItemsPaging: string;
    static getProductInfo(id: string): string;
    static getProductInfoV2(id: string): string;
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
    static postOffersDeliveryZones(offerId: string | number): string;
    static getOffersGroups(offerId: string | number): string;
    static putOffersGroup(offerId: string | number, id: string | number): string;
    static deleteOffersGroup(offerId: string | number, id: string | number): string;
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
    static getClientsPaging: string;
    static getClients: string;
    static postClients: string;
    static postOrders: string;
    static putOrderPayment(orderId: string | number): string;
    static putOrderPaymentStatus(orderId: string | number): string;
    static getStoreInfo: string;
    static getCities: string;
    static getDeliveryZones: string;
    static getReportsCustomerOrders: string;
    static getReportsOrderSales: string;
    static getStorePayments(storeId: string | number): string;
    static getPayment(id: string | number): string;
    static putPayment(id: string | number): string;
    static deletePayment(id: string | number): string;
    static postPayments: string;
    static getPayments: string;
    static getPaymentsReport: string;
    static getSlideShows: string;
    static getItemById(id: string | number): string;
    static postWish(id: string | number): string;
    static deleteWish(id: string | number): string;
    static getCategoryProducts(id: string): string;
    static getOrder(id: string): string;
    static getAddress(id: string | number): string;
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
    static deleteItem(id: string | number): string;
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
    thirdPartyToken?: string;
    language?: number;
    gmt?: number;
}

type TokenResponse = {
    access_token: string;
    token_type?: string;
    expires_in?: number;
    [key: string]: unknown;
};
declare function getToken(): Promise<string>;

/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 */

/**
 * Cookie names used by the SDK
 */
declare const COOKIE_NAMES: {
    /** Encrypted backend access token (httpOnly) */
    readonly CRF: "crf";
    /** User authentication flag */
    readonly IS_USER: "isUser";
    /** Legacy: third-party token (for migration) */
    readonly TP_ID: "tp_id";
    /** Legacy: access token (for migration) */
    readonly ACCESS_TOKEN: "access_token";
};
/**
 * Default cookie options for secure httpOnly cookies
 */
declare const SECURE_COOKIE_OPTIONS: Partial<ResponseCookie>;
/**
 * Set an encrypted cookie value.
 * Server-side only.
 */
declare function setEncryptedCookie(cookieStore: any, name: string, value: string, options?: Partial<ResponseCookie>): void;
/**
 * Get and decrypt a cookie value.
 * Server-side only.
 * Returns null if cookie doesn't exist or decryption fails.
 */
declare function getEncryptedCookie(cookieStore: any, name: string): string | null;
/**
 * Set a plain (non-encrypted) cookie.
 * Use for non-sensitive flags like isUser.
 */
declare function setPlainCookie(cookieStore: any, name: string, value: string, options?: Partial<ResponseCookie>): void;
/**
 * Delete a cookie by name.
 */
declare function deleteCookie(cookieStore: any, name: string): void;

/**
 * AES-256-GCM encryption utilities for secure cookie storage.
 * Server-side only - uses Node.js crypto module.
 *
 * Requires env var: COOKIE_CRYPTO_KEY (base64-encoded 32 bytes)
 *
 * Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
 */
/**
 * Encrypt a string using AES-256-GCM.
 * Returns base64-encoded string: iv:authTag:ciphertext
 */
declare function encrypt(plaintext: string): string;
/**
 * Decrypt a string encrypted with encrypt().
 * Expects base64-encoded string: iv:authTag:ciphertext
 */
declare function decrypt(encryptedData: string): string;
/**
 * Validate that encryption key is configured correctly.
 * Throws if key is missing or invalid.
 */
declare function validateEncryptionKey(): void;

export { Api, type AuthConfig, COOKIE_NAMES, SECURE_COOKIE_OPTIONS, type TokenResponse, decrypt, deleteCookie, encrypt, getEncryptedCookie, getToken, setEncryptedCookie, setPlainCookie, validateEncryptionKey };
