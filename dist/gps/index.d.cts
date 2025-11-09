export { b as getCities, g as getCountries, c as getDistricts, a as getLocationChildren } from '../getLocationChildren-E8z6W9gy.cjs';
import { NextRequest } from 'next/server';

declare function getDeliveryZones(): Promise<any[]>;

interface DeliveryZone {
    id: string;
    minimumOrderPrice?: number;
    priceOfDelivery?: number;
    duration?: number;
    durationType?: string;
    userType?: number;
    address?: {
        country?: {
            id?: number;
            name?: string;
            name_en?: string;
        };
        city?: {
            id?: number;
            name?: string;
            name_en?: string;
        };
        district?: {
            id?: number;
            name?: string;
            name_en?: string;
        };
        note?: string | null;
    };
    isActive?: boolean;
}

declare function GET(request: NextRequest): Promise<Response>;

export { type DeliveryZone, GET as GetDeliveryZonesGET, getDeliveryZones };
