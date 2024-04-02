import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { IAddress } from '../../../Models/i-address';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { UserType } from '../../../Enums/user-type';
import { AddressService } from '../../../Services/address.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  userData!: IAuthData;
  userTypes = Object.values(UserType);
  shippingA!:IAddress;
  officeA!:IAddress;
  operationalA!:IAddress;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private addressService: AddressService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        street: ['', Validators.required],
        streetNumber: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        province: ['', Validators.required],
        phoneNumber: ['']
      }),
      registeredOfficeAddress: this.formBuilder.group({
        name: [''],
        surname: [''],
        street: [''],
        streetNumber: [''],
        city: [''],
        postalCode: [''],
        country: [''],
        province: [''],
        phoneNumber: ['']
      }),
      operationalHeadquartersAddress: this.formBuilder.group({
        name: [''],
        surname: [''],
        street: [''],
        streetNumber: [''],
        city: [''],
        postalCode: [''],
        country: [''],
        province: [''],
        phoneNumber: ['']
      })
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.authService.user$.subscribe(res => {
      if (res) {
        this.userData = res;
      }
    });

  }

  populateShippingAddressForm() {
    this.form.get('shippingAddress')?.setValue(this.shippingA);
  }

  populateRegisteredOfficeAddressForm() {
    this.form.get('registeredOfficeAddress')?.setValue(this.officeA);
  }

  populateOperationalHeadquartersAddressForm() {
    this.form.get('operationalHeadquartersAddress')?.setValue(this.operationalA);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const shippingAddress = this.form.get('shippingAddress')?.value;
    const officeAddress = this.form.get('registeredOfficeAddress')?.value;
    const operationalAddress = this.form.get('operationalHeadquartersAddress')?.value;

    this.addressService.updateShippingAddress(shippingAddress).subscribe(() => {
      this.showSuccessAlertAndRedirect();
    });

    if (this.userData.user.userType === UserType.BUSINESS) {
      if (officeAddress) {
        this.addressService.updateRegisteredOfficeAddress(officeAddress).subscribe(() => {
          this.showSuccessAlertAndRedirect();
        });
      }

      if (operationalAddress) {
        this.addressService.updateOperationalHeadquartersAddress(operationalAddress).subscribe(() => {
          this.showSuccessAlertAndRedirect();
        });
      }
    } else {
      this.showSuccessAlertAndRedirect();
    }
  }

  showSuccessAlertAndRedirect() {
    Swal.fire({
      icon: 'success',
      title: 'Data saved successfully!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/account']);
    });
  }


}
