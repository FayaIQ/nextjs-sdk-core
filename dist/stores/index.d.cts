import { NextRequest, NextResponse } from 'next/server';

interface Store {
    id: number;
    code: string;
    name: string;
}

declare function getStores(): Promise<Store[]>;

declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

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

/**
 * Get store users with paging and filters.
 * Pass an optional params object to set query parameters (e.g., { Username: 'abc', CurrentPage: 1 })
 */
declare function getStoreUsersPaging(params?: Record<string, any>): Promise<StoreUsersPagingResponse>;

declare function getStoreDeliveryZones(storeId: string | number): Promise<any[]>;

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET as GETStoreUsersPaging, GET$1 as GETStores, type Store, type StoreUser, type StoreUsersPagingResponse, getStoreDeliveryZones, getStoreUsersPaging, getStores };
