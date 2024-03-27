import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { IAuthData } from '../Models/auth/i-auth-data';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegisterData } from '../Models/auth/i-register-data';
import { IUser } from '../Models/auth/i-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = `${environment.URL}`
  jwtHelper: JwtHelperService = new JwtHelperService()
  authSubject = new BehaviorSubject<IAuthData | null>(null)
  user$: Observable<IAuthData | null> = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user))

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    this.restoreUser()
  }

  register(register: IRegisterData): Observable<IAuthData> {
    return this.http.post<IAuthData>(`${this.endpoint}/auth/register`, register)
  }

  update(userId: number, userData: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.endpoint}/users/${userId}`, userData)
  }

  login(loginData: IAuthData): Observable<IAuthData> {
    return this.http.post<IAuthData>(`${this.endpoint}/auth/login`, loginData)
      .pipe(tap(data => {
        this.authSubject.next(data)
        localStorage.setItem('authData', JSON.stringify(data))
        this.autoLogout(data.token)
      }
      ))
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('authData');
    this.router.navigate(['auth/login']);
  }

  autoLogout(jwt: string) {
    let expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    let expMs = expDate.getTime() - new Date().getTime()
    setTimeout(() => {
      this.logout()
    }, expMs)
  }

  restoreUser() {
    let userJson: string | null = localStorage.getItem('authData');
    if (!userJson) return;
    let accessData: IAuthData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.token)) return
    this.autoLogout(accessData.token)
    this.authSubject.next(accessData);
  }

  getUserId(): number | null {
    let authData = this.authSubject.getValue();
    return authData ? authData.user.id : null;
  }

}
