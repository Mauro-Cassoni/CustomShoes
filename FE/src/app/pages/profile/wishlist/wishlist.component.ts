import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Role } from '../../../Enums/role';
import { UserType } from '../../../Enums/user-type';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { IProduct } from '../../../Models/i-product';
import { AuthService } from '../../../Services/auth.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  constructor(
    private cartService: CartService,
    private authService : AuthService,
    private wishService: WishlistService,
  ){
    this.wishlist = [];
  }

  wishlist: IProduct[] = [];
  isLoggedIn$!:boolean
  userData: IAuthData ={
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
      if (res) {
        this.userData = res;
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.wishService.getWishlist(this.userData.user.id).subscribe(data => {
      this.wishlist = data.obj;
    });
  }

  addToCart(event: MouseEvent, productId: number) {
    event.stopPropagation();
    const productToAdd = this.wishlist.find(product => product.id === productId);
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

  removeFromWishlist(event: MouseEvent, userId: number, productId: number): void {
    event.stopPropagation();
    this.wishService.removeFromWishlist(userId, productId).subscribe(() => {
      this.wishlist = this.wishlist.filter(product => product.id !== productId);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product removed from wishlist successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    });
  }

}
