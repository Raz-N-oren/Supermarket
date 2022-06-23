import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';
import IUser from 'src/app/models/IUser.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    currentUser: IUser;

  constructor(
    public _products: ProductsService,
    public _orders: OrdersService,
    public _users: UsersService,
    public _carts: CartsService,
    ) {
      this._users.followCurrentUser().subscribe((currentUser)=>{
        this.currentUser = currentUser;
      })
    }

  ngOnInit(): void {
    this._products.getAllProducts();
    this._orders.getAmountOfOrders();
  }

    handleStoreButton = () => {

    }

}
