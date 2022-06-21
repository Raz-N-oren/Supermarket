import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public stateService: StateService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  onLogOutClicked(): void  {
    sessionStorage.removeItem("userData");
    this.stateService.firstName = 'Guest';
    this.stateService.lastName = "";
    this.stateService.shippingCity = "";
    this.stateService.shippingStreet = "";
    this.stateService.role = 'guest';
    this.router.navigate(['/landing-page/register/step-one']);

  }
}
