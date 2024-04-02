import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { IAddressObj } from '../Models/i-address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllAddresses(): Observable<IAddressObj[]> {
    return this.http.get<IAddressObj[]>(`${environment.URL}/addresses/all`);
  }

  getAddressById(id: number): Observable<IAddressObj> {
    return this.http.get<IAddressObj>(`${environment.URL}/addresses/${id}`);
  }

  createAddress(address: IAddressObj): Observable<IAddressObj> {
    return this.http.post<IAddressObj>(`${environment.URL}/addresses`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/addresses/${id}`);
  }

  getShippingAddress(): Observable<IAddressObj> {
    return this.http.get<IAddressObj>(`${environment.URL}/users/${this.authService.getUserId()}/shippingAddress`);
  }

  getRegisteredOfficeAddress(): Observable<IAddressObj> {
    return this.http.get<IAddressObj>(`${environment.URL}/users/${this.authService.getUserId()}/registeredOfficeAddress`);
  }

  getOperationalHeadquartersAddress(): Observable<IAddressObj> {
    return this.http.get<IAddressObj>(`${environment.URL}/users/${this.authService.getUserId()}/operationalHeadquartersAddress`);
  }

  createShippingAddress(address: IAddressObj): Observable<IAddressObj> {
    return this.http.post<IAddressObj>(`${environment.URL}/addresses`, address);
  }

  createRegisteredOfficeAddress(address: IAddressObj): Observable<IAddressObj> {
    return this.http.post<IAddressObj>(`${environment.URL}/addresses`, address);
  }

  createOperationalHeadquartersAddress(address: IAddressObj): Observable<IAddressObj> {
    return this.http.post<IAddressObj>(`${environment.URL}/addresses`, address);
  }

}
