import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import INewRegisteredUser from '../models/INewRegisteredUser.model';
import IUser from '../models/IUser.model';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse.model';
import UserLoginData from '../models/UserLoginData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = "http://localhost:3001/users/";
  currentUser?: IUser;
  currentUserSubject = new BehaviorSubject<IUser>(null);

  userRegisterData: INewRegisteredUser = {
    userId: "",
    userEmail: "",
    firstName: "",
    lastName: "",
    password: "",
    city: "",
    street: ""
  }

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService,
    private router: Router
    ) {
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
        this._messageService.add({ key: 'appToast', severity: 'success', summary: 'Registration Success', detail: 'Your Registration has been successfully completed.' });
        this.router.navigate(['/landing-page/before-shopping']);
      },
      err => {
        console.log(err);
        this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Registration has failed.' });
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
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'User already registered.' });
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

  getUser = (): IUser =>{
    return this.currentUserSubject.value;
  }
}
