interface ClientAddressRequest {
    gps?: string | null;
    districtId?: number | null;
    note?: string | null;
    appartmentId?: number | null;
    clientId?: string | null;
}
interface PostClientRequest {
    name: string;
    address?: ClientAddressRequest | null;
    email?: string | null;
    phoneCode?: string | null;
    phoneNumber?: string | null;
    clientTypeId?: string | null;
    classId?: string | null;
    isApproved?: boolean;
    isAddedByAdmin?: boolean;
}
interface Client {
    id: string;
    name: string;
    email?: string | null;
    phoneCode?: string | null;
    phoneNumber?: string | null;
    addressId: number;
    isApproved?: boolean;
    isAddedByAdmin?: boolean;
    address?: {
        gps?: string | null;
        districtId?: number | null;
        note?: string | null;
        appartmentId?: number | null;
        clientId?: string | null;
    } | null;
}
interface ClientsPagingResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    results: Client[];
}
interface ClientsApiResponse {
    data: Client[];
}

export type { Client, ClientAddressRequest, ClientsApiResponse, ClientsPagingResponse, PostClientRequest };
