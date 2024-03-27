import { UserType } from './../../../Enums/user-type';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { IRegisterData } from '../../../Models/auth/i-register-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form! : FormGroup;
  userTypes : UserType[] = Object.values(UserType);
  loading! : boolean;
  somethingWrong! : boolean;
  errorMsg!:IRegisterData;
  msg!:IRegisterData;
  match: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userType: ['CUSTOMER', Validators.required],
      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]),
      surname: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]),
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, this.passwordMatchValidator]),


      businessName: this.formBuilder.control(null),
      vatNumber: this.formBuilder.control(null, [Validators.minLength(9), Validators.maxLength(11)]),
      pec: this.formBuilder.control(null, [Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      sdi: this.formBuilder.control(null, [Validators.minLength(7), Validators.maxLength(7)]),
    })
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

  submit(){
    this.loading=true;
    this.form.value.name= this.form.value.name.charAt(0).toUpperCase()+this.form.value.name.slice(1).toLowerCase();
    this.form.value.surname= this.form.value.surname.charAt(0).toUpperCase()+this.form.value.surname.slice(1).toLowerCase();
    this.form.value.email= this.form.value.email.toLowerCase();

    delete this.form.value.confirmPassword;
    if(this.form.value.userType==='BUSINESS'){
      this.form.value.pec= this.form.value.pec.toLowerCase();
    }

    this.authService.register(this.form.value)
    .pipe(tap(()=>{
      this.loading=false
      this.router.navigate(['auth/login'])
    }),catchError(error=>{
      this.somethingWrong=true;
      console.log(error);

      throw error;
    })).subscribe();
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

  ngDoCheck(){

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

    if(this.form.controls["password"].value === this.form.controls["confirmPassword"].value && this.form.controls["confirmPassword"].dirty){
      this.match = true
    }else{
      this.match = false
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

  }

  isValid(inputName:string){
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName:string){
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

}
