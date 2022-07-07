import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IUser from 'src/app/models/IUser.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: IUser;
  searchedInput: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private _usersService: UsersService,
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService,
    private _stateService: StateService

  ) {
  }

  ngOnInit(): void {
    this.subscription = this._usersService.followCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogOutClicked(): void {
    sessionStorage.removeItem("userData");
    this._usersService.setCurrentUser(null);
    this.router.navigate(['/landing-page/login']);
  }

  onSearchInputChanged = (searchedInput: string) => {
    this._productsService.getProductsBySearchString(searchedInput);
    this._categoriesService.selectedCategory = 0;
  }
}
