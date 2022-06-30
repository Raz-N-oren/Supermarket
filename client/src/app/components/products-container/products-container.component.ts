import { Component, Input, OnInit } from '@angular/core';
import ICategories from 'src/app/models/ICategories.model';
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
  categoriesArray: ICategories[];


  constructor(
    private _products: ProductsService,
    private _categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this._categoriesService.getAllCategories();

    this._categoriesService.followCategoriesArray().subscribe((categoriesArray)=>{
      this.categoriesArray = categoriesArray;
      console.log("Categories in products",this.categoriesArray);
    });



  }


}
