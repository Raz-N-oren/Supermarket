import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {

  constructor(
    public _products: ProductsService
  ) { }

  ngOnInit(): void {
    this._products.getAllProducts();
  }

}
