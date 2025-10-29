// src/types.ts

export interface Country {
  id: number;
  name: string;
  name_en: string;
}

export interface City {
  id: number;
  name: string;
  name_en: string;
}

export interface District {
  id: number;
  name: string;
  name_en: string;
}

export interface Address {
  id: number;
  gps: string | null;
  distance: number;
  country: Country;
  city: City;
  district: District;
  building: string | null;
  appartmentNumber: string | null;
  note: string | null;
}

export interface Category {
  subCategories: Category[]; // recursive tree
  id: number;
  parentID: number | null;
  name: string;
  nameSecondary: string;
  iconUrl: string | null;
  imageUrl: string | null;
  emoji: string | null;
  orderIndex: number;
}

export interface StoreType {
  id: string;
  name: string;
  isActive: boolean;
}

