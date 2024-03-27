import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';
import { Role } from '../../Enums/role';
import { UserType } from '../../Enums/user-type';
import { IAuthData } from '../../Models/auth/i-auth-data';

@Component({
  selector: '.app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

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
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    });
  }

  logout(){
    this.authService.logout();
  }

}
