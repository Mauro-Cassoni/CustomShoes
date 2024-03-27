import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiShopService } from '../../../Services/api-shop.service';
import { IProduct } from '../../../Models/i-product';
import { CartService } from '../../../Services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent {

  constructor(
    private apiShopService: ApiShopService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
  ){}

  products: IProduct[] = [];

  id!: string | null;
  product: IProduct = {
    id: 0,
    img: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    size: 0,
    color: '',
    price: 0,
    onSale: false
  };

  ngOnInit(){

    this.loadProducts();

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.apiShopService.getById(Number(this.id)).subscribe(data => {
        this.product = data.obj;
      });
    });

  }

  loadProducts() {
    this.apiShopService.getAll().subscribe(data => {
      this.products = data.obj.content.filter(product => product.onSale === true);
    });
  }

  addToCart(event: MouseEvent, productId: number) {
    event.stopPropagation();
    const productToAdd = this.products.find(product => product.id === productId);
    if (productToAdd) {
      this.cartService.addToCart(productToAdd);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added to cart successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

}
