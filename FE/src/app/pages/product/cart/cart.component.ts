import { Component } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
import { IAuthData } from '../../../Models/auth/i-auth-data';
import { Role } from '../../../Enums/role';
import { UserType } from '../../../Enums/user-type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(
    public cartService: CartService,
    private authService : AuthService,
  ){}

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

  ngOnInit(){
    window.scrollTo(0, 0);
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
    this.cartService.getCartItems();
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    });
  }

  total(){
    let total =0;
    for (let i of this.cartService.getCartItems()){
      total += i.price;
    }
    return total;
  }

  businessTotal(){
    let total = this.total();
    let businessTotal = total - (total * 0.22);
    return businessTotal
  }

  removeAll(){
    this.cartService.clearCart();
    this.cartService.getCartItems();
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
  }

}
