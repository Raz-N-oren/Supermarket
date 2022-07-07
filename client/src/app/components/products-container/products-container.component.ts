import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  subscription: Subscription;


  constructor(
    private _products: ProductsService,
    private _categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {

    this.subscription =  this._categoriesService.followCategoriesArray().subscribe((categoriesArray) => {
      this.categoriesArray = categoriesArray;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectedCategoryClicked = (event: any) => {
    let selectedCategoryName = event.originalEvent.target.innerText;
    let selectedCategory = this.categoriesArray.find((category)=> {
      return category.name == selectedCategoryName
    })
    if(selectedCategory.name =="All"){
      this._products.getAllProducts();
    }
    else{
      this._products.getProductsByCategory(selectedCategory.id)
    }

  }


}
