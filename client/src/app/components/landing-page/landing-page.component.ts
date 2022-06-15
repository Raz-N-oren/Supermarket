import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  storeButtonLabel: string = "Start Shopping";

  constructor(
    public _products: ProductsService,
    public _orders: OrdersService,
    public _users: UsersService
    ) { }

  ngOnInit(): void {
    this._products.getAllProducts();
    this._orders.getAmountOfOrders();
  }

    handleStoreButton = () => {
      
    }

}
