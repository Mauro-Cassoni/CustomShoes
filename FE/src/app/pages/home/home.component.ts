import { CartService } from './../../Services/cart.service';
import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { IProduct } from '../../Models/i-product';
import Swal from 'sweetalert2';
import { Role } from '../../Enums/role';
import { UserType } from '../../Enums/user-type';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private apiShopService: ApiShopService,
    private cartService: CartService,
    private authService : AuthService,
  ){}

  products: IProduct[] = [];
  isLoggedIn$!:boolean
  user: IAuthData ={
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

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    });
    this.loadProducts();
  }

  loadProducts() {
    this.apiShopService.getAll().subscribe(data => {
      this.products = data.obj.content.filter(product => product.onSale === true);
    });
  }

  addToCart(event: MouseEvent, productId: number) {
    event.stopPropagation();
    const productToAdd = this.products.find(product => product.id === productId);
    if (productToAdd) {
      this.cartService.addToCart(productToAdd);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added to cart successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }


}
