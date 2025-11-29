interface Customer {
    id: string;
    username: string;
    fullName: string;
    oldUsername: string | null;
    email: string | null;
    emailConfirmed: boolean;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    gender: number;
    birthdate: string | null;
    profileThumpPicture: string | null;
    [key: string]: any;
}
interface CustomerResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    nextSortOrder: string | null;
    results: Customer[];
}
interface CustomersDropdownEnvelope {
    success: boolean;
    data: CustomerResponse;
}

export type { Customer, CustomerResponse, CustomersDropdownEnvelope };
