import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import INewRegisteredUser from '../models/INewRegisteredUser.model';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse.model';
import UserLoginData from '../models/UserLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl : string ="http://localhost:3001/users/"

  constructor(private _http: HttpClient) { }

  public login(userLoginData: UserLoginData): Observable<SuccessfulLoginServerResponse>{
    return this._http.post<SuccessfulLoginServerResponse>(this.baseUrl+'login', userLoginData)
  }

  public addNewUser(user: object): void {
    this._http.post<INewRegisteredUser>(this.baseUrl, user)
      .subscribe((user) => {
        console.log("User has been added. ", user);
      },
        err => {
          console.log(err);
          alert("Cannot Add New user")
        }
      )
  }
}
