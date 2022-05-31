import { Component, OnInit } from '@angular/core';
import INewRegisteredUser from 'src/app/models/INewRegisteredUser.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newRegisteredUser: INewRegisteredUser;
  public userId: number;
  public userName: string;
  public userFirstName: string;
  public userLastName: string;
  public userPassword: string;
  public userCity: string
  public userStreet: string;


  constructor(
    public _user: UsersService,
  ) { }

  ngOnInit(): void {
  }

  public addNewUser(): void {
    try {
      const newRegisteredUser: object = {
        id: +this.userId,
        userName: this.userName,
        firstName: this.userFirstName,
        lastName: this.userLastName,
        password: this.userPassword,
        city: this.userCity,
        street: this.userStreet
      }
      console.log(newRegisteredUser);
      if(this.userId == null || this.userName == "" || this.userFirstName == ""
      || this.userLastName == "" || this.userPassword == "" || this.userCity == "" || this.userStreet == ""){
        alert("Please Fill all Fields.")
      }
      else{
      this._user.addNewUser(newRegisteredUser);
      this.userId = null;
      this.userName = "";
      this.userFirstName= "";
      this.userLastName= "";
      this.userPassword= "";
      this.userCity= "";
      this.userStreet= "";
      alert("User has been Registered.")
      }
    }
    catch (error) {

      console.log(error);
      alert("Cannot add new user.")

    }
  }
}
