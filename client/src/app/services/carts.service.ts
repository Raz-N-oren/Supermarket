import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ICart from '../models/ICarts.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  public cart: ICart;
  public baseUrl: string = 'http://localhost:3001/carts/';

  constructor(private _http: HttpClient) { }

  public getLastCart(): void {
    this._http.get<ICart>(this.baseUrl)
      .subscribe((cart) => { this.cart = cart},
        err => {
          console.log(err);
          alert("Cannot get carts. ")
        });
  };

  public openCart(): void {
    this._http.post<ICart>(this.baseUrl, {})
      .subscribe((cart) => {
        console.log("Cart has been Opened. ");
      },
        err => {
          console.log(err);
          alert("Cannot Open New Cart")
        }
      )
  }
}
