import { IProduct } from "./i-product";

export interface Iwishlist {
  date: string;
  message: string;
  obj:  IProduct[];
}
