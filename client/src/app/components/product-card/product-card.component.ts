import { Component, Input, OnInit } from '@angular/core';

import IProduct from 'src/app/models/IProduct.model';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  isModalOpen = false;
  productToAdd:IProduct;

  constructor(
    public _products: ProductsService,
  ) { }

  @Input()
  public product: IProduct;

  ngOnInit(): void {
  }

  onAddToCartClicked=(productToAdd: IProduct) =>{
    this.isModalOpen =true;
    this.productToAdd = productToAdd;
  }

}
