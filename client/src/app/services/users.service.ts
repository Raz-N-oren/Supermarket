import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse.model';
import UserLoginData from '../models/UserLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  public login(userLoginData: UserLoginData): Observable<SuccessfulLoginServerResponse>{
    return this._http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginData)
  }
}
