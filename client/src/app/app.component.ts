import { CartsService } from './services/carts.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private primeNgConfig: PrimeNGConfig,
    private _stateService: StateService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  title = 'Online SuperMarket';
}
