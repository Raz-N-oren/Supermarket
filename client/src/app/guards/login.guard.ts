import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private role: string = 'guest';

  public constructor(private router: Router) { }

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
    if (this.role && this.role != 'guest') {
      return true;
    }
    this.router.navigate(['/']);
    console.log("loginGuard");

    return false
  }

}
