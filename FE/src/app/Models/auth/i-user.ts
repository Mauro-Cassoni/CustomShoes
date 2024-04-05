import { Role } from "../../Enums/role";
import { UserType } from "../../Enums/user-type";
import { IAddress } from "../i-address";
import { IInvoice } from "../i-invoice";
import { IProduct } from "../i-product";

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  userType?: UserType;

  wishlist: IProduct[];
  role?: Role;
  shippingAddress?: IAddress;
  businessName: string;
  vatNumber: string;
  insertionDate: string;
  pec: string;
  sdi: string;
  registeredOfficeAddress?: IAddress;
  operationalHeadquartersAddress?: IAddress;
  invoices: IInvoice[];
}

export interface IUserObjArray {
  date: string;
message: string;
obj: IUser[];
}
