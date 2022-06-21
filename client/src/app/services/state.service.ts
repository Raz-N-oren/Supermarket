import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public firstName: string = 'Guest';
  public lastName: string = '';
  public shippingCity: string = '';
  public shippingStreet: string = '';
  public role: string = 'guest';

  constructor() {
    let userData: string = sessionStorage.getItem("userData");
    console.log(userData);

    if(userData){
      let currentUser = JSON.parse(userData);
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.shippingCity = currentUser.city;
      this.shippingStreet = currentUser.street;
      this.role = currentUser.role;
    }
  }
}
