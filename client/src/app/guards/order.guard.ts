import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartItemsService } from '../services/cart-items.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  private role: string;

  public constructor(
    private router: Router,
    public _cartItemsService: CartItemsService,
    private _messageService: MessageService

  ) { }

  canActivate(): boolean {
    let helper = new JwtHelperService();
    let userData: string = sessionStorage.getItem("userData");
    let currentUser = JSON.parse(userData);

    if (currentUser) {
      let decoded = helper.decodeToken(currentUser.token);
      this.role = decoded.role;
    }
    else {
      this.role = 'guest';
    }
    if (this.role && this.role == 'user' && this._cartItemsService.cartItemsArray.length > 0) {
      return true;
    }
    if (this.role && this.role != 'user') {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Access denied', detail: 'Only customers can access order page.' });
      return false
    }
    if (this.role && this.role == 'user' && this._cartItemsService.cartItemsArray.length == 0) {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Access denied', detail: "Your cart is empty. Please add products before payment." });
      return false
    }
    this.router.navigate(['/store']);
    console.log("orderGuard");

    return false

  }

}
