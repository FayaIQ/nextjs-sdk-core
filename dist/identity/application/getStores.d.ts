interface StoreItem {
    id: string;
    name: string;
    clientType: string;
}
declare function getStores(): Promise<any>;

export { type StoreItem, getStores };
