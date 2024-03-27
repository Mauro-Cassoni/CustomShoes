import { IUser } from "./auth/i-user";
import { IProduct } from "./i-product";

export interface IInvoice {
  number : number;
  date : Date;
  amount : number;
  products : IProduct[];
  user : IUser;
}
