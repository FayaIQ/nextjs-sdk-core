import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetch paginated offers
 */
declare function getOffersPaging(query?: Record<string, any>): Promise<any>;

declare function getOfferById(id: string | number): Promise<any>;

declare function deleteOffer(id: string | number): Promise<any>;

declare function getInvoiceDiscount(coupon: string): Promise<any>;

declare function getOffersItemsDropdown(): Promise<any>;

declare function getOffersCouponsDropdown(): Promise<any>;

declare function postOffersItemsDiscount(payload: any): Promise<any>;

declare function putOffersItemsDiscount(id: string | number, payload: any): Promise<any>;

declare function getOffersCustomers(): Promise<any>;

declare function GET$5(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$4(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET$3(request: NextRequest, { params }: {
    params: Promise<{
        coupon: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET$2(): Promise<NextResponse<any>>;

declare function GET$1(): Promise<NextResponse<any>>;

declare function POST(request: NextRequest): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET(): Promise<NextResponse<any>>;

export { DELETE as DeleteOfferDELETE, GET$3 as GetInvoiceDiscountGET, GET$4 as GetOfferByIdGET, GET$1 as GetOffersCouponsDropdownGET, GET as GetOffersCustomersGET, GET$2 as GetOffersItemsDropdownGET, GET$5 as GetOffersPagingGET, POST as PostOffersItemsDiscountPOST, PUT as PutOffersItemsDiscountPUT, deleteOffer, getInvoiceDiscount, getOfferById, getOffersCouponsDropdown, getOffersCustomers, getOffersItemsDropdown, getOffersPaging, postOffersItemsDiscount, putOffersItemsDiscount };
