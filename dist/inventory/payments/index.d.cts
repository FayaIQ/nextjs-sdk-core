import { Q as QueryParams } from '../../index-BRffoVUg.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function getPayments(query?: QueryParams): Promise<any>;

declare function getPaymentById(id: string | number): Promise<any>;

declare function postPayment(payload: any): Promise<any>;

declare function putPayment(id: string | number, payload: any): Promise<any>;

declare function deletePayment(id: string | number): Promise<any>;

declare function getStorePayments(storeId: string | number): Promise<any>;

declare function getPaymentsReport(query?: QueryParams): Promise<any>;

declare function GET$3(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$2(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function POST(request: NextRequest): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        storeId: string;
    }>;
}): Promise<NextResponse<any>>;

export { DELETE as DeletePaymentDELETE, GET$1 as GetPaymentByIdGET, GET$3 as GetPaymentsGET, GET$2 as GetPaymentsReportGET, GET as GetStorePaymentsGET, POST as PostPaymentPOST, PUT as PutPaymentPUT, deletePayment, getPaymentById, getPayments, getPaymentsReport, getStorePayments, postPayment, putPayment };
