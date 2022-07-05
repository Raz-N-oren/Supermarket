import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/IUser.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  hide: boolean = true;
  currentUser: IUser;

  constructor(
    private _usersService: UsersService,
    private _stateService: StateService
  ) {
    this._usersService.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })
  }

  ngOnInit(): void {
    this._stateService.isStore = true;

  }

  ngOnDestroy(): void {
    this._stateService.isStore = false;
  }

}
