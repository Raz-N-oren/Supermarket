import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';
import IUser from 'src/app/models/IUser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import ICart from 'src/app/models/ICarts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  currentUser: IUser;
  cart: ICart;
  subscriptionArray: Subscription[] = [];

  constructor(
    private _products: ProductsService,
    private _orders: OrdersService,
    private _users: UsersService,
    private _carts: CartsService,
    private _cartItems: CartItemsService
  ) { }

  ngOnInit(): void {
    let userSubscription = this._users.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })

    let cartSubscription = this._carts.followCurrentCart().subscribe((newCart) => {
      this.cart = newCart;
    })

    this.subscriptionArray.push(userSubscription, cartSubscription)
    console.log("Landing",this.cart);

  }

  ngOnDestroy() {
    this.subscriptionArray.forEach((sub) => {
      sub.unsubscribe();
    });
  }



}
