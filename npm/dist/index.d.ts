export {
  D as DeliveryType,
  d as Order,
  b as OrderPagingParameters,
  a as OrderType,
  c as OrdersFilterParameters,
  P as PayType,
  S as Sign,
  g as getOrders,
} from "./getOrders-DqBDyqNN.js";
export { a as apiFetch } from "./index-LWUFWO9Q.js";

interface Country {
  id: number;
  name: string;
  name_en: string;
}
interface City {
  id: number;
  name: string;
  name_en: string;
}
interface District {
  id: number;
  name: string;
  name_en: string;
}
interface Address {
  id: number;
  gps: string | null;
  distance: number;
  country: Country;
  city: City;
  district: District;
  building: string | null;
  appartmentNumber: string | null;
  note: string | null;
}
interface UnitInfo {
  type: number;
  name: string;
  value: number;
  isActive: boolean;
}
interface Product {
  id: number;
  barcode: string;
  code: string | null;
  price: number;
  name: string;
  subDescription: string | null;
  description: string | null;
  nameSecondary: string | null;
  subDescriptionSecondary: string | null;
  descriptionSecondary: string | null;
  currencyId: number;
  menu: object | null;
  brand: object | null;
  sizeSet: unknown | null;
  unitInfo: UnitInfo;
  packs: unknown | null;
  age: number | null;
  gender: number | null;
  tempPicturePath: string | null;
  picturePath: string | null;
  iconPath: string | null;
  isDeliverable: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isApproved: boolean | null;
  preparation: number;
  calories: number;
  views: number;
  likes: number;
  isLiked: boolean;
  wishes: number;
  isWished: boolean;
  favourites: number;
  isFavourite: boolean;
  rating: number;
  rejectionNote: string | null;
  offer: unknown | null;
  customerItemOffer: unknown | null;
  pointOffer: unknown | null;
  collectionItemOffer: unknown | null;
  darkItemOffer: unknown | null;
  multipleMenus: unknown | null;
  colors: unknown | null;
  generalPictures: unknown | null;
  collections: unknown | null;
  hasColors: boolean;
  hasSizes: boolean;
  createDate: string;
  publishDate: string;
  checkQuantitiesBeforeSale: boolean;
  sizePatternId: number | null;
  isLocked: boolean;
  isActive: boolean;
  minimumOrderQuantity: number | null;
  maximumOrderQuantity: number | null;
  isDeleted: boolean;
  storeId: number;
  totalQuantity: number;
  videoURL: string | null;
  currentOfferId: number | null;
  pointOfferId: number | null;
  createdBy: string | null;
  updatedBy: string | null;
}
interface Category {
  subCategories: Category[];
  id: number;
  parentID: number | null;
  name: string;
  nameSecondary: string;
  iconUrl: string | null;
  imageUrl: string | null;
  emoji: string | null;
  orderIndex: number;
}
interface StoreType {
  id: string;
  name: string;
  isActive: boolean;
}
interface StoreInfo {
  id: number;
  name: string;
  code: string;
  subDescription: string | null;
  description: string;
  nameSecondary: string | null;
  subDescriptionSecondary: string | null;
  descriptionSecondary: string | null;
  typeID: string;
  gps: string | null;
  address: Address;
  freeNumber: string | null;
  phoneNumber1: string | null;
  phoneNumber2: string | null;
  phoneNumber3: string | null;
  website: string | null;
  email: string | null;
  parentId: number | null;
  originalLogoPath: string | null;
  originalLogoId: string | null;
  originalPicturePath: string | null;
  originalPictureId: string | null;
  picturePath: string | null;
  isActive: boolean;
  facebookLink: string | null;
  youtubeLink: string | null;
  whatsappLink: string | null;
  instagramLink: string | null;
  snapchatLink: string | null;
  tiktokLink: string | null;
  children: StoreInfo[];
  storeType: StoreType;
  shifts: unknown[];
}

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
  MostViewed = "MostViewed", // For most viewed products
  Name = "Name",
}
/**
 * Gender filter options
 */
declare enum Gender {
  Male = 1,
  Female = 2,
  Unisex = 3,
}
/**
 * Age group filter options
 */
declare enum AgeGroup {
  Baby = 1,
  Kids = 2,
  Teens = 3,
  Adults = 4,
  Seniors = 5,
}
/**
 * New arrival time periods
 */
declare enum NewArrivalPeriod {
  Last_7_Days = "Last_7_Days",
  Last_30_Days = "Last_30_Days",
  Last_90_Days = "Last_90_Days",
}
/**
 * Paging and basic sorting configuration
 */
declare class PagingParameters {
  currentPage: number;
  pageSize: number;
  sortField: string | null;
  constructor({
    currentPage,
    pageSize,
    sortField,
  }?: {
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
  constructor({
    pagingParameters,
    sortType,
    menuId,
    categoryId,
    minPrice,
    maxPrice,
    name,
    gender,
    age,
    sourceId,
    offerId,
    newArrival,
    getBrand,
    getColors,
    getColorsDefaultPictures,
    getOffer,
    getSize,
    getCollections,
    branchId,
    availability,
    minRating,
    hasDiscount,
    minDiscountPercentage,
  }?: {
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

interface ProductResponse {
  currentPage: number;
  currentSortField: null;
  currentSortOrder: null;
  nextSortOrder: null;
  pageCount: number;
  pageSize: number;
  results: Product[];
  rowCount: number;
  sortField: null;
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
declare function getProducts({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<ProductResponse>;

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

declare function getMenus({
  filterParams,
}: {
  filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

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
  static deleteDelagate(
    orderId: string | number,
    delegateId: string | number
  ): string;
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

export {
  type Address,
  AgeGroup,
  Api,
  type AuthConfig,
  type Category,
  type City,
  type Country,
  type District,
  Gender,
  ItemsFilterParameters,
  NewArrivalPeriod,
  PagingParameters,
  type Product,
  SortType,
  type StoreInfo,
  type StoreType,
  type TokenResponse,
  type UnitInfo,
  getMenus,
  getProductInfo,
  getProducts,
  getStoreInfo,
  getToken,
};
