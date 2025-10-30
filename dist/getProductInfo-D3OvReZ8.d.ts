import { I as ItemsFilterParameters } from './filter-models-CGOHNUQz.js';

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
    unitLevel2: unknown | null;
    unitLevel3: unknown | null;
}
interface ItemColor {
    id: number;
    name: string;
    secondaryName?: string;
    code: string;
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
    brand: unknown | null;
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
    rejectionNote: string | null;
    offer: unknown | null;
    customerItemOffer: unknown | null;
    pointOffer: unknown | null;
    collectionItemOffer: unknown | null;
    darkItemOffer: unknown | null;
    multipleMenus: MultipleMenu[] | null;
    colors: ItemColor[] | null;
    generalPictures: unknown | null;
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

export { type CollectionItem as C, type ItemColor as I, type MultipleMenu as M, type ProductResponse as P, type SizeValue as S, type UnitInfo as U, getProductInfo as a, type Product as b, type SizeSet as c, type Packs as d, getProducts as g };
