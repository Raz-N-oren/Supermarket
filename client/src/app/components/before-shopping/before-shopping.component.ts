import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { CartsService } from 'src/app/services/carts.service';
import ICart from 'src/app/models/ICarts.model';
import IUser from 'src/app/models/IUser.model';
import { Subscription } from 'rxjs';
import ICartItems from 'src/app/models/ICartItems.model';

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
  cartItemsArray: ICartItems[];

  constructor(
    private _usersService: UsersService,
    public _ordersService: OrdersService,
    private _cartsService: CartsService,
    public _cartItemsService: CartItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    let userSubscription = this._usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })
    let cartItemsSubscription = this._cartItemsService.followCartItemsSubject().subscribe((cartItems) => {
      this.cartItemsArray = cartItems;
    });

    let cartSubscription = this._cartsService.followCurrentCart().subscribe((newCart) => {
      if (newCart?.isOpen) {
        this.cart = newCart;
      }
    })
    this.subscriptionArray.push(userSubscription, cartSubscription, cartItemsSubscription);
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
    if (!this.cart) {
      this._cartsService.openCart();
    }
    this.router.navigate(['/store']);
  }

  onGoToStoreClicked = () => {
    this.router.navigate(['/store']);
  }
}
