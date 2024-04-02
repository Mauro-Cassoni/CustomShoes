import { LogGuardGuard } from './../../profile/log-guard.guard';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError, Observable } from 'rxjs';
import { IProductMsg } from '../../../Models/i-product-msg';
import { ApiShopService } from '../../../Services/api-shop.service';
import { IProduct } from '../../../Models/i-product';
import { IProductResponse } from '../../../Models/i-product-response';
import { IProductObj } from '../../../Models/i-product-obj';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  form!: FormGroup;
  loading!: boolean;
  somethingWrong!: boolean;
  errorMsg!: IProductMsg;
  msg!: IProductMsg;
  match: boolean = false
  categories: string[] = [];
  productResponse!: IProductResponse;
  productObj!: IProductObj;
  product: IProduct = {
    id: 0,
    img: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    size: '',
    color: '',
    price: 0,
    onSale: false
  };
  id!: string | null;
  file!: File

  constructor(
    private formBuilder: FormBuilder,
    private apiShopService: ApiShopService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.apiShopService.getById(Number(this.id)).subscribe(data => {
        this.product = data.obj;

        this.form.patchValue({
          img: this.product.img,
          name: this.product.name,
          brand: this.product.brand,
          category: this.product.category,
          description: this.product.description,
          size: this.product.size,
          color: this.product.color,
          price: this.product.price,
          onSale: this.product.onSale
        });
      });
    });

    this.form = this.formBuilder.group({

      img: this.formBuilder.control(null, []),
      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      brand: this.formBuilder.control(null, [Validators.minLength(2), Validators.maxLength(20)]),
      category: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(null, [Validators.minLength(2)]),
      size: this.formBuilder.control(null, [Validators.minLength(1)]),
      color: this.formBuilder.control(null, [Validators.minLength(2)]),
      price: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]),
      onSale: this.formBuilder.control(null, [])

    })
  }

  submit() {
    this.loading = true;

    this.product.img = this.form.value.img,
    this.product.name = this.form.value.name,
    this.product.brand = this.form.value.brand,
    this.product.category = this.form.value.category,
    this.product.description = this.form.value.description,
    this.product.size = this.form.value.size,
    this.product.color = this.form.value.color,
    this.product.price = this.form.value.price,
    this.product.onSale = this.form.value.onSale,

    this.form.value.price = Number(this.form.value.price);

    this.apiShopService.update(this.product)
      .pipe(tap(() => {
        this.loading = false
        this.router.navigate(['/product'])
      }), catchError(error => {
        this.somethingWrong = true;
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

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  setImg() {
    if (this.file) {
      this.apiShopService.uploadImg(Number(this.id), this.file)
        .pipe(
          tap(() => {
            Swal.fire({
              icon: 'success',
              title: 'Image uploaded successfully',
            });
          }),
          catchError(error => {
            Swal.fire({
              icon: 'error',
              title: 'Error loading image',
              text: error.message
            });
            throw error;
          })
        ).subscribe();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No file selected',
      });
    }
  }

}
