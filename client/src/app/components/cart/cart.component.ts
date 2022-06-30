import { Component, OnInit } from '@angular/core';
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

  isModalOpen = false;
  cartItemToEdit: ICartItems;

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartsService: CartsService

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
    console.log("Payment Clicked");
  }

  onEditCartItemQuantityClicked = (cartItem: ICartItems) => {
    this.isModalOpen = true;
    this.cartItemToEdit = cartItem
  }

}
