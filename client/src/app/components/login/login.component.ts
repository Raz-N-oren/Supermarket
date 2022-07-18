import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { combineLatest, Subscription } from 'rxjs';
import IUser from 'src/app/models/IUser.model';
import UserLoginData from 'src/app/models/UserLoginData.model';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: UserLoginData = { userEmail: "", password: "" };
  isLoginFail: boolean = false;
  userLoginForm: UntypedFormGroup;
  currentUser: IUser;
  subscription: Subscription;

  constructor(
    private _usersService: UsersService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _cartService: CartsService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      userEmail: [this.loginUserData.userEmail, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.loginUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })

    combineLatest(this.userLoginForm.get('userEmail').valueChanges, this.userLoginForm.get('password').valueChanges)
      .subscribe(p => this.isLoginFail = false);

    this.subscription = this._usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLoginClicked = () => {
    this.loginUserData = this.userLoginForm.value;
    const observable = this._usersService.login(this.loginUserData);
    observable.subscribe(
      response => {
        let helper = new JwtHelperService();
        let decoded = helper.decodeToken(response.token);
        let loggedInUser: IUser = {
          "token": response.token,
          "firstName": response.firstName,
          "lastName": response.lastName,
          "city": response.city,
          "street": response.street,
          "role": decoded.role,
        }

        sessionStorage.setItem("userData", JSON.stringify(loggedInUser));
        this._usersService.setCurrentUser(loggedInUser);
        if(response.userCart && response.userCart.isOpen){
        this._cartService.setCurrentCart(response.userCart);
        }

        this.router.navigate(['/landing-page/before-shopping']);
      },
      error => {
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Invalid user data', detail: "Password is incorrect or user name doesn't exists" });

        console.log("Login Error", error);

        this.isLoginFail = true;

      }
    )
  }
}
