  export interface DeliveryZone {
    id: string;
    minimumOrderPrice?: number;
    priceOfDelivery?: number;
    duration?: number;
    durationType?: string;
    userType?: number;
    address?: {
      country?: { id?: number; name?: string; name_en?: string };
      city?: { id?: number; name?: string; name_en?: string };
      district?: { id?: number; name?: string; name_en?: string };
      note?: string | null;
    };
    isActive?: boolean;
  }

