import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
      invoices: []
    }
  }
  userTypes = Object.values(UserType);
  shippingA!: IAddress;
  officeA!: IAddress;
  operationalA!: IAddress;


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
        name: ['', [this.checkBusinessandfill]],
        surname: ['', [this.checkBusinessandfill]],
        street: ['', [this.checkBusinessandfill]],
        streetNumber: ['', [this.checkBusinessandfill]],
        city: ['', [this.checkBusinessandfill]],
        postalCode: ['', [this.checkBusinessandfill]],
        country: ['', [this.checkBusinessandfill]],
        province: ['', [this.checkBusinessandfill]],
        phoneNumber: ['']
      }),
      operationalHeadquartersAddress: this.formBuilder.group({
        name: ['', [this.checkBusinessandfill]],
        surname: ['', [this.checkBusinessandfill]],
        street: ['', [this.checkBusinessandfill]],
        streetNumber: ['', [this.checkBusinessandfill]],
        city: ['', [this.checkBusinessandfill]],
        postalCode: ['', [this.checkBusinessandfill]],
        country: ['', [this.checkBusinessandfill]],
        province: ['', [this.checkBusinessandfill]],
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

  checkBusinessandfill = (formC: FormControl): ValidationErrors | null => {
    if (this.userData.user.userType === UserType.BUSINESS && formC.value == "") {
      return {
        invalid: true,
        message: "Please enter all business data"
      };
    }
    return null
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
      console.log("io sono invalido cazzo");

      return;
    }

    const shippingAddress = this.form.get('shippingAddress')?.value;
    const officeAddress = this.form.get('registeredOfficeAddress')?.value;
    const operationalAddress = this.form.get('operationalHeadquartersAddress')?.value;

    this.addressService.createShippingAddress(shippingAddress).subscribe(data => {
      this.userData.user.shippingAddress = data.obj;

      if (this.userData.user.userType === UserType.BUSINESS) {

        this.addressService.createRegisteredOfficeAddress(officeAddress).subscribe(data => {
          this.userData.user.registeredOfficeAddress = data.obj;
          this.addressService.createOperationalHeadquartersAddress(operationalAddress).subscribe(data => {
            this.userData.user.operationalHeadquartersAddress = data.obj;
            this.authService.update(this.userData).subscribe(()=> {
              this.showSuccessAlertAndRedirect()
            })
          });
        });
      } else {
        this.authService.update(this.userData).subscribe(()=> {
          this.showSuccessAlertAndRedirect()
        })
      }
    });

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
