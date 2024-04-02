export interface IAddress {
  id ?: number;
  name : string;
  surname : string;
  street : string;
  streetNumber : string;
  city : string;
  postalCode : string;
  country : string;
  province : string;
  phoneNumber : string;
}

export interface IAddressObj {
  date: string;
  message: string;
  obj: IAddress;
}
