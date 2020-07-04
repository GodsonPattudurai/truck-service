export class PersonInfoDTO {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string; 
    registeredDate: Date;
    gender: string;
    address: string; 
    licenseNumber: string; 
    personType: [string];
    status: string;
    documentVerified: boolean;
}