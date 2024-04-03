import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderComponent } from './order/order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from '../product/new-product/new-product.component';
import { UsersComponent } from './users/users.component';
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent,
    EditAddressComponent,
    WishlistComponent,
    OrderComponent,
    InvoiceComponent,
    NewProductComponent,
    UsersComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProfileModule { }
