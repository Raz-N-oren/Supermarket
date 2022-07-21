import { IOrder } from './../../models/IOrder.model';
import { CartsService } from './../../services/carts.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import IUser from 'src/app/models/IUser.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  hide: boolean = true;
  currentUser: IUser;
  subscription: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    public _stateService: StateService,
    public _orderService: OrdersService,
    private _cartItemsService: CartItemsService,
    private _cartService: CartsService,
    private _usersService: UsersService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._orderService.busyDays = [];
    this._orderService.getBusyDays();

    this.orderForm = this.formBuilder.group({
      city: [this.currentUserValue.city, [Validators.required]],
      street: ["", [Validators.required, Validators.maxLength(60)]],
      shippingDate: [null, [Validators.required]],
      creditCard: [null, [Validators.required, Validators.pattern("^[0-9\-]+$")]]
    });

    this.subscription = this._usersService.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  orderForm: UntypedFormGroup;
  currentUserValue = this._usersService.getUser();
  currentDate: Date = new Date();

  onStreetInputDoubleClicked = () => {
    this.orderForm.controls['street'].setValue(this.currentUserValue.street);
  }

  onSubmitClicked = () => {
    let creditCard: string = this.orderForm.controls['creditCard'].value;
    let lastFourCreditCardDigits = creditCard.slice(creditCard.length - 4, creditCard.length);
    let orderRequest: IOrder = {
      cartId: this._cartService.getCart().id,
      finalPrice: this._cartItemsService.cartItemsTotalPrice,
      city: this.orderForm.controls['city'].value,
      street: this.orderForm.controls['street'].value,
      shippingDate: this.orderForm.controls['shippingDate'].value,
      paymentLastDigits: lastFourCreditCardDigits,
    }
    this._orderService.addNewOrder(orderRequest).subscribe((order) => {
      this._messageService.add({ key: 'order-toast', sticky: true, severity: 'success', summary: 'Your order has been Confirmed', detail: 'Download receipt?' });
    },
    err => {
      console.log(err);
      this._messageService.add({ key: 'error-toast', severity: 'error', summary: 'Error', detail: 'Failed to add new order.' });
    }
    )
  }

  onCloseToastClicked = () => {
    this._cartService.setCurrentCart(null);
    this._orderService.getLastPurchaseDate();
    this.router.navigate(['/landing-page/before-shopping']);
  }

  onGetReceiptClicked = () => {
    let cartId = this._cartService.getCart().id;
    this._orderService.getReceipt(cartId).subscribe(blob => {
      saveAs(blob, cartId + '.txt');
    },
    err => {
      console.log(err);
      this._messageService.add({ key: 'error-toast', severity: 'error', summary: 'Error', detail: 'Failed to get receipt.' });
    })
  }
}




