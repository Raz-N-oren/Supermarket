import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import IUser from '../models/IUser.model';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _userService: UsersService,
    private _messageService: MessageService,
    private _router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let currentUser: IUser;
    this._userService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    })
    if (currentUser?.role != "admin") {
      this._messageService.add({key: 'appToast', severity:'error', summary: 'Access Denied.', detail: 'Unauthorized entry. Admins only!'})
      this._router.navigate(['//landing-page/before-shopping']);
      return false;
    }
    else {
      return true;
    }
  }
}
