import { ApiShopService } from '../../../Services/api-shop.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { IProductMsg } from '../../../Models/i-product-msg';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {

  form!: FormGroup;
  loading!: boolean;
  somethingWrong!: boolean;
  errorMsg!: IProductMsg;
  msg!: IProductMsg;
  match: boolean = false
  categories!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private apiShopService: ApiShopService,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({

      img: this.formBuilder.control(null, []),
      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      brand: this.formBuilder.control(null, [Validators.minLength(2), Validators.maxLength(20)]),
      category: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      size: this.formBuilder.control(null, [Validators.minLength(2)]),
      color: this.formBuilder.control(null, [Validators.minLength(2)]),
      price: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]),

    })
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;

      this.apiShopService.create(this.form.value)
        .pipe(
          tap((createdProduct) => {
            this.loading = false;
          }),
          catchError(error => {
            this.somethingWrong = true;
            console.log(error);
            throw error;
          })
        )
        .subscribe(data => {
          console.log(data);

          this.router.navigate(['/product/edit-product', data.obj.id]);
        });
    }
  }

  invalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.form.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Empty field'
        if (field.errors['pattern'] && fieldName === 'price') errorMsg = 'Incorrect format (es. 10.99)'
        if (field.errors['minlength']) errorMsg = 'Minimum length: 2 characters'
      }
    }
    return errorMsg
  }

  ngDoCheck() {
    this.errorMsg = {
      img: this.invalidMessages('img'),
      name: this.invalidMessages('name'),
      brand: this.invalidMessages('brand'),
      category: this.invalidMessages('category'),
      description: this.invalidMessages('description'),
      size: this.invalidMessages('size'),
      color: this.invalidMessages('color'),
      price: this.invalidMessages('price'),
    }

    this.msg = {
      img: '',
      name: '',
      brand: '',
      category: '',
      description: '',
      size: '',
      color: '',
      price: '',
    }

    if (this.errorMsg.img) {
      this.msg.img = this.errorMsg.img
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    }

    if (this.errorMsg.brand) {
      this.msg.brand = this.errorMsg.brand
    }

    if (this.errorMsg.category) {
      this.msg.category = this.errorMsg.category
    }

    if (this.errorMsg.description) {
      this.msg.description = this.errorMsg.description
    }

    if (this.errorMsg.size) {
      this.msg.size = this.errorMsg.size
    }

    if (this.errorMsg.color) {
      this.msg.color = this.errorMsg.color
    }

    if (this.errorMsg.price) {
      this.msg.price = this.errorMsg.price
    }

  }

  isValid(inputName: string) {
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

}
