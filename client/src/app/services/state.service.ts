import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public firstName: string = 'Guest';
  public lastName: string = '';

  constructor() {
    let userData: string = sessionStorage.getItem("userData");
    if(userData){
      let currentUser = JSON.parse(userData);
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;

    }
  }
}
