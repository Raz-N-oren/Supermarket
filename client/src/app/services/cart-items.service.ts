import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import ICartItems from '../models/ICartItems.model';
import { IServerCartItem } from '../models/IServerCartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public cartItemsTotalPrice: number;
  public baseUrl: string = 'http://localhost:3001/cart-items/';
  private cartItemsArray: ICartItems[];
  private cartItemsSubject = new BehaviorSubject<ICartItems[]>(null);

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) { }

  public getCartItemsByCartId(cartId: number): void {
    this._http.get<ICartItems[]>(this.baseUrl + cartId)
      .subscribe((cartItems) => {
        this.cartItemsArray = cartItems;
        this.cartItemsTotalPrice = null;
        for (let cartItem of cartItems) {
          this.cartItemsTotalPrice += cartItem.productPrice * cartItem.quantity;
        }
        this.cartItemsSubject.next(this.cartItemsArray);
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get cart items.' });
        });
  };

  public addCartItem(cartItem: IServerCartItem): void {
    this._http.post<ICartItems>(this.baseUrl, cartItem)
      .subscribe((cartItemResponse) => {
        this.getCartItemsByCartId(cartItem.cartId);
        this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: 'The Product has been added to cart.' });
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to add product to cart.' });

        }
      )
  }

  public updateCartItemQuantity = (cartItem) => {
    this._http.put(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItemsByCartId(cartItem.cartId);
      this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: "The Product's quantity has been updated." });
    }, (e) => {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot update cart item quantity.' });

      console.log(e);
    })
  }

  public removeFromCart(cartItemId, cartId): void {
    this._http.delete(this.baseUrl + cartItemId)
      .subscribe((cartItem) => {
        this.getCartItemsByCartId(cartId);
        this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: "The product has been deleted." });
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot Delete product from cart.' });
        })
  }

  public removeAllCartItems(cartId: number): void {
    this._http.delete<ICartItems>(this.baseUrl + `remove_all/` + cartId)
      .subscribe((cartItem) => {
        this.getCartItemsByCartId(cartId);
        this._messageService.add({ key: 'appToast-right', severity: 'success', summary: 'Success', detail: "Your cart has been cleared." });
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Your Cart Cannot be cleared.' });
        })
  }

  followCartItemsSubject = () : Observable<ICartItems[]> => {
    return this.cartItemsSubject.asObservable();
  }

  setCartItems = (cartItems: ICartItems[]) => {
    this.cartItemsSubject.next(cartItems);
  }
}
