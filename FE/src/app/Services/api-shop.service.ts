import { IProductObj } from './../Models/i-product-obj';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/i-product';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProductResponse } from '../Models/i-product-response';

@Injectable({
  providedIn: 'root'
})
export class ApiShopService {

  constructor(
    private http: HttpClient,
  ) { }

  productSubject = new BehaviorSubject<IProductResponse | null>(null)
  product$: Observable<IProductResponse | null> = this.productSubject.asObservable();
  products: IProduct[] = [];

  getAll(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${environment.URL}/products/no-auth`);
  }

  getByCat(category: string): Observable<IProduct[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<IProduct[]>(`${environment.URL}/products`, { params });
  }

  searchByName(query: string, limit: number): Observable<IProduct[]> {
    const params = new HttpParams().set('name_like', query).set('_limit', limit.toString());
    return this.http.get<IProduct[]>(`${environment.URL}/products`, { params });
  }

  create(product: Partial<IProduct>): Observable<IProductObj> {
    return this.http.post<IProductObj>(`${environment.URL}/products/create`, product);
  }

  update(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${environment.URL}/products/update/${product.id}`, product);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/products/delete/${id}`);
  }

  getById(id: number): Observable<IProductObj> {
    return this.http.get<IProductObj>(`${environment.URL}/products/no-auth/${id}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.getAll().pipe(
      map((response: IProductResponse) => {
        const categoriesSet = new Set<string>();
        response.obj.content.forEach(product => {
          categoriesSet.add(product.category);
        });
        return Array.from(categoriesSet);
      })
    );
  }

  uploadImg(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('upload', file);
    return this.http.patch<any>(`${environment.URL}/products/upload/${productId}`, formData);
  }

}
