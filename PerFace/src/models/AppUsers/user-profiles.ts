export interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  Phone: string;
  Email: string;
  AddressLine1?: string;
  AddressLine2?: string;
  PostalCode?: string;
  City?: string;
  CreatedDate?: string;
}

export interface UserEditDto {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  dateOfBirth: Date | null;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  department: string;
  jobTitle: string;
  employeeId: string;
  hireDate: Date | null;
  salary: number | null;
  manager: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  profilePicture: string;
  notes: string;
  isActive: boolean;
  roleIds: number[];
}

