import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';
import IUser from 'src/app/models/IUser.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import ICart from 'src/app/models/ICarts.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    currentUser: IUser;
    cart: ICart;

  constructor(
    public _products: ProductsService,
    public _orders: OrdersService,
    public _users: UsersService,
    public _carts: CartsService,
    public _cartItems: CartItemsService
    ) {
      this._users.followCurrentUser().subscribe((currentUser)=>{
        this.currentUser = currentUser;
      })

      this._carts.followCurrentCart().subscribe((newCart) => {
        this.cart = newCart;
      })
    }

  ngOnInit(): void {
  }

    handleStoreButton = () => {

    }

}
