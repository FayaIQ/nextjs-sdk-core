interface ApplicationStoreDropdownItem {
    id: string;
    name: string;
    clientType: string;
}
declare function getApplicationsStoreDropdown(): Promise<ApplicationStoreDropdownItem[]>;

export { type ApplicationStoreDropdownItem, getApplicationsStoreDropdown };
