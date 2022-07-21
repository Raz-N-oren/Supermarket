import { CartsService } from './../services/carts.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { filter, map, Observable } from 'rxjs';
import IUser from '../models/IUser.model';
import { CartItemsService } from '../services/cart-items.service';
import { UsersService } from '../services/users.service';
import ICart from '../models/ICarts.model';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  private role: string;

  public constructor(
    private router: Router,
    public _cartItemsService: CartItemsService,
    private _messageService: MessageService,
    private _usersService: UsersService,
    private _cartsService: CartsService

  ) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser: IUser;
    this._usersService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    })

    //Deny access to admins.
    if (currentUser?.role == "admin") {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Unauthorized', detail: 'Admins are not allowed in here.' })
      this.router.navigate(['/landing-page/before-shopping']);
      return false;
    }

    //Deny access to users that didn't fill the cart.
    //Works with Observable<boolean> in order to update according the the cart-items.
    return this._cartItemsService.followCartItemsSubject().pipe(

      filter(newItems => newItems != null),
      map((newItems) => {
        if (newItems.length > 0) {
          return true;
        }
        else {
          this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Empty Cart', detail: `Your cart is empty. Please add products before payment.` })
          this.router.navigate(['/store']);
          return false;
        }
      }))
    }

}
