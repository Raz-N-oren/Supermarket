import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ICart from '../models/ICarts.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private cart: ICart;
  public baseUrl: string = 'http://localhost:3001/carts/';
  private currentCartSubject = new BehaviorSubject<ICart>(null);

  constructor(private _http: HttpClient) { }

  public getLastCart = async (): Promise<void> => {
    this._http.get<ICart>(this.baseUrl)
      .subscribe((cart) => {
        if (cart) {
          this.cart = {
            id: cart.id,
            creationDate: cart.creationDate,
            isOpen: cart.isOpen
          };
          this.currentCartSubject.next(this.cart);
        }
      },
        err => {
          console.log(err);
          alert("Cannot get carts. ")
        });
  };

  public openCart(): void {
    this._http.post<ICart>(this.baseUrl, {})
      .subscribe((cartResponse) => {
        this.cart = {
          id: cartResponse.id,
          creationDate: cartResponse.creationDate,
          isOpen: cartResponse.isOpen
        }
        this.currentCartSubject.next(this.cart);
      },
        err => {
          console.log(err);
          alert("Cannot Open New Cart")
        }
      )
  }

  followCurrentCart = (): Observable<ICart> => {
    return this.currentCartSubject.asObservable();
  }

  setCurrentCart = (newCart: ICart) => {
    this.currentCartSubject.next(newCart);
  }

  getCart = (): ICart => {
    return this.currentCartSubject.value;
  }


}
