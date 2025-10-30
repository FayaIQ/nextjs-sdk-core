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

export type { Address as A, Category as C, District as D, StoreType as S, Country as a, City as b };
