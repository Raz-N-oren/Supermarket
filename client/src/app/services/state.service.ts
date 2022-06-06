import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public firstName: string = 'Guest';
  public lastName: string = '';
  public shippingCity: string = '';
  public shippingStreet: string = '';

  constructor() {
    let userData: string = sessionStorage.getItem("userData");
    if(userData){
      let currentUser = JSON.parse(userData);
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.shippingCity = currentUser.city;
      this.shippingStreet = currentUser.street;

    }
  }
}
