import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../Models/i-product';
import { IProductResponse } from '../Models/i-product-response';
import { Iwishlist } from '../Models/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private http:HttpClient,
  ) { }


  getWishlist(userId: number): Observable<Iwishlist> {
    return this.http.get<Iwishlist>(`${environment.URL}/users/${userId}/wishlist`);
  }

  addToWishlist(userId: number, productId: number): Observable<void> {
    return this.http.post<void>(`${environment.URL}/users/${userId}/wishlist/add/${productId}`, null);
  }

  removeFromWishlist(userId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/users/${userId}/wishlist/remove/${productId}`);
  }

}
