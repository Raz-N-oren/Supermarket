import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';
import ICart from 'src/app/models/ICarts.model';
import IUser from 'src/app/models/IUser.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-before-shopping',
  templateUrl: './before-shopping.component.html',
  styleUrls: ['./before-shopping.component.css']
})
export class BeforeShoppingComponent implements OnInit {

  cart: ICart;
  currentUser: IUser;
  isLogin: boolean = true;

  subscriptionArray: Subscription[] = [];

  constructor(
    public _usersService: UsersService,
    public _ordersService: OrdersService,
    public _cartItemsService: CartItemsService,
    public _cartsService: CartsService,
    public router: Router
  ) { }

  ngOnInit(): void {

    let userSubscription = this._usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

    let cartSubscription = this._cartsService.followCurrentCart().subscribe((newCart) => {
      this.cart = newCart;
    })

    this.subscriptionArray.push(userSubscription, cartSubscription)
  }

  ngOnDestroy() {
    this.subscriptionArray.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onResumeShoppingClicked = () => {
    this.router.navigate(['/store']);
  }

  onStartShoppingClicked = () => {
    this._cartsService.openCart();
    this.router.navigate(['/store']);
  }

  onGoToStoreClicked = () => {
    this.router.navigate(['/store']);
  }

}
