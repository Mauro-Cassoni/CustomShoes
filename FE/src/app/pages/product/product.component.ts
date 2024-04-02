import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { IProduct } from '../../Models/i-product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(
    private apiSvc: ApiShopService,
  ){}

  products: IProduct[] = [];
  open: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadProducts();
  }

  loadProducts() {
    this.apiSvc.getAll().subscribe(data => {
      this.products = data.obj.content;
    });
  }

  deleteProduct(id: number) {
    this.apiSvc.deleteById(id).subscribe(() => {
      this.loadProducts();
    });
  }

}
