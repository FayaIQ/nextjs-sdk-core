export interface Country {
    id: number;
    name: string;
    name_en: string;
}
export interface City {
    id: number;
    name: string;
    name_en: string;
}
export interface District {
    id: number;
    name: string;
    name_en: string;
}
export interface Address {
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
export interface StoreType {
    id: string;
    name: string;
    isActive: boolean;
}
export interface StoreInfo {
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
