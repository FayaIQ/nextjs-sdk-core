export { b as getCities, g as getCountries, c as getDistricts, a as getLocationChildren } from '../../getLocationChildren-E8z6W9gy.js';
import { NextRequest, NextResponse } from 'next/server';

interface Location {
    id: number;
    name: string;
    name_en: string;
}
type Country = Location;
type City = Location;
type District = Location;

/**
 * Ready-to-use API route handler for countries
 * Users can simply re-export this in their app/api/locations/countries/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/countries';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

/**
 * Ready-to-use API route handler for location children (cities/districts)
 * Users can simply re-export this in their app/api/locations/[parentId]/children/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/children';
 */
declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        parentId: string;
    }>;
}): Promise<NextResponse<any>>;

export { type City, type Country, type District, type Location, GET$1 as getCountriesHandler, GET as getLocationChildrenHandler };
