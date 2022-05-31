import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IUser from 'src/app/models/IUser.model';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';

  constructor(private usersService: UsersService, private router: Router,
    private stateService: StateService ) { }

  ngOnInit(): void {
  }

  onLoginClicked(): void {
    const observable = this.usersService.login({userName: this.userName, password: this.password});
    observable.subscribe(
      response => {
        let loggedInUser: IUser = {
          "token": response.token,
          "firstName": response.firstName,
          "lastName": response.lastName,
          "city": response.city,
          "street": response.street,
        }
        sessionStorage.setItem("userData", JSON.stringify(loggedInUser));
        this.stateService.firstName = response.firstName;
        this.stateService.lastName = response.lastName;
        this.router.navigate(['/shopping']);
      },
       error =>{
         alert("Error: " + error);
       }
    )
  }

}
