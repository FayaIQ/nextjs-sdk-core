export { d as getAddressById, b as getCities, g as getCountries, c as getDistricts, a as getLocationChildren } from '../getAddressById-kmr7U2QC.js';
import { NextRequest } from 'next/server';
import '../order-models-nbgqiu1i.js';

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
