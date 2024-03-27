import { ApiShopService } from './../../Services/api-shop.service';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IAuthData } from '../../Models/auth/i-auth-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user!: IAuthData;

  constructor(
    private authService : AuthService,
    private apiShopService : ApiShopService,
  ){}

  ngOnInit(){
    this.authService.user$.subscribe(res => {
      if (res) this.user = res;
    })
  }

}
