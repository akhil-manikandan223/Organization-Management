export interface UserProfile {
  UserId: number;
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  AddressLine1?: string;
  AddressLine2?: string;
  PostalCode?: string;
  City?: string;
  CreatedDate?: string;
}
