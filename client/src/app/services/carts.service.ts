import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ICart from '../models/ICarts.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  public cart: ICart;
  public baseUrl: string = 'http://localhost:3001/carts/';
  private currentCartSubject = new BehaviorSubject<ICart>(null);

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

  followCurrentCart = (): Observable<ICart> =>{
    return this.currentCartSubject.asObservable();
  }

  setCurrentCart = (newCart: ICart) => {
    this.cart = newCart;
    this.currentCartSubject.next(newCart);
  }
}
