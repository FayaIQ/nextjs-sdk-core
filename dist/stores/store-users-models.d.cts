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

export type { StoreUser, StoreUsersPagingResponse };
