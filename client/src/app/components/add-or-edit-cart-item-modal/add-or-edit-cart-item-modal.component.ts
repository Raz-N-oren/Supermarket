import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import ICartItems from 'src/app/models/ICartItems.model';
import ICart from 'src/app/models/ICarts.model';
import IProduct from 'src/app/models/IProduct.model';
import { IServerCartItem } from 'src/app/models/IServerCartItem.model';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-add-or-edit-cart-item-modal',
  templateUrl: './add-or-edit-cart-item-modal.component.html',
  styleUrls: ['./add-or-edit-cart-item-modal.component.css']
})
export class AddOrEditCartItemModalComponent implements OnInit {

  currentCart: ICart;
  isEdit: boolean = false;
  serverCartItem: IServerCartItem;
  subscriptionArray: Subscription[] = [];
  cartItemsArray: ICartItems[];

  @Input() isModalOpen: boolean = false;
  @Output() isModalOpenChange = new EventEmitter()
  @Input() productToAdd: IProduct;
  @Input() cartItemInModal: ICartItems;
  @Input() amountToAdd = 0;

  constructor(
    private _cartItemsService: CartItemsService,
    private _CartsService: CartsService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    let cartSubscription = this._CartsService.followCurrentCart().subscribe(newCart => {
      this.currentCart = newCart
    })

    let cartItemSubscription= this._cartItemsService.followCartItemsSubject().subscribe((cartItems) => {
      this.cartItemsArray = cartItems;
    });

    if (this.cartItemInModal) {
      this.amountToAdd = this.cartItemInModal.quantity;
      this.isEdit = true;
    }
    if (this.productToAdd) {
      this.cartItemInModal = this.cartItemsArray.find((cartItem) => { return cartItem.productId == +this.productToAdd.id });
      if (!this.cartItemInModal) {
        this.convertProductToCartItem();
      }
      else {
        this.amountToAdd = this.cartItemInModal.quantity;
        this.isEdit = true;
      }
    }
    this.subscriptionArray.push(cartSubscription, cartItemSubscription)
  }
  ngOnDestroy() {
    this.subscriptionArray.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onHideModalClicked() {
    this.isModalOpen = false;
    this.isModalOpenChange.emit(this.isModalOpen)
  }

  onAddToCartClicked() {
    this.serverCartItem = {
      id: this.cartItemInModal.id,
      cartId: this.currentCart.id,
      quantity: this.amountToAdd,
      productId: this.cartItemInModal.productId
    }
    if(this.serverCartItem.quantity < 0 || this.serverCartItem.quantity > 20){
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Quantity must be between 1-20' });
    }
    else{
    if (this.isEdit) {
      if (this.serverCartItem.quantity == 0) {
        this._cartItemsService.removeFromCart(this.serverCartItem.id, this.currentCart.id);
      }
      else {
        this._cartItemsService.updateCartItemQuantity(this.serverCartItem);
      }
    }
    else {
      if (this.serverCartItem.quantity == 0) {
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'No amount was chosen.' });
      }
      else {
        this._cartItemsService.addCartItem(this.serverCartItem);
      }
    }
  }
    this.onHideModalClicked();

  }

  onMinusButtonClicked() {
    if (this.amountToAdd <= 0) {
      this.amountToAdd = 0;
    }
    else if (this.amountToAdd > 20) {
      this.amountToAdd = 20;
    }
    else {
      this.amountToAdd--;
    }
  }

  onPlusButtonClicked() {
    if (this.amountToAdd < 0) {
      this.amountToAdd = 0;
    }
    else if (this.amountToAdd >= 20) {
      this.amountToAdd = 20;
    }
    else {
      this.amountToAdd++;
    }
  }

  convertProductToCartItem = () => {
    this.cartItemInModal = {
      id: null,
      productId: +this.productToAdd.id,
      productName: this.productToAdd.name,
      productPrice: +this.productToAdd.price,
      quantity: 0,
      productImage: this.productToAdd.imgUrl
    }
  }

}
