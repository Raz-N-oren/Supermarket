import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-before-shopping',
  templateUrl: './before-shopping.component.html',
  styleUrls: ['./before-shopping.component.css']
})
export class BeforeShoppingComponent implements OnInit {

  // storeButtonLabel: string = "Start Shopping";

  constructor(
    public _usersService: UsersService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public _cartsService: CartsService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  onResumeShoppingClicked =() =>{
    this.router.navigate(['/store']);
  }

  onStartShoppingClicked =() =>{
    this._cartsService.openCart();
    this.router.navigate(['/store']);
  }

}
