import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { IAddress } from '../../../Models/i-address';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { UserType } from '../../../Enums/user-type';
import { AddressService } from '../../../Services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.scss'
})
export class EditAddressComponent {

  form!: FormGroup;
  loading!: boolean;
  somethingWrong!: boolean;
  errorMsg!: IAddress;
  msg!: IAddress;
  match: boolean = false
  user!: IAuthData;
  userTypes = Object.values(UserType);


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private addressService: AddressService,
  ) { }

  ngOnInit() {

    this.authService.user$.subscribe(res => {
      if (res) this.user = res;

      this.addressService.getUserAddresses().subscribe(addresses => {
        if (addresses.length > 0) {
          this.form.patchValue({
            shippingAddress: addresses[0],
            registeredOfficeAddress: addresses[1],
            operationalHeadquartersAddress: addresses[2]
          });
        }
      });
    });

    this.form = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        street: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        province: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      }),

      registeredOfficeAddress: this.formBuilder.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        street: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        province: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      }),

      operationalHeadquartersAddress: this.formBuilder.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        street: ['', [Validators.required]],
        streetNumber: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        province: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      }),
    })

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.user.user.userType === 'BUSINESS') {
      const shippingAddressId = this.user.user.shippingAddress ? this.user.user.shippingAddress.id : null;
      const registeredOfficeAddressId = this.user.user.registeredOfficeAddress ? this.user.user.registeredOfficeAddress.id : null;
      const operationalHeadquartersAddressId = this.user.user.operationalHeadquartersAddress ? this.user.user.operationalHeadquartersAddress.id : null;

      if (shippingAddressId && registeredOfficeAddressId && operationalHeadquartersAddressId) {
        this.addressService.updateAddress(shippingAddressId, this.form.value.shippingAddress).subscribe();
        this.addressService.updateAddress(registeredOfficeAddressId, this.form.value.registeredOfficeAddress).subscribe();
        this.addressService.updateAddress(operationalHeadquartersAddressId, this.form.value.operationalHeadquartersAddress).subscribe();
      } else {

      }
    } else {
      this.addressService.createAddress(this.form.value).subscribe();
    }
  }



}
