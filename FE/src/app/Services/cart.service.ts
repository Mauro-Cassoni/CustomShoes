import { Injectable } from '@angular/core';
import { IProduct } from '../Models/i-product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.cartItems = this.getCartItemsFromLocalStorage();
  }

  private cartItems: IProduct[];
  private cartKey = 'cart';

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.saveCartItemsToLocalStorage();
    }
  }

  addToCart(product: IProduct) {
    this.cartItems.push(product);
    this.saveCartItemsToLocalStorage();
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cartItems = [];
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Cart emptied correctly.',
      timer: 2000,
      showConfirmButton: false
    });
  }

  private saveCartItemsToLocalStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  private getCartItemsFromLocalStorage(): IProduct[] {
    const storedCart = localStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
