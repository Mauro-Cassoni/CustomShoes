import { Component } from '@angular/core';
import { IUser } from '../../../Models/auth/i-user';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(
    private authService: AuthService
    ) { }

  users: IUser[] = [];


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.authService.getAllUsers().subscribe(data => {
      console.log(data);

      this.users = data;
    })
  }

}
