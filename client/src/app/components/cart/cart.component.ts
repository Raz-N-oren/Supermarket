import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ICartItems from 'src/app/models/ICartItems.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() isOrder: boolean;

  isModalOpen = false;
  cartItemToEdit: ICartItems;

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartsService: CartsService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  onClearCartItemsClicked = () => {
    let cartId = this._cartsService.getCart().id;
    this._cartItemsService.removeAllCartItems(cartId);
  }

  onDeleteCartItemFromCartClicked = (cartItemId: number) => {
    let cardId = this._cartsService.getCart().id;
    this._cartItemsService.removeFromCart(cartItemId, cardId);
  }

  onPaymentClicked = () => {
    this.router.navigate(['/order'])
  }

  onEditCartItemQuantityClicked = (cartItem: ICartItems) => {
    this.isModalOpen = true;
    this.cartItemToEdit = cartItem
  }

  onBackToStoreClicked = () => {
    this.router.navigate(['/store'])
  }

}
