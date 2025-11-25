export interface OrderSaleInterval {
  yearorMonthorDay: number;
  orderCount: number;
  orderAmount: number;
}

export interface OrderSize {
  val1: string;
  val2: string;
}

export interface OrderItem {
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

export interface OrderSalesResponse {
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

export default OrderSalesResponse;
