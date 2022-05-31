import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {

  public selectedCategoryId:string;
  constructor(
    public _products: ProductsService,
    public _categories: CategoriesService
  ) { }

  ngOnInit(): void {
    this._products.getAllProducts();
    this._categories.getAllCategories();
  }

}
