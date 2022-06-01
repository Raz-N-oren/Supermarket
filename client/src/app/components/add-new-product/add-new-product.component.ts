
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
    this._categories.getAllCategories();
  }

  public addNewProduct(): void {
    try {
      const productToSave: object = {
        name: this.newProductName,
        categoryId: +this.selectedCategoryId,
        price: this.newProductPrice,
        imgUrl: this.newProductImgUrl
      }
      if (this.newProductName == "" || this.selectedCategoryId == null || this.newProductPrice == null || this.newProductImgUrl == "") {
        alert("Please Fill all Fields.")
      }
      else {
        this._products.addNewProduct(productToSave)
        this.selectedCategoryId = "";
        this.newProductPrice = null;
        this.newProductImgUrl = '';
        this.newProductName = "";
        alert("Product has been successfully added")
      }
    }
    catch (error) {
      console.log(error);
      alert("Cannot add new movie.")

    }
  }

}
