import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import ICategories from 'src/app/models/ICategories.model';
import IProduct from 'src/app/models/IProduct.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.css']
})
export class AddOrEditProductComponent implements OnInit {
  currentProduct: IProduct;
  isEdit: boolean;
  categoriesArray: ICategories[];
  productForm: UntypedFormGroup;
  subscriptionArray: Subscription[] = [];

  constructor(
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService,
    public formBuilder: UntypedFormBuilder,

  ) {
  }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(18)]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.max(10000), Validators.min(0)]],
      imgUrl: [null, [Validators.required, Validators.maxLength(350)]],
    })

    let categoriesSubscription = this._categoriesService.followCategoriesArray().subscribe((categoriesArray) => {
      this.categoriesArray = categoriesArray.slice(1);
    });
    let productsSubscription = this._productsService.followCurrentProduct().subscribe(newProduct => {
      this.productForm.reset();
      this.currentProduct = newProduct;
      if (this.currentProduct !== null) {
        this.isEdit = true;
        this.productForm.setValue({
          name: this.currentProduct.name,
          categoryId: this.currentProduct.categoryId,
          price: this.currentProduct.price,
          imgUrl: this.currentProduct.imgUrl,
        })
      }
    })
    this.subscriptionArray.push(categoriesSubscription,productsSubscription)
  }

  ngOnDestroy() {
    this.subscriptionArray.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onSubmitClicked = () => {
    let productToSave: IProduct = {
      id: this.currentProduct?.id,
      name: this.productForm.controls['name'].value,
      categoryId: this.productForm.controls['categoryId'].value,
      price: this.productForm.controls['price'].value,
      imgUrl: this.productForm.controls['imgUrl'].value,
    }
    if (this.isEdit) {
      this._productsService.editProduct(productToSave);
    }
    else {
      this._productsService.addNewProduct(productToSave);
    }
    this.isEdit = null;
    this.productForm.reset();
  }

  onResetFormClicked = () => {
    this.currentProduct = null;
    this.isEdit = false;
    this.productForm.reset();

  }

}
