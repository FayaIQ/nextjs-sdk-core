declare function getLocationChildren(parentId: number): Promise<any>;
declare function getCities(countryId: number): Promise<any>;
declare function getDistricts(cityId: number): Promise<any>;

export { getCities, getDistricts, getLocationChildren };
