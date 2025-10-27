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

export type { Address as A, Country as C, District as D, Product as P, StoreInfo as S, UnitInfo as U, City as a, Category as b, StoreType as c };
