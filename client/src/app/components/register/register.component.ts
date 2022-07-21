import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  items: MenuItem[];

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.items = [{
      label: 'First Step',
      routerLink: '/landing-page/register/step-one'
    },
    {
      label: 'Second Step',
      routerLink: '/landing-page/register/step-two'
    },
    ];
  }

  ngOnDestroy(): void {
    this._usersService.userRegisterData = {
        userId: "",
        userEmail: "",
        firstName: "",
        lastName: "",
        password: "",
        city: "",
        street: ""
    }
    sessionStorage.removeItem("register");
  }

}
