import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/IUser.model';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  hide: boolean = true;
  currentUser: IUser;
  subscription: Subscription;

  constructor(
    private _usersService: UsersService,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this._stateService.isStore = true;
    this.subscription = this._usersService.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })
  }

  ngOnDestroy(): void {
    this._stateService.isStore = false;
    this.subscription.unsubscribe();
  }
}
