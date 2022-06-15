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






}
