import { NextRequest, NextResponse } from 'next/server';

interface Store {
    id: number;
    code: string;
    name: string;
}

declare function getStores(): Promise<Store[]>;

declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

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

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET as GETStoreUsersPaging, GET$1 as GETStores, type Store, type StoreUser, type StoreUserPagingParams, type StoreUsersPagingResponse, getStoreDeliveryZones, getStoreUsersPaging, getStores };
