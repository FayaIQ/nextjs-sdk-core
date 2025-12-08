interface ApproveOrderResponse {
    success: boolean;
    message?: string;
}
declare function putOrderApprove(id: string | number, note?: string): Promise<ApproveOrderResponse>;
declare function putOrderApproveList(ids: (string | number)[], note?: string): Promise<ApproveOrderResponse>;

export { type ApproveOrderResponse, putOrderApprove, putOrderApproveList };
