import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICartItems from '../models/ICartItems.model';
import { IServerCartItem } from '../models/IServerCartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public cartItemsArray: ICartItems[] = [];
  public cartItemsTotalPrice: number;
  public baseUrl: string = 'http://localhost:3001/cart-items/';

  constructor(private _http: HttpClient) { }

  public getCartItemsByCartId(cartId: number): void {
    this._http.get<ICartItems[]>(this.baseUrl + cartId)
      .subscribe((cartItems) => {
        this.cartItemsArray = cartItems;
        this.cartItemsTotalPrice = null;
        for (let cartItem of cartItems) {
          this.cartItemsTotalPrice += cartItem.productPrice* cartItem.quantity;
        }

      },
        err => {
          console.log(err);
          alert("Cannot get cart items. ")
        });
  };

  public addCartItem(cartItem: IServerCartItem): void {
    this._http.post<ICartItems>(this.baseUrl, cartItem)
      .subscribe((cartItemResponse) => {
        console.log("Cart item has been added. ", cartItemResponse),
        this.getCartItemsByCartId(cartItem.cartId)
      },
        err => {
          console.log(err);
          alert("Cannot Add Cart item")
        }
      )
  }

  public updateCartItemQuantity = (cartItem) => {
    this._http.put(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      console.log(cartItemsResponse);
      this.getCartItemsByCartId(cartItem.cartId);
    }, (e) => {
      alert("Cannot update cart item.");
      console.log(e);
    })
  }

  public removeFromCart(cartItemId, cartId): void {
    this._http.delete(this.baseUrl + cartItemId)
      .subscribe((cartItem) => {
        console.log(cartItem);
        this.getCartItemsByCartId(cartId)
      },
        err => {
          console.log(err);
          alert("Cannot Delete cart item.");
        })
  }

  public removeAllCartItems(cartId: number): void {
    this._http.delete<ICartItems>(this.baseUrl + `remove_all/` + cartId)
      .subscribe((cartItem) => {
        console.log(cartItem);
        this.getCartItemsByCartId(cartId);
      },
        err => {
          console.log(err);
          alert("Cannot Delete all cart items.");
        })
  }
}
