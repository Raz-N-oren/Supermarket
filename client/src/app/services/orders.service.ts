import { IOrder } from './../models/IOrder.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  busyDays: Date[] = [];
  amountOfOrders: number;
  lastPurchaseDate: Date;

  baseUrl: string = 'http://localhost:3001/orders/';

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) { }

  public getLastPurchaseDate(): void {
    this._http.get<any>(this.baseUrl + 'last_purchase')
      .subscribe((orderResponse) => {
        if (orderResponse.orderDate !== null) {
          this.lastPurchaseDate = new Date(orderResponse.orderDate);
        }
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get last purchase.' });

        });
  };

  public getBusyDays(): void {
    this._http.get<string[]>(this.baseUrl + 'busy_days').subscribe((ordersResponse) => {
      ordersResponse.forEach((busyDay) => {
        this.busyDays.push(new Date(busyDay));
      });

    }, (e) => {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get busy days.' });
      console.log(e);

    })
  }

  public getAmountOfOrders(): void {
    this._http.get<number>(this.baseUrl + 'amount_of_orders').subscribe((amountOfOrdersResponse) => { this.amountOfOrders = amountOfOrdersResponse },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Cannot get amount of orders' });

      })
  }

  public addNewOrder(order: IOrder): void {
    this._http.post<IOrder>(this.baseUrl, order)
      .subscribe((order) => {
      },
        err => {
          console.log(err);
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Failed to add new order.' });
        }
      )
  }

  public getReceipt = (cartId) => {
    return this._http.get(this.baseUrl + cartId, { responseType: "blob" });
  }

}
