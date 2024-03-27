import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private authSvc: AuthService,
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authSvc.isLoggedIn$.pipe(
      map((loggedIn: boolean) => {
        if (!loggedIn) {
          return this.router.createUrlTree(['/auth/login']);
        }
        return true;
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/auth/login']));
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

}
