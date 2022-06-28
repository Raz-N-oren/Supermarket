import { Component, Input, OnInit } from '@angular/core';
import IProduct from 'src/app/models/IProduct.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  @Input() hide!: boolean;

  public selectedCategoryId: string = '';
  constructor(
    public _products: ProductsService,
    public _categories: CategoriesService,
    public _carts: CartsService,
    public _cartItems: CartItemsService
  ) { }

  ngOnInit(): void {
    this._products.getAllProducts();
    this._categories.getAllCategories();
  }


}
