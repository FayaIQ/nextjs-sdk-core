export interface CountryModel {
  id: number;
  name: string;
  name_en?: string | null;
}

export interface CityModel {
  id: number;
  name: string;
  name_en?: string | null;
}

export interface DistrictModel {
  id: number;
  name: string;
  name_en?: string | null;
}

export interface AddressModel {
  id: number;
  gps?: string | null;
  distance?: number | null;
  country: CountryModel;
  city: CityModel;
  district?: DistrictModel | null;
  building?: string | null;
  appartmentNumber?: string | null;
  note?: string | null;
}

export interface StoreTypeModel {
  id: string;
  name: string;
  isActive: boolean;
}

export interface BranchModel {
  id: number;
  name: string;
  code?: string | null;
  subDescription?: string | null;
  description?: string | null;
  typeID?: string | null;
  gps?: string | null;
  address?: AddressModel | null;
  freeNumber?: string | null;
  phoneNumber1?: string | null;
  phoneNumber2?: string | null;
  phoneNumber3?: string | null;
  website?: string | null;
  email?: string | null;
  parentId?: number | null;
  originalLogoPath?: string | null;
  originalLogoId?: string | null;
  originalPicturePath?: string | null;
  originalPictureId?: string | null;
  picturePath?: string | null;
  isActive?: boolean;
  facebookLink?: string | null;
  youtubeLink?: string | null;
  whatsappLink?: string | null;
  instagramLink?: string | null;
  snapchatLink?: string | null;
  tiktokLink?: string | null;
  storeType?: StoreTypeModel | null;
}

export interface CityBranches {
  id: number;
  cityName: string;
  branches: BranchModel[];
}

export interface CountryBranches {
  id: number;
  countryName: string;
  citiesBranches: CityBranches[];
}

export interface BranchesResponse {
  mainStore: BranchModel;
  countriesBranches: CountryBranches[];
}

export default BranchesResponse;
