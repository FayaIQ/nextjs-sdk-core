
export interface UnitInfo {
  type: number;
  name: string;
  value: number;
  isActive: boolean;
}

export interface SizeValue {
  id: number;
  value1: string | null;
  value2: string | null;
  fullValue: string;
  index: number;
  
}

export interface SizeSet {
  sizeTypeId: number;
  name: string;
  parameter1: string | null;
  parameter2: string | null;
  values: SizeValue[];
}

export interface MultipleMenu {
  id: number;
  parentID: number | null;
  name: string;
  nameSecondary: string | null;
  iconUrl: string | null;
  imageUrl: string | null;
  emoji: string | null;
  orderIndex: number;
}

export interface CollectionItem {
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

export interface Packs {
  unitLevel2: PackUnit | null;
  unitLevel3: PackUnit | null;
}

export interface ItemColor {
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

export interface Product {
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
  createDate: string; // ISO string
  publishDate: string; // ISO string
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

export interface Brand {
  id: number;
  name: string;
  secondaryName?: string | null;
  picturePath?: string | null;
}

export interface PackUnit {
  id: number;
  type: number;
  name: string;
  value: number;
  price?: number | null;
  isActive: boolean;
}

export interface ProductResponse {
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

export interface UpdateItemRequest {
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

