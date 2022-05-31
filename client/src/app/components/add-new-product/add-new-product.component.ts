
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import IProduct from 'src/app/models/IProduct.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  public product: IProduct;
  public newProductName: string;
  public newProductPrice: number;
  public selectedCategoryId: string = '';
  public newProductImgUrl: string;

  constructor(
    public _products: ProductsService,
    public _categories: CategoriesService
  ) { }

  ngOnInit(): void {
    this._categories.getAllCategories();  }

  public addNewProduct(): void {
    try {
      const productToSave: object = {
        name: this.newProductName,
        category_id: this.selectedCategoryId,
        price: this.newProductPrice,
        imgUrl: this.newProductImgUrl
      }
      // if(this.newMovieName == "" || this.newMovieLength == null || this.newMovieDate == undefined || this.selectedTheaterId === undefined){
      //   alert("Please Fill all Fields.")
      // }
      // else{
        this._products.addNewProduct(productToSave)
      // this.selectedTheaterId = "";
      // this.newMovieLength = null;
      // this.newMovieDate = new Date;
      // this.newMovieName = "";
      // }
    }
    catch (error) {
      console.log(error);
      alert("Cannot add new movie.")

    }
  }

}
