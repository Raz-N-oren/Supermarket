import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private primeNgConfig: PrimeNGConfig,
    private _stateService: StateService
    ) {}

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  title = 'Online SuperMarket';
}
