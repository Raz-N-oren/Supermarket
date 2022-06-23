
import { Injectable } from '@angular/core';
import ICart from '../models/ICarts.model';
import { CartItemsService } from './cart-items.service';
import { CartsService } from './carts.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public firstName: string = 'Guest';
  public lastName: string = '';
  public city: string = '';
  public street: string = '';
  public role: string = 'guest';
  cart:ICart;

  constructor(
    public _productsService: ProductsService,
    public _ordersService: OrdersService,
    public _usersService: UsersService,
    public _cartsService: CartsService,
    public _cartItemsService: CartItemsService,
  ) {
    this._usersService.followCurrentUser().subscribe((newUser)=>{
      if(newUser){
        this._cartsService.getLastCart();
        this._ordersService.getLastPurchaseDate();
      }
      else{
        // this._cartsService.getLastCart(null);
        this._ordersService.lastPurchaseDate = null
      }
    })
    let userData: string = sessionStorage.getItem("userData");
    console.log(userData);

    if(userData){
      let currentUser = JSON.parse(userData);
      this._usersService.setCurrentUser(currentUser);
    }

    this._cartsService.followCurrentCart().subscribe((newCart)=>{
      if(newCart){
        this._cartItemsService.getCartItemsByCartId(newCart.id)
      }
      else{
        this._cartItemsService.cartItemsArray =[];
      }
    })
  }
}
