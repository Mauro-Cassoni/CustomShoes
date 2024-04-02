import { Role } from './../../../Enums/role';
import { IAddress } from './../../../Models/i-address';
import { Component } from '@angular/core';
import { ApiShopService } from '../../../Services/api-shop.service';
import { AuthService } from '../../../Services/auth.service';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserType } from '../../../Enums/user-type';
import { IRegisterData } from '../../../Models/auth/i-register-data';
import Swal from 'sweetalert2';
import { Ipassword } from '../../../Models/ipassword';
import { IUser } from '../../../Models/auth/i-user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  form!: FormGroup;
  formPassword!: FormGroup;
  userTypes = Object.values(UserType);
  loading!: boolean;
  somethingWrong!: boolean;
  errorMsg!: IRegisterData;
  errorMsgPsw!: Ipassword;
  msgPsw!: Ipassword;
  msg!: IRegisterData;
  match: boolean = false
  user: IAuthData = {
    token: '',
    user: {
      id: 0,
      email: '',
      password: '',
      name: '',
      surname: '',
      phoneNumber: '',
      userType: UserType.CUSTOMER,
      wishlist: [],
      role: Role.USER,
      businessName: '',
      vatNumber: '',
      insertionDate: '',
      pec: '',
      sdi: '',
      invoices: [],
      shippingAddress: undefined,
      registeredOfficeAddress: undefined,
      operationalHeadquartersAddress: undefined
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    });

    this.formPassword = this.formBuilder.group({
      oldPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)]),
      newPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, this.passwordMatchValidator]),
    })

    this.form = this.formBuilder.group({
      userType: [this.user.user.userType, Validators.required],
      name: [this.user.user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]],
      surname: [this.user.user.surname, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]],
      email: [this.user.user.email, [Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],

      businessName: [this.user.user.businessName],
      vatNumber: [this.user.user.vatNumber, [Validators.minLength(9), Validators.maxLength(11)]],
      pec: [this.user.user.pec, [Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      sdi: [this.user.user.sdi, [Validators.minLength(7), Validators.maxLength(7)]],
    });

    this.form.get('userType')?.valueChanges.subscribe(userType => {
      if (userType === 'BUSINESS') {
        this.form.get('businessName')?.setValidators(Validators.required);
        this.form.get('vatNumber')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(11)]);
        this.form.get('pec')?.setValidators([Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]);
        this.form.get('sdi')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(7)]);
      } else {
        this.form.get('businessName')?.clearValidators();
        this.form.get('vatNumber')?.clearValidators();
        this.form.get('pec')?.clearValidators();
        this.form.get('sdi')?.clearValidators();
      }
      this.form.updateValueAndValidity();
    });
  }

  private updateValidators(userType: UserType) {
    if (userType === 'BUSINESS') {
      this.form.get('businessName')?.setValidators(Validators.required);
      this.form.get('vatNumber')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(11)]);
      this.form.get('pec')?.setValidators([Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]);
      this.form.get('sdi')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(7)]);
    } else {
      this.form.get('businessName')?.clearValidators();
      this.form.get('vatNumber')?.clearValidators();
      this.form.get('pec')?.clearValidators();
      this.form.get('sdi')?.clearValidators();
    }
    this.form.updateValueAndValidity();
  }

  passwordMatchValidator = (formControl: FormControl): ValidationErrors | null => {
    if (formControl.value != this.form?.get(`password`)?.value) {
      return {
        invalid: true,
        message: "Passwords don't match!"
      }
    }
    return null;
  }

  submit() {

    this.loading = true;
    this.form.value.name = this.form.value.name.charAt(0).toUpperCase() + this.form.value.name.slice(1).toLowerCase();
    this.form.value.surname = this.form.value.surname.charAt(0).toUpperCase() + this.form.value.surname.slice(1).toLowerCase();
    this.form.value.email = this.form.value.email.toLowerCase();

    let user2: IUser = this.form.value;
    user2.id = this.user.user.id;
    user2.email = this.user.user.email;
    user2.role = this.user.user.role;
    this.user.user = user2;

    this.authService.update(this.user)
      .pipe(tap(() => {
        this.loading = false
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your profile has been updated successfully.',
        }).then(() => {
          this.router.navigate(['/account']);
        });
      }),
        catchError(error => {
          this.somethingWrong = true;
          console.log(error);
          throw error;
        })
      )
      .subscribe();
  }

  invalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.form.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Empty field'
        if (field.errors['pattern'] && fieldName === 'email' || fieldName === 'pec') errorMsg = 'Incorrect email format'
        if (field.errors['minlength'] && fieldName === 'password' || fieldName === 'confirmPassword') errorMsg = 'Password: minimum 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least one number, at least one special character'
        if (field.errors['minlength'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Minimum length: 2 characters'
        if (field.errors['maxlength'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Maximum length: 15 characters'
        if (field.errors['pattern'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Only letters of the alphabet are allowed'
        if (field.errors['minlength'] && (fieldName === 'vatNumber')) errorMsg = 'Minimum length: 9 characters'
        if (field.errors['maxlength'] && (fieldName === 'vatNumber')) errorMsg = 'Minimum length: 11 characters'
        if (field.errors['minlength'] && (fieldName === 'sdi')) errorMsg = 'Must have 7 characters'
        if (field.errors['maxlength'] && (fieldName === 'sdi')) errorMsg = 'Must have 7 characters'
      }
    }
    return errorMsg
  }

  invalidMessagesPsw(fieldName: string): string {
    const field: AbstractControl | null = this.formPassword.get(fieldName)
    let errorMsgPsw: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsgPsw = 'Empty field'
        if (field.errors['minlength'] && fieldName === 'oldPassword' || fieldName === 'confirmPassword' || fieldName === 'newPassword') errorMsgPsw = 'Password: minimum 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least one number, at least one special character'
      }
    }
    return errorMsgPsw
  }

  ngDoCheck() {

    const userTypeControl = this.form.get('userType');
    if (userTypeControl?.value === 'BUSINESS') {
      this.form.get('businessName')?.setValidators(Validators.required);
      this.form.get('vatNumber')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(11)]);
      this.form.get('pec')?.setValidators([Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]);
      this.form.get('sdi')?.setValidators([Validators.required, Validators.minLength(7), Validators.maxLength(7)]);
    } else {
      this.form.get('businessName')?.clearValidators();
      this.form.get('vatNumber')?.clearValidators();
      this.form.get('pec')?.clearValidators();
      this.form.get('sdi')?.clearValidators();
    }

    this.form.updateValueAndValidity();

    this.errorMsg = {
      name: this.invalidMessages('name'),
      surname: this.invalidMessages('surname'),
      email: this.invalidMessages('email'),
      password: this.invalidMessages('password'),
      userType: this.invalidMessages('userType'),
      businessName: this.invalidMessages('businessName'),
      vatNumber: this.invalidMessages('vatNumber'),
      pec: this.invalidMessages('pec'),
      sdi: this.invalidMessages('sdi'),
    }

    this.errorMsgPsw = {
      oldPassword: this.invalidMessages('oldPassword'),
      newPassword: this.invalidMessages('newPassword'),
      confirmPassword: this.invalidMessages('confirmPassword'),
    }

    this.msg = {
      email: '',
      password: '',
      name: '',
      surname: '',
      userType: '',
      businessName: '',
      vatNumber: '',
      pec: '',
      sdi: '',
    }

    this.msgPsw = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    }

    if (this.errorMsg.surname) {
      this.msg.surname = this.errorMsg.surname
    }

    if (this.errorMsg.email) {
      this.msg.email = this.errorMsg.email
    }

    if (this.errorMsg.password) {
      this.msg.password = this.errorMsg.password
    }

    if (this.errorMsg.userType) {
      this.msg.userType = this.errorMsg.userType
    }

    if (this.errorMsg.businessName) {
      this.msg.businessName = this.errorMsg.businessName
    }

    if (this.errorMsg.vatNumber) {
      this.msg.vatNumber = this.errorMsg.vatNumber
    }

    if (this.errorMsg.pec) {
      this.msg.pec = this.errorMsg.pec
    }

    if (this.errorMsg.sdi) {
      this.msg.sdi = this.errorMsg.sdi
    }


    if (this.errorMsgPsw.oldPassword) {
      this.msgPsw.oldPassword = this.errorMsgPsw.oldPassword
    }

    if (this.errorMsgPsw.newPassword) {
      this.msgPsw.newPassword = this.errorMsgPsw.newPassword
    }

    if (this.errorMsgPsw.confirmPassword) {
      this.msgPsw.confirmPassword = this.errorMsgPsw.confirmPassword
    }

  }

  isValid(inputName: string) {
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  changePassword() {
    this.loading = true;

    delete this.form.value.confirmPassword;

    this.authService.changePassword(this.user.user.id, this.formPassword.value)
      .pipe(tap(() => {
        this.loading = false
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your password has been updated successfully.',
        }).then(() => {
          this.router.navigate(['/account']);
        });
      }),
        catchError(error => {
          this.somethingWrong = true;
          console.log(error);
          throw error;
        })
      )
      .subscribe();
  }

}
