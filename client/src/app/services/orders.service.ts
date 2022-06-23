import { IOrder } from './../models/IOrder.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  busyDays: Date[] = [];
  amountOfOrders: number;
  lastPurchaseDate: Date;

  public baseUrl: string = 'http://localhost:3001/orders/';

  constructor(private _http: HttpClient) { }

  public getLastPurchaseDate(): void {
    this._http.get<any>(this.baseUrl + 'last_purchase')
      .subscribe((orderResponse) => {
        console.log(orderResponse);

        if(orderResponse.orderDate !== null){
        this.lastPurchaseDate = new Date(orderResponse.orderDate);
        console.log("lastPurchase",this.lastPurchaseDate);

      }},
        err => {
          console.log(err);
          alert("Cannot get last purchase. ")
        });
  };

  public getBusyDays(): void {
    this._http.get<string[]>(this.baseUrl + 'busy_days').subscribe((ordersResponse) => {
      ordersResponse.forEach((busyDay) => {
        this.busyDays.push(new Date(busyDay));
      });
      console.log(this.busyDays);

    }, (e) => {
      alert("Cannot get busy days. ")
      console.log(e);

    })
  }


  public getAmountOfOrders(): void {
    this._http.get<number>(this.baseUrl + 'amount_of_orders').subscribe((amountOfOrdersResponse) =>
    { this.amountOfOrders = amountOfOrdersResponse },
      err => {
        console.log(err);
        alert("Cannot get amount of orders")
      })
  }

  public addNewOrder(order: object): void {
    this._http.post<IOrder>(this.baseUrl, order)
      .subscribe((order) => {
        console.log("order has been added. ", order);
      },
        err => {
          console.log(err);
          alert("Cannot Add New order")
        }
      )
  }

  public getReceipt():void {
    this._http.get(this.baseUrl).subscribe((ordersResponse) => {

    }, (e) => {
      alert("Cannot get receipt.");
      console.log(e);

    })
  }

}
