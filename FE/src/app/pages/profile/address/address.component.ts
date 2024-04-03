import { Component } from '@angular/core';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  constructor(
    private authService: AuthService,
  ) { }

  userData: IAuthData = {
    token: '',
    user: {
      id: 0,
      email: '',
      password: '',
      name: '',
      surname: '',
      phoneNumber: '',
      wishlist: [],
      businessName: '',
      vatNumber: '',
      insertionDate: '',
      pec: '',
      sdi: '',
      invoices: [],
      operationalHeadquartersAddress: {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        city: '',
        postalCode: '',
        country: '',
        province: '',
        phoneNumber: '',
      },
      registeredOfficeAddress: {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        city: '',
        postalCode: '',
        country: '',
        province: '',
        phoneNumber: '',
      },
      shippingAddress: {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        city: '',
        postalCode: '',
        country: '',
        province: '',
        phoneNumber: '',
      },
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.authService.user$.subscribe(res => {
      if (res) {
        this.userData = res;
        console.log(res);

      }
    });
  }



}
