import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { combineLatest } from 'rxjs';
import IUser from 'src/app/models/IUser.model';
import UserLoginData from 'src/app/models/UserLoginData.model';
import { CartsService } from 'src/app/services/carts.service';
import { StateService } from 'src/app/services/state.service';
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


  constructor(
    private _usersService: UsersService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _cartService: CartsService


  ) { }

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      userEmail: [this.loginUserData.userEmail, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [this.loginUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    })

    combineLatest(this.userLoginForm.get('userEmail').valueChanges, this.userLoginForm.get('password').valueChanges)
      .subscribe(p => this.isLoginFail = false);

    this._usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

  }

  onLoginClicked = () => {
    this.loginUserData = this.userLoginForm.value;
    console.log(this.loginUserData);
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
          "userCart": response.userCart
        }
        console.log("Test Role:", loggedInUser);

        sessionStorage.setItem("userData", JSON.stringify(loggedInUser));
        this._usersService.setCurrentUser(loggedInUser);

        this._cartService.setCurrentCart(response.userCart);
        console.log("CART IN LOGIN",this._cartService.getCart());
        console.log("login response", response);

        this.router.navigate(['/landing-page/before-shopping']);
      },
      error => {
        alert("Password is incorrect or user name doesn't exists");
        console.log("Login Error", error);

        this.isLoginFail = true;

      }
    )
  }

}
