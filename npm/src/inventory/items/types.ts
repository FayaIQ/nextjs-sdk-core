
export interface UnitInfo {
  type: number;
  name: string;
  value: number;
  isActive: boolean;
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
  brand: unknown | null;
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
}

// Standard paginated response for product lists
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