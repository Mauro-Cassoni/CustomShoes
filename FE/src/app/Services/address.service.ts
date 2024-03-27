import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../Models/i-address';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  getAllAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${environment.URL}/addresses`);
  }

  getAddressById(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(`${environment.URL}/addresses/${id}`);
  }

  createAddress(address: IAddress): Observable<IAddress> {
    return this.http.post<IAddress>(`${environment.URL}/addresses`, address);
  }

  updateAddress(id: number, address: IAddress): Observable<IAddress> {
    return this.http.put<IAddress>(`${environment.URL}/addresses/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/addresses/${id}`);
  }

  getUserAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${environment.URL}/users/${this.authService.getUserId()}/addresses`);
  }
}
