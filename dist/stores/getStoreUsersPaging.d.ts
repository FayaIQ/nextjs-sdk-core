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

export { type StoreUserPagingParams, getStoreUsersPaging };
