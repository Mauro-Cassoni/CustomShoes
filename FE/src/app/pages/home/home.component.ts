import { CartService } from './../../Services/cart.service';
import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { IProduct } from '../../Models/i-product';
import Swal from 'sweetalert2';
import { Role } from '../../Enums/role';
import { UserType } from '../../Enums/user-type';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { AuthService } from '../../Services/auth.service';
import { WishlistService } from '../../Services/wishlist.service';

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
    public wishService : WishlistService,
  ){}

  products: IProduct[] = [];
  wishlist: IProduct[] = [];
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
    window.scrollTo(0, 0);
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    });
    this.loadProducts();
    this.loadWishlist();
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

  addToWishlist(event: MouseEvent, userId: number, productId: number): void {
    event.stopPropagation();
    this.wishService.addToWishlist(userId, productId).subscribe(() => {
      const productToAdd = this.products.find(product => product.id === productId);
      if (productToAdd) {
        this.wishlist.push(productToAdd);
      }
    });
  }


  removeFromWishlist(event: MouseEvent, userId: number, productId: number): void {
    event.stopPropagation();
    this.wishService.removeFromWishlist(userId, productId).subscribe(() => {
      this.wishlist = this.wishlist.filter(product => product.id !== productId)
    });
  }

  loadWishlist() {
    this.wishService.getWishlist(this.user.user.id).subscribe(data => {
      this.wishlist = data.obj;
    });
  }


  isInWishlist(productId: number): boolean {
    return this.wishlist.some(product => product.id === productId);
  }


}
