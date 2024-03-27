import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './pages/profile/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGuardGuard } from './pages/profile/log-guard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LogGuardGuard],
    canActivateChild: [LogGuardGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
