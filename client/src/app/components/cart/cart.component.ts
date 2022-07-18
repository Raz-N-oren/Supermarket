import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import ICartItems from 'src/app/models/ICartItems.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';

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
    private _cartItemsService: CartItemsService,
    private _cartsService: CartsService,
    private router: Router,
    private messageService: MessageService
      ) { }

  ngOnInit(): void {
  }

  onShowConfirmClicked() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirmClicked() {
    this.messageService.clear('c');
    this.onClearCartItemsClicked();
  }

  onRejectClicked() {
    this.messageService.clear('c');
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
