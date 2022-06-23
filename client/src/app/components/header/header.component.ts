import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IUser from 'src/app/models/IUser.model';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: IUser;

  constructor(
    private router: Router,
    private _usersService: UsersService
    ) {
      this._usersService.followCurrentUser().subscribe((currentUser)=>{
        this.currentUser = currentUser;
      })
     }

  ngOnInit(): void {
  }

  onLogOutClicked(): void  {
    sessionStorage.removeItem("userData");
    this._usersService.setCurrentUser(null);
    this.router.navigate(['/landing-page/login']);

  }
}
