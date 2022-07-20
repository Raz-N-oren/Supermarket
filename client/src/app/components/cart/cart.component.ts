import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Subscription } from 'rxjs';
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

  cartItemsArray: ICartItems[];
  subscription: Subscription;
  searchValue: string;
  isModalOpen = false;
  cartItemToEdit: ICartItems;
  @ViewChild("dv") dataView: DataView;

  constructor(
    public _cartItemsService: CartItemsService,
    private _cartsService: CartsService,
    private router: Router,
    private messageService: MessageService
      ) { }

  ngOnInit(): void {
    this.subscription= this._cartItemsService.followCartItemsSubject().subscribe((cartItems) => {
      this.cartItemsArray = cartItems;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onShowConfirmClicked() {
    this.messageService.clear();
    this.messageService.add({ key: 'cc', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirmClicked() {
    this.messageService.clear('cc');
    this.onClearCartItemsClicked();
  }

  onRejectClicked() {
    this.messageService.clear('cc');
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

  onSearchChange = (searchInputValue: string) => {
    this.dataView.filter(searchInputValue);
    if(this.isOrder){
      this.searchValue = searchInputValue
    }
  }

}
