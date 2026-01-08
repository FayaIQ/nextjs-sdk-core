import { A as Address } from './types-BlK7R_r9.js';

interface Store {
    id: number;
    name: string;
    clientType: string;
}
interface StoreType {
    id: string;
    name: string;
    isActive: boolean;
}
interface StoreInfo {
    id: number;
    name: string;
    code: string;
    subDescription: string | null;
    description: string;
    nameSecondary: string | null;
    subDescriptionSecondary: string | null;
    descriptionSecondary: string | null;
    typeID: string;
    gps: string | null;
    address: Address;
    freeNumber: string | null;
    phoneNumber1: string | null;
    phoneNumber2: string | null;
    phoneNumber3: string | null;
    website: string | null;
    email: string | null;
    parentId: number | null;
    originalLogoPath: string | null;
    originalLogoId: string | null;
    originalPicturePath: string | null;
    originalPictureId: string | null;
    picturePath: string | null;
    isActive: boolean;
    facebookLink: string | null;
    youtubeLink: string | null;
    whatsappLink: string | null;
    instagramLink: string | null;
    snapchatLink: string | null;
    tiktokLink: string | null;
    children: StoreInfo[];
    storeType: StoreType;
    shifts: unknown[];
}

/**
 * Fetches store information
 * Works in both server and client components
 *
 * @returns Promise with store information
 *
 * @example
 * // Server component
 * const storeInfo = await getStoreInfo();
 *
 * @example
 * // Client component
 * const storeInfo = await getStoreInfo();
 */
declare function getStoreInfo(): Promise<StoreInfo>;

export { type StoreInfo as S, type Store as a, getStoreInfo as g };
