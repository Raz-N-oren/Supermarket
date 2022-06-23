import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import INewRegisteredUser from '../models/INewRegisteredUser.model';
import IUser from '../models/IUser.model';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse.model';
import UserLoginData from '../models/UserLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseUrl: string = "http://localhost:3001/users/";
  private currentUser?: IUser;
  private currentUserSubject = new BehaviorSubject<IUser>(null);

  userRegisterData: INewRegisteredUser = {
    userId: "",
    userEmail: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    street: ""
  }


  constructor(private _http: HttpClient) {
    let userJson = sessionStorage.getItem("userData");
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  login(userLoginData: UserLoginData): Observable<SuccessfulLoginServerResponse> {
    return this._http.post<SuccessfulLoginServerResponse>(this.baseUrl + 'login', userLoginData)
  }

  addNewUser(user: object): void {
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

  public async isExist(userId: string, userEmail: string): Promise<boolean> {
    let isExist: boolean;
    let pro = this._http.post<boolean>(this.baseUrl + 'is-exist', { userId, userEmail }).toPromise();
    await pro.then(response => {
      console.log("response", response)
      isExist = response;
    }).catch(error => {
      console.log(error);
      alert('User already registered.');
    }
    )
    return isExist;
  }

  followCurrentUser = (): Observable<IUser> =>{
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser = (newUser: IUser) => {
    this.currentUser = newUser;
    this.currentUserSubject.next(newUser);
  }
}
