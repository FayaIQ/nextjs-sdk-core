interface DisapproveOrderResponse {
    success: boolean;
    message?: string;
}
declare function putOrderDisapprove(id: string | number, note: string): Promise<DisapproveOrderResponse>;
declare function putOrderDisapproveList(ids: (string | number)[], note?: string): Promise<DisapproveOrderResponse>;

export { type DisapproveOrderResponse, putOrderDisapprove, putOrderDisapproveList };
