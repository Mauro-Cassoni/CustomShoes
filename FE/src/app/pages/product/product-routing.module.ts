import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AuthGuard } from '../profile/auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    title: 'New Product - CustomShoes',
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    title: 'Edit Product - CustomShoes',
    canActivate:[AuthGuard]
  },
  {
    path: 'detail-product/:id',
    component: DetailProductComponent,
    title: 'Detail Product - CustomShoes',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart - CustomShoes',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
