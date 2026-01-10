import { FirebaseApp } from 'firebase/app';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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
interface ColorType {
    id: number;
    name: string;
    secondaryName?: string;
    code: string;
    index: number;
    defaultImages: {
        iconPath: string;
        picturePath: string;
        mobilePicturePath: string;
    };
    pictures: Array<{
        id: number;
        picturePath: string;
        iconPath: string;
        mobilePicturePath: string;
        isDefault: boolean;
        index: number;
    }>;
}
interface SizeType {
    id: number;
    value1: string;
    value2?: string;
    fullValue: string;
    index: number;
}
interface UnitInfo$1 {
    type: number;
    name: string;
    value: number;
    isActive: boolean;
}
interface Product$1 {
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
    unitInfo: UnitInfo$1;
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
interface StoreType$1 {
    id: string;
    name: string;
    isActive: boolean;
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

interface UnitInfo {
    type: number;
    name: string;
    value: number;
    isActive: boolean;
}
interface SizeValue {
    id: number;
    value1: string | null;
    value2: string | null;
    fullValue: string;
    index: number;
}
interface SizeSet {
    sizeTypeId: number;
    name: string;
    parameter1: string | null;
    parameter2: string | null;
    values: SizeValue[];
}
interface MultipleMenu {
    id: number;
    parentID: number | null;
    name: string;
    nameSecondary: string | null;
    iconUrl: string | null;
    imageUrl: string | null;
    emoji: string | null;
    orderIndex: number;
}
interface CollectionItem {
    id: number;
    itemId: number;
    itemName: string | null;
    barcode: string | null;
    code: string | null;
    price: number;
    colorId: number;
    sizeValueId: number;
    sizeValue: SizeValue;
    isActive: boolean;
    unitLevel: number;
    totalQuantity: number;
    syncThirdPartyId: unknown | null;
    collectionItemOffer: unknown | null;
    darkItemOffer: unknown | null;
}
interface Packs {
    unitLevel2: PackUnit | null;
    unitLevel3: PackUnit | null;
}
interface ItemColor {
    id: number;
    name: string;
    secondaryName?: string | null;
    code: string;
    index?: number;
    defaultImages?: {
        iconPath: string | null;
        picturePath: string | null;
        mobilePicturePath: string | null;
    } | null;
    pictures?: Array<{
        id: number;
        picturePath: string | null;
        iconPath: string | null;
        mobilePicturePath: string | null;
        isDefault: boolean;
        index: number;
    }> | null;
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
    brand: Brand$1 | null;
    sizeSet: SizeSet | null;
    unitInfo: UnitInfo;
    packs: Packs | null;
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
    sourceID: number | null;
    rejectionNote: string | null;
    offer: unknown | null;
    customerItemOffer: unknown | null;
    pointOffer: unknown | null;
    collectionItemOffer: unknown | null;
    darkItemOffer: unknown | null;
    multipleMenus: MultipleMenu[] | null;
    colors: ItemColor[] | null;
    generalPictures: any[] | null;
    collections: CollectionItem[] | null;
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
    defaultPrice: number | null;
    itemID: number | null;
    menuIds: number[] | null;
    menuID: number | null;
}
interface Brand$1 {
    id: number;
    name: string;
    secondaryName?: string | null;
    picturePath?: string | null;
}
interface PackUnit {
    id: number;
    type: number;
    name: string;
    value: number;
    price?: number | null;
    isActive: boolean;
}
interface ProductResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    nextSortOrder: string | null;
    results: Product[];
}

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
    GetBrand: boolean;
    getColors: boolean;
    getColorsDefaultPictures: boolean | null;
    getOffer: boolean;
    getSize: boolean;
    getCollections: boolean;
    branchId: number | null;
    storeId: number | null;
    id: number | null;
    ids: number[] | null;
    excludeId: number | null;
    CategoryId2: number | null;
    CategoryId3: number | null;
    CategoryId4: number | null;
    NameOrBarcode: string | null;
    BarCode: string | null;
    FilterCollections: boolean | null;
    SizeValueId: number | null;
    ColorId: number | null;
    SizePatternId: string | null;
    OfferGuid: string | null;
    GetColorsPictures: boolean | null;
    GetGeneralPictures: boolean | null;
    GetSizeSet: boolean | null;
    GetSizeSetValues: boolean | null;
    GetPointOffer: boolean | null;
    GetMenu: boolean | null;
    GetMultipleMenu: boolean | null;
    GetLikes: boolean | null;
    GetWishes: boolean | null;
    GetFavourites: boolean | null;
    GetRating: boolean | null;
    GetTempPicture: boolean | null;
    GetCategory: boolean | null;
    GetUnit: boolean | null;
    GetStoreId: boolean | null;
    GetPoints: boolean | null;
    GetPriceAfterDiscount: boolean | null;
    GetSyncThirdPartyId: boolean | null;
    GetDarkOffer: boolean | null;
    CombineNameAndBarcode: boolean | null;
    availability: boolean | null;
    minRating: number | null;
    hasDiscount: boolean | null;
    minDiscountPercentage: number | null;
    ItemQuantityStatus: number | null;
    SyncThirdPartyIds: string | null;
    SyncThirdPartyId: string | null;
    RejectionNote: string | null;
    Deliveryability: boolean | null;
    Availability: boolean | null;
    IsMultiMenuStore: boolean | null;
    UseApprovalSystem: boolean | null;
    CurrentSortField: string | null;
    CurrentSortOrder: string | null;
    Code: string | null;
    barcode: string | null;
    IsFeatured: boolean | null;
    IsActive: boolean | null;
    ApprovedStatus: number | null;
    HavePicture: boolean | null;
    HaveDescription: boolean | null;
    HaveColor: boolean | null;
    HaveOffer: boolean | null;
    HaveItemCollectionOffer: boolean | null;
    IsDeleted: boolean | null;
    CheckQuantityBeforeSale: boolean | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
    CreatedBy: string | null;
    UpdatedBy: string | null;
    constructor({ pagingParameters, sortType, menuId, categoryId, minPrice, maxPrice, name, gender, age, sourceId, offerId, newArrival, GetBrand, getColors, getColorsDefaultPictures, getOffer, getSize, getCollections, branchId, storeId, id, ids, excludeId, CategoryId2, CategoryId3, CategoryId4, NameOrBarcode, BarCode, FilterCollections, SizeValueId, ColorId, SizePatternId, OfferGuid, GetColorsPictures, GetGeneralPictures, GetSizeSet, GetSizeSetValues, GetPointOffer, GetMenu, GetMultipleMenu, GetLikes, GetWishes, GetFavourites, GetRating, GetTempPicture, GetCategory, GetUnit, GetStoreId, GetPoints, GetPriceAfterDiscount, GetSyncThirdPartyId, GetDarkOffer, CombineNameAndBarcode, availability, minRating, hasDiscount, minDiscountPercentage, ItemQuantityStatus, RejectionNote, Deliveryability, Availability, SyncThirdPartyIds, SyncThirdPartyId, IsMultiMenuStore, UseApprovalSystem, CurrentSortField, CurrentSortOrder, Code, barcode, IsFeatured, IsActive, ApprovedStatus, HavePicture, HaveDescription, HaveColor, HaveOffer, HaveItemCollectionOffer, IsDeleted, CheckQuantityBeforeSale, CreatedAt, UpdatedAt, CreatedBy, UpdatedBy, }?: {
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
        GetBrand?: boolean;
        getColors?: boolean;
        getColorsDefaultPictures?: boolean | null;
        getOffer?: boolean;
        getSize?: boolean;
        getCollections?: boolean;
        branchId?: number | null;
        storeId?: number | null;
        availability?: boolean | null;
        minRating?: number | null;
        hasDiscount?: boolean | null;
        minDiscountPercentage?: number | null;
        ItemQuantityStatus?: number | null;
        RejectionNote?: string | null;
        Deliveryability?: boolean | null;
        Availability?: boolean | null;
        SyncThirdPartyIds?: string | null;
        SyncThirdPartyId?: string | null;
        IsMultiMenuStore?: boolean | null;
        UseApprovalSystem?: boolean | null;
        CurrentSortField?: string | null;
        CurrentSortOrder?: string | null;
        Code?: string | null;
        barcode?: string | null;
        IsFeatured?: boolean | null;
        IsActive?: boolean | null;
        ApprovedStatus?: number | null;
        HavePicture?: boolean | null;
        HaveDescription?: boolean | null;
        HaveColor?: boolean | null;
        HaveOffer?: boolean | null;
        HaveItemCollectionOffer?: boolean | null;
        IsDeleted?: boolean | null;
        CheckQuantityBeforeSale?: boolean | null;
        CreatedAt?: string | null;
        UpdatedAt?: string | null;
        CreatedBy?: string | null;
        UpdatedBy?: string | null;
        id?: number | null;
        ids?: number[] | null;
        excludeId?: number | null;
        CategoryId2?: number | null;
        CategoryId3?: number | null;
        CategoryId4?: number | null;
        NameOrBarcode?: string | null;
        BarCode?: string | null;
        FilterCollections?: boolean | null;
        SizeValueId?: number | null;
        ColorId?: number | null;
        SizePatternId?: string | null;
        OfferGuid?: string | null;
        GetColorsPictures?: boolean | null;
        GetGeneralPictures?: boolean | null;
        GetSizeSet?: boolean | null;
        GetSizeSetValues?: boolean | null;
        GetPointOffer?: boolean | null;
        GetMenu?: boolean | null;
        GetMultipleMenu?: boolean | null;
        GetLikes?: boolean | null;
        GetWishes?: boolean | null;
        GetFavourites?: boolean | null;
        GetRating?: boolean | null;
        GetTempPicture?: boolean | null;
        GetCategory?: boolean | null;
        GetUnit?: boolean | null;
        GetStoreId?: boolean | null;
        GetPoints?: boolean | null;
        GetPriceAfterDiscount?: boolean | null;
        GetSyncThirdPartyId?: boolean | null;
        GetDarkOffer?: boolean | null;
        CombineNameAndBarcode?: boolean | null;
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

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

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

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

/**
 * Brand interface representing menu brand data
 */
interface Brand {
    id: number;
    name: string;
    /** optional localized or secondary name (e.g., English) */
    secondaryName?: string | null;
    description?: string | null;
    /** imageUrl may be null in API responses */
    imageUrl?: string | null;
    isActive?: boolean;
    [key: string]: any;
}
/**
 * Response type for getBrands API call
 */
type GetBrandsResponse = {
    brands: Brand[];
};

/**
 * Get menu brands list
 *
 * Server-side: Uses authenticated API call with getWithAuth
 * Client-side: Uses Next.js API route handler
 *
 * @returns Promise with brands array
 *
 * @example
 * // Server Component
 * const brands = await getBrands();
 *
 * @example
 * // Client Component
 * const brands = await getBrands();
 */
declare function getBrands(): Promise<GetBrandsResponse>;

interface UpdateItemResponse {
    success: boolean;
    message?: string;
    code?: string;
    name?: string;
}

interface UpdateItemCollectionRequest {
    barcode?: string;
    code?: string;
    price?: number;
    colorId?: number;
    sizeValueId?: number;
    unitLevel?: number;
    isActive?: boolean;
    [key: string]: any;
}
/**
 * Update an item collection by itemId and collection id
 */
declare function putItemCollection(id: string | number, collectionId: string | number, data: UpdateItemCollectionRequest): Promise<UpdateItemResponse>;

interface ItemCollectionActivateResponse {
    success?: boolean;
    message?: string;
    [key: string]: any;
}
/**
 * Activate an item collection for a given item
 */
declare function putItemCollectionActivate(id: string | number, collectionId: string | number): Promise<ItemCollectionActivateResponse>;

interface ItemCollectionDeactivateResponse {
    success?: boolean;
    message?: string;
    [key: string]: any;
}
/**
 * Deactivate an item collection for a given item
 */
declare function putItemCollectionDeactivate(id: string | number, collectionId: string | number): Promise<ItemCollectionDeactivateResponse>;

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
    static getStoreDeliveryZones(storeId: string | number): string;
    static getStoreUsersPaging: string;
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
    static getOffersDeliveryZones(deliveryZoneId: string | number): string;
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
    static getStoreById(id: string | number): string;
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
    static putOrderCancel(orderId: string | number): string;
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
    static postCopyParentToChildStores: string;
    static postCopyToStore(childStoreId: string | number): string;
    static putItemParentStoreSync(itemId: string | number): string;
    static putItemActivate(id: string | number): string;
    static putItemDeactivate(id: string | number): string;
    static putItemsCollectionsActivateByFilter(): string;
    static putItemsCollectionsDeactivateByFilter(): string;
    static putItem(id: string | number): string;
    static deleteItem(id: string | number): string;
    static putItemCollection(itemId: string | number, id: string | number): string;
    static putItemCollectionActivate(itemId: string | number, id: string | number): string;
    static putItemCollectionDeactivate(itemId: string | number, id: string | number): string;
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

/**
 * Type definitions for API requests
 */
type Primitive = string | number | boolean | null | undefined;
type RequestData = Record<string, any>;
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
declare function getToken(): Promise<string>;

/**
 * Client-side helpers for Firebase Phone Auth via WhatsApp.
 * Uses dual Firebase apps: Primary for auth, Secondary for Cloud Functions.
 */
type StartPhoneSignInResult = {
    confirm: (code: string) => Promise<string>;
};
interface WhatsAppOTPOptions {
    /** Cloud Function name for sending OTP (default: "whatsapp") */
    sendFunctionName?: string;
    /** Cloud Function name for verifying OTP (default: "verifySMS") */
    verifyFunctionName?: string;
    /** Project name to pass to Cloud Functions */
    projectName?: string;
}
/**
 * Start phone sign-in via WhatsApp OTP.
 * Sends OTP code via Cloud Function on secondary Firebase app.
 *
 * @param phoneNumber - E.164 format (e.g., "+9647XXXXXXXXX")
 * @param options - Optional configuration
 * @returns Promise with confirm function to verify OTP
 */
declare function startPhoneSignIn(phoneNumber: string, options?: WhatsAppOTPOptions): Promise<StartPhoneSignInResult>;
/**
 * Get current user's Firebase ID token from primary app.
 *
 * @param forceRefresh - Force token refresh
 * @returns ID token or null if no user
 */
declare function getFirebaseIdToken(forceRefresh?: boolean): Promise<string | null>;
/**
 * Sign out current user from Firebase primary app.
 */
declare function signOutFirebase(): Promise<void>;
/**
 * Start auth state synchronization.
 * Listens to Firebase token changes and syncs to backend automatically.
 * Implements singleton pattern, debouncing, and persistent guard.
 *
 * @param options - Configuration options
 * @returns Unsubscribe function
 */
declare function startAuthStateSync(options?: {
    loginEndpoint?: string;
    onError?: (e: any) => void;
    refreshOnInit?: boolean;
}): Promise<() => void>;

/**
 * Dual Firebase configuration.
 *
 * Primary app: Used for authentication (signInWithCustomToken)
 * Secondary app: Used for Cloud Functions (WhatsApp OTP)
 */

/**
 * Get or initialize the primary Firebase app.
 * Used for authentication.
 */
declare function getPrimaryApp(): Promise<FirebaseApp>;
/**
 * Get or initialize the secondary Firebase app.
 * Used for Cloud Functions (WhatsApp OTP).
 */
declare function getSecondaryApp(): Promise<FirebaseApp>;
/**
 * Legacy alias for backward compatibility.
 * @deprecated Use getPrimaryApp() instead
 */
declare function getFirebaseApp(): Promise<FirebaseApp>;

/**
 * Secure cookie utilities for encrypted token storage.
 * Server-side only - works with Next.js cookies API.
 */

/**
 * Cookie names used by the SDK
 */
declare const COOKIE_NAMES: {
    /** Primary session token (encrypted when possible) */
    readonly SESSION_ID: "session_id";
    /** User authentication flag */
    readonly IS_USER: "isUser";
    /** Legacy: third-party token (for migration) */
    readonly TP_ID: "tp_id";
    /** Legacy: crf cookie (for migration - deprecated) */
    readonly CRF: "crf";
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

export { type Address, AgeGroup, Api, type AuthConfig, COOKIE_NAMES, type Category, type City, type ColorType, type Country, type CurrentPhase, DeleveryType, type District, Gender, ItemsFilterParameters, NewArrivalPeriod, type Order, type OrderAddress, type OrderClient, type OrderCustomer, type OrderDetail, type OrderItem, OrderPagingParameters, OrderType, type OrdersApiResponse, OrdersFilterParameters, PagingParameters, PayType, type PostOrderAddressRequest, type PostOrderItemRequest, type PostOrderRequest, type Product$1 as Product, SECURE_COOKIE_OPTIONS, Sign, type SizeType, SortType, type StartPhoneSignInResult, type StoreType$1 as StoreType, type TokenResponse, type UnitInfo$1 as UnitInfo, type WhatsAppOTPOptions, apiFetch, deleteCookie, getBrands, getEncryptedCookie, getFirebaseApp, getFirebaseIdToken, getMenus, getOrders, getPrimaryApp, getProductInfo, getProducts, getSecondaryApp, getStoreInfo, getToken, putItemCollection, putItemCollectionActivate, putItemCollectionDeactivate, setEncryptedCookie, setPlainCookie, signOutFirebase, startAuthStateSync, startPhoneSignIn };
