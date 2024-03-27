import { Router } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginData } from '../../../Models/auth/i-login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder,
    private router: Router,
  ){}

  form! : FormGroup;
  errorMsg!: ILoginData;
  msg!: ILoginData;
  isLoggedIn$!:boolean

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: this.formBuilder.control(null, [Validators.required])
    })
  }

  invalidMessages(fieldName: string): string {

    const field: AbstractControl | null = this.form.get(fieldName);
    let errorMsg: string = ''
    if (field) {

      if (field.errors) {
        if (field.errors['pattern'] && fieldName === 'email') errorMsg = 'Incorrect email format'
        if (field.errors['required']) errorMsg = 'Empty field';
      }
    }
    return errorMsg;
  }

  ngDoCheck() {

    this.errorMsg = {
      email: this.invalidMessages('email'),
      password: this.invalidMessages('password')
    }

    this.msg = {
      email: '',
      password: ''
    }

    if (this.errorMsg.email) {
      this.msg.email = this.errorMsg.email
    }

    if (this.errorMsg.password) {
      this.msg.password = this.errorMsg.password
    }
  }

  isValid(inputName: string) {
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  login(){
    this.authService.login(this.form.value).subscribe(data =>{
      this.authService.isLoggedIn$.subscribe(data => {})
      this.router.navigate(['../../account'])
    })
  }

}
