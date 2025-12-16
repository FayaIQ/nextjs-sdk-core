interface CopyParentResponse {
    success: boolean;
    message?: string;
}
/**
 * Copy parent store items to current store.
 * @param itemIds array of item ids to copy
 */
declare function postCopyParentStore(itemIds: (number | string)[]): Promise<CopyParentResponse>;

export { type CopyParentResponse, postCopyParentStore };
