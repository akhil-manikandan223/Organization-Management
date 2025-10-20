export interface Country {
    countryId: number;
    name: string;
    phoneCode: string;
    capitalCity: string;
    isActive?: boolean;
    createdDate?: string;
}