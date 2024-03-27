import { IProduct } from "./i-product";

export interface IProductResponse {
  date: string;
  message: string;
  obj: {
    content: IProduct[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: any;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
  };
}
