export interface Customer {
  id: string;
  username: string;
  fullName: string;
  oldUsername: string | null;
  email: string | null;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  gender: number;
  birthdate: string | null;
  profileThumpPicture: string | null;
  [key: string]: any;
  
}

export interface CustomerResponse {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  sortField: string | null;
  currentSortField: string | null;
  currentSortOrder: string | null;
  nextSortOrder: string | null;
  results: Customer[];
}

// Envelope used by identity endpoints in this package
export interface CustomersDropdownEnvelope {
  success: boolean;
  data: CustomerResponse;
}
