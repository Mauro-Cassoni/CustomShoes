import { Component } from '@angular/core';
import { IUser } from '../../../Models/auth/i-user';
import { AuthService } from '../../../Services/auth.service';
import Swal from 'sweetalert2';

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
      this.users = data.obj;
    })
  }

  promoteUserToAdmin(userId: number) {
    this.authService.promoteUserToAdmin(userId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Promote to ADMIN.',
        })
      }
    );
  }

  demoteAdminToUser(userId: number) {
    this.authService.demoteAdminToUser(userId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Downgraded to USER.',
        })
      }
    );
  }



}
