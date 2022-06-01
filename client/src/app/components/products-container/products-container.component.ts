import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {

  public selectedCategoryId: string= '';
  constructor(
    public _products: ProductsService,
    public _categories: CategoriesService,
    public _carts: CartsService
  ) { }

  ngOnInit(): void {
    this._products.getAllProducts();
    this._categories.getAllCategories();
    this._carts.getLastCart();
  }

}
