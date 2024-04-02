import { WishlistComponent } from './wishlist/wishlist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './order/order.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NewProductComponent } from '../product/new-product/new-product.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    title: 'Account - CustomShoes'
  },
  {
    path: 'edit',
    component: EditComponent,
    title: 'Edit Account - CustomShoes'
  },
  {
    path: 'orders',
    component: OrderComponent,
    title: 'Orders - CustomShoes'
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Wishlist - CustomShoes'
  },
  {
    path: 'edit-address',
    component: EditAddressComponent,
    title: 'Edit Address - CustomShoes'
  },
  {
    path: 'invoices',
    component: InvoiceComponent,
    title: 'Invoices - CustomShoes'
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users - CustomShoes'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
