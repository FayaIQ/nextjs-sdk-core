import { NextRequest, NextResponse } from 'next/server';

interface Store {
    id: number;
    code: string;
    name: string;
}

declare function getStores(): Promise<Store[]>;

declare function GET$3(request: NextRequest): Promise<NextResponse<any>>;

/**
 * Parameters accepted by getStoreUsersPaging
 */
type StoreUserPagingParams = {
    Username?: string | null;
    FullName?: string | null;
    Email?: string | null;
    EmailConfirmed?: boolean | null;
    Phone?: string | null;
    PhoneNumberConfirmed?: boolean | null;
    Gender?: number | null;
    Birthdate?: string | null;
    Role?: string | null;
    Roles?: string[] | null;
    CurrentPage?: number;
    PageSize?: number;
    SortField?: string | null;
    CurrentSortField?: string | null;
    CurrentSortOrder?: string | null;
    [k: string]: any;
};
/**
 * Fetch paged store users from the Store service.
 * Works both server-side (calls upstream service directly) and client-side (calls nextjs API route).
 */
declare function getStoreUsersPaging(params?: StoreUserPagingParams): Promise<any>;

declare function getStoreDeliveryZones(storeId: string | number): Promise<any[]>;

interface StoreUser {
    id: string;
    userId: string;
    userName: string;
    roles: string[];
    fullName: string | null;
    profileThumpPicture: string | null;
    gender: number | null;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    email: string | null;
    emailConfirmed: boolean;
    birthdate: string | null;
    isOwner: boolean;
    isActive: boolean;
    createdDate: string;
}
interface StoreUsersPagingResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    nextSortOrder: string | null;
    results: StoreUser[];
}

declare function GET$2(request: NextRequest): Promise<NextResponse<any>>;

/**
 * Get a store by id
 */
declare function getStoreById(id: string | number): Promise<any>;

declare function GET$1(request: NextRequest, { params }: {
    params: Promise<{
        storeId: string;
    }>;
}): Promise<NextResponse<any>>;

interface CountryModel {
    id: number;
    name: string;
    name_en?: string | null;
}
interface CityModel {
    id: number;
    name: string;
    name_en?: string | null;
}
interface DistrictModel {
    id: number;
    name: string;
    name_en?: string | null;
}
interface AddressModel {
    id: number;
    gps?: string | null;
    distance?: number | null;
    country: CountryModel;
    city: CityModel;
    district?: DistrictModel | null;
    building?: string | null;
    appartmentNumber?: string | null;
    note?: string | null;
}
interface StoreTypeModel {
    id: string;
    name: string;
    isActive: boolean;
}
interface BranchModel {
    id: number;
    name: string;
    code?: string | null;
    subDescription?: string | null;
    description?: string | null;
    typeID?: string | null;
    gps?: string | null;
    address?: AddressModel | null;
    freeNumber?: string | null;
    phoneNumber1?: string | null;
    phoneNumber2?: string | null;
    phoneNumber3?: string | null;
    website?: string | null;
    email?: string | null;
    parentId?: number | null;
    originalLogoPath?: string | null;
    originalLogoId?: string | null;
    originalPicturePath?: string | null;
    originalPictureId?: string | null;
    picturePath?: string | null;
    isActive?: boolean;
    facebookLink?: string | null;
    youtubeLink?: string | null;
    whatsappLink?: string | null;
    instagramLink?: string | null;
    snapchatLink?: string | null;
    tiktokLink?: string | null;
    storeType?: StoreTypeModel | null;
}
interface CityBranches {
    id: number;
    cityName: string;
    branches: BranchModel[];
}
interface CountryBranches {
    id: number;
    countryName: string;
    citiesBranches: CityBranches[];
}
interface BranchesResponse {
    mainStore: BranchModel;
    countriesBranches: CountryBranches[];
}

declare function getBranches(): Promise<BranchesResponse>;

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { type BranchesResponse, GET as GETBranches, GET$2 as GETStoreUsersPaging, GET$3 as GETStores, GET$1 as GetStoreByIdGET, type Store, type StoreUser, type StoreUserPagingParams, type StoreUsersPagingResponse, getBranches, getStoreById, getStoreDeliveryZones, getStoreUsersPaging, getStores };
