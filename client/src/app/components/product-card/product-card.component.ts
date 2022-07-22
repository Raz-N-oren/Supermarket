import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import IProduct from 'src/app/models/IProduct.model';
import IUser from 'src/app/models/IUser.model';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  isModalOpen = false;
  productToAdd:IProduct;
  currentUser: IUser;
  subscription: Subscription;

  constructor(
    private _products: ProductsService,
    private _usersService: UsersService
  ) { }

  @Input()
  public product: IProduct;

  ngOnInit(): void {
    this.subscription = this._usersService.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToCartClicked=(productToAdd: IProduct) =>{
    this.isModalOpen =true;
    this.productToAdd = productToAdd;
  }

  onEditProductClicked=(productToEdit: IProduct)=>{
    this._products.setCurrentProduct(productToEdit);
  }
}
