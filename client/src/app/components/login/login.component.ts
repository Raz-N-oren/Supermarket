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

  loginUserData: UserLoginData = {userEmail: "", password: ""};
  isLoginFail: boolean = false;
  userLoginForm: UntypedFormGroup;


  constructor(
    private _usersService: UsersService,
    private router: Router,
    private stateService: StateService,
    private formBuilder: UntypedFormBuilder,
    private _cartService: CartsService


     ) { }

     ngOnInit(): void {
      this.userLoginForm =this.formBuilder.group({
        userEmail: [this.loginUserData.userEmail, [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: [this.loginUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
      })

      combineLatest(this.userLoginForm.get('userEmail').valueChanges, this.userLoginForm.get('password').valueChanges)
      .subscribe(p=>this.isLoginFail = false);

    }

  onLoginClicked(): void {
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
          "role": decoded.role
        }
        console.log("Test Role:", loggedInUser);

        sessionStorage.setItem("userData", JSON.stringify(loggedInUser));
        this._usersService.setCurrentUser(loggedInUser);
        // this._usersService.currentUser = loggedInUser;
        // this.stateService.firstName = response.firstName;
        // this.stateService.lastName = response.lastName;
        // this.stateService.city = response.city;
        // this.stateService.street = response.street;
        // this.stateService.role = response.role ;


        // let userDataAsString = sessionStorage.getItem("userData");
        // let userData = JSON.parse(userDataAsString);
        // console.log(userData);
        this._cartService.cart = response.cart;
        console.log(this._cartService.cart)
        console.log("login response", response);

        this.router.navigate(['/landing-page/before-shopping']);
      },
       error =>{
         alert("Password is incorrect or user name doesn't exists");
         console.log("Login Error", error);

         this.isLoginFail = true;

       }
    )
  }

}
