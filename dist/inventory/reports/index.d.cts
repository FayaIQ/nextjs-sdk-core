import { Q as QueryParams } from '../../index-BRffoVUg.cjs';
import { NextRequest } from 'next/server';

declare function getReportsCustomerOrders(query?: QueryParams): Promise<any>;

interface OrderSaleInterval {
    yearorMonthorDay: number;
    orderCount: number;
    orderAmount: number;
}
interface OrderSize {
    val1: string;
    val2: string;
}
interface OrderItem {
    itemId: number;
    itemName: string;
    itemSecondaryName?: string | null;
    itemBarcode?: string | null;
    itemCode?: string | null;
    parentMenuId?: number | null;
    parentMenu?: string | null;
    childMenuId?: number | null;
    childMenu?: string | null;
    brandId?: number | null;
    brandName?: string | null;
    brandSecondaryName?: string | null;
    colorId?: number | null;
    colorName?: string | null;
    sizeValueId?: number | null;
    size: OrderSize;
    quantity: number;
    piece: number;
    packs: number;
    averagePrice: number;
    totalAmount: number;
    totalPoints: number;
}
interface OrderSalesResponse {
    totalOrderCount: number;
    orderAmount: number;
    totalDeliveryPrice: number;
    totalOrderDiscount: number;
    totalOrderAmount: number;
    totalPieces: number;
    totalPacks: number;
    orderSaleIntervals: OrderSaleInterval[];
    orderItems: OrderItem[];
}

declare function getReportsOrderSales(query?: QueryParams): Promise<OrderSalesResponse>;

declare function GET$1(request: NextRequest): Promise<Response>;

declare function GET(request: NextRequest): Promise<Response>;

export { GET$1 as GetReportsCustomerOrdersGET, GET as GetReportsOrderSalesGET, getReportsCustomerOrders, getReportsOrderSales };
