import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICartItems from '../models/ICartItems.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public cartItemsArray: ICartItems[] = [];
  public baseUrl: string = 'http://localhost:3001/cart-items/';t

  constructor(private _http: HttpClient) { }

  public getCartItemsByCartId(cartId: number): void {
    this._http.get<ICartItems[]>(this.baseUrl + cartId)
      .subscribe((cartItems) => { this.cartItemsArray = cartItems },
        err => {
          console.log(err);
          alert("Cannot get cart items. ")
        });
  };

  public addCartItem(cartItem: ICartItems): void {
    this._http.post<ICartItems>(this.baseUrl, cartItem)
    .subscribe((cartItem) => {
      console.log("Cart item has been added. ", cartItem);
    },
      err => {
        console.log(err);
        alert("Cannot Add Cart item")
      }
    )
  }

  public updateCartItemQuantity = (cartItem) => {
    this._http.put(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItemsByCartId(cartItem.cartId);
    }, (e) => {
      alert("Cannot update cart item.");
      console.log(e);
    })
  }

  public removeFromCart(id: string): void {
    this._http.delete<ICartItems>(this.baseUrl + id)
      .subscribe((cartItem) => {
        console.log(cartItem);
        this.getCartItemsByCartId(cartItem.cartId);
      },
        err => {
          console.log(err);
          alert("Cannot Delete cart item.");
        })
  }

  public removeAllCartItems(cartId: number): void {
    this._http.delete<ICartItems>(this.baseUrl+`remove_all/` + cartId)
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
