import { I as ItemsFilterParameters } from './filter-models-Dt5y9Xvs.js';

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
    brand: Brand | null;
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
interface Brand {
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
interface UpdateItemRequest {
    name: string;
    currencyID?: number;
    defaultPrice: number;
    imageBase64?: string | null;
    subDescription?: string | null;
    description?: string | null;
    nameSecondary?: string | null;
    subDescriptionSecondary?: string | null;
    descriptionSecondary?: string | null;
    isFeatured?: boolean;
    minimumOrderQuantity?: number | null;
    maximumOrderQuantity?: number | null;
    unitType?: number;
    unitValue?: number;
    gender?: number;
    age?: number;
    smallUnitItemID?: number | null;
    barcode?: string | null;
    code?: string | null;
    videoURL?: string | null;
    preparation?: number;
    calories?: number;
    sizeTypeID?: number | null;
    sourceID?: number | null;
    checkQuantitiesBeforeSale?: boolean;
    deliverable?: boolean;
    isAvailable?: boolean;
    isActive?: boolean;
    syncThirdPartyId?: string | null;
    currentOfferId?: string | null;
    pointOfferId?: string | null;
    unit2?: {
        value: number;
        price: number;
        isActive: boolean;
    } | null;
    unit3?: {
        value: number;
        price: number;
        isActive: boolean;
    } | null;
    menuIds?: number[] | null;
    categoryId2?: number | null;
    categoryId3?: number | null;
    categoryId4?: number | null;
}
interface ItemsCollectionsFilterRequest {
    currentPage: number;
    pageSize: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    id: number | null;
    ids: number[] | null;
    excludeId: number | null;
    name: string | null;
    menuId: number | null;
    categoryId: number | null;
    categoryId2: number | null;
    categoryId3: number | null;
    categoryId4: number | null;
    barCode: string | null;
    code: string | null;
    nameOrBarcode: string | null;
    sourceId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    availability: boolean | null;
    deliveryability: boolean | null;
    isFeatured: boolean | null;
    haveColor: boolean | null;
    havePicture: boolean | null;
    haveDescription: boolean | null;
    haveOffer: boolean | null;
    haveItemCollectionOffer: boolean | null;
    filterCollections: boolean | null;
    sizeValueId: number | null;
    colorId: number | null;
    rejectionNote: string | null;
    isActive: boolean | null;
    approvedStatus: number | null;
    newArrival: number | null;
    age: number | null;
    gender: number | null;
    sizePatternId: string | null;
    storeId: number | null;
    isDeleted: boolean | null;
    offerId: string | null;
    itemQuantityStatus: number | null;
    checkQuantityBeforeSale: boolean | null;
    syncThirdPartyId: string | null;
    haveDarkOffer: boolean | null;
    createdBy: string | null;
    createdByName: string | null;
    updatedBy: string | null;
    updatedByName: string | null;
    sortType: number | null;
    getPacks: boolean | null;
    getColors: boolean | null;
    getColorsDefaultPictures: boolean | null;
    getColorsPictures: boolean | null;
    getGeneralPictures: boolean | null;
    getSizeSet: boolean | null;
    getSizeSetValues: boolean | null;
    getCollections: boolean | null;
    getOffer: boolean | null;
    getPointOffer: boolean | null;
    getMenu: boolean | null;
    getMultipleMenu: boolean | null;
    getBrand: boolean | null;
    getLikes: boolean | null;
    getWishes: boolean | null;
    getFavourites: boolean | null;
    getRating: boolean | null;
    getTempPicture: boolean | null;
    getCategory: boolean | null;
    getUnit: boolean | null;
    getStoreId: boolean | null;
    getPoints: boolean | null;
    getPriceAfterDiscount: boolean | null;
    getSyncThirdPartyId: boolean | null;
    getDarkOffer: boolean | null;
    combineNameAndBarcode: boolean | null;
    CreatedAt: string | null;
    UpdatedAt: string | null;
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

export { type Brand as B, type CollectionItem as C, type ItemColor as I, type MultipleMenu as M, type Product as P, type SizeValue as S, type UpdateItemRequest as U, getProductInfo as a, type ProductResponse as b, type UnitInfo as c, type SizeSet as d, type Packs as e, type PackUnit as f, getProducts as g, type ItemsCollectionsFilterRequest as h };
