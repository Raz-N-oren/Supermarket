import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  private role: string;

  public constructor(
    private router: Router,
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
    if (this.role && this.role == 'guest') {
      return true;
    }
    this.router.navigate(['/landing-page/before-shopping']);
    if (this.role && this.role != 'guest') {
      return false
    }

    return false

  }

}
