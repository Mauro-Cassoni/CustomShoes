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
    return this.http.get<IAddress[]>(`${environment.URL}/addresses/all`);
  }

  getAddressById(id: number): Observable<IAddress> {
    return this.http.get<IAddress>(`${environment.URL}/addresses/${id}`);
  }

  createAddress(address: IAddress): Observable<IAddress> {
    return this.http.post<IAddress>(`${environment.URL}/addresses`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/addresses/${id}`);
  }

  getShippingAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(`${environment.URL}/users/${this.authService.getUserId()}/shippingAddress`);
  }

  getRegisteredOfficeAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(`${environment.URL}/users/${this.authService.getUserId()}/registeredOfficeAddress`);
  }

  getOperationalHeadquartersAddress(): Observable<IAddress> {
    return this.http.get<IAddress>(`${environment.URL}/users/${this.authService.getUserId()}/operationalHeadquartersAddress`);
  }

  setShippingAddress(addressId: number): Observable<void> {
    const userId = this.authService.getUserId();
    return this.http.put<void>(`${environment.URL}/users/${userId}/shippingAddress/${addressId}`, null);
  }

  setRegisteredOfficeAddress(addressId: number): Observable<void> {
    const userId = this.authService.getUserId();
    return this.http.put<void>(`${environment.URL}/users/${userId}/registeredOfficeAddress/${addressId}`, null);
  }

  setOperationalHeadquartersAddress(addressId: number): Observable<void> {
    const userId = this.authService.getUserId();
    return this.http.put<void>(`${environment.URL}/users/${userId}/operationalHeadquartersAddress/${addressId}`, null);
  }

  updateShippingAddress(address: IAddress): Observable<IAddress> {
    const userId = this.authService.getUserId();
    return this.http.put<IAddress>(`${environment.URL}/users/${userId}/shippingAddress`, address);
  }

  updateRegisteredOfficeAddress(address: IAddress): Observable<IAddress> {
    const userId = this.authService.getUserId();
    return this.http.put<IAddress>(`${environment.URL}/users/${userId}/registeredOfficeAddress`, address);
  }

  updateOperationalHeadquartersAddress(address: IAddress): Observable<IAddress> {
    const userId = this.authService.getUserId();
    return this.http.put<IAddress>(`${environment.URL}/users/${userId}/operationalHeadquartersAddress`, address);
  }

}
