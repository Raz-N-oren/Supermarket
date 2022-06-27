import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public _cartItemsService: CartItemsService,
    public _cartsService: CartsService
  ) { }

  ngOnInit(): void {
  }

  onDeleteCartItemFromCartClicked = (cartItemId: number) => {
    let cardId = this._cartsService.getCart().id;
    this._cartItemsService.removeFromCart(cartItemId,cardId);
  }

}
