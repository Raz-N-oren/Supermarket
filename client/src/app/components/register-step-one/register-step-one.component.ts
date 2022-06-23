import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.css']
})
export class RegisterStepOneComponent implements OnInit {

  registeredUserData: any = {
    userId: "",
    userEmail: "",
    password: "",
    verifiedPassword: "",
  }

  userRegisterForm: UntypedFormGroup;
  isUserNotRegistered: boolean = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      userId: [this.registeredUserData.userId, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]],
      userEmail: [this.registeredUserData.userEmail, [Validators.required, Validators.email, Validators.maxLength(40)]],
      password: [this.registeredUserData.password, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      verifiedPassword: [this.registeredUserData.verifiedPassword],
      isUserNotRegistered: [this.isUserNotRegistered, [Validators.requiredTrue]]
    })

    combineLatest(this.userRegisterForm.get('userId').valueChanges, this.userRegisterForm.get('userEmail').valueChanges)
      .subscribe(p => this.userRegisterForm.get('isUserNotRegistered').setValue(true));

  }

  async submit(){
    this.registeredUserData = this.userRegisterForm.value;
    let userId = this.registeredUserData.userId;
    let userEmail = this.registeredUserData.userEmail;
    let isExist = await this._usersService.isExist(userId, userEmail);
    if(isExist){
      this.userRegisterForm.get('isUserNotRegistered').setValue(false)
    }
    else{
      this._usersService.userRegisterData.userId = userId;
      this._usersService.userRegisterData.userEmail = userEmail;
      this._usersService.userRegisterData.password = this.registeredUserData.password;
      this.router.navigate(['/landing-page/register/step-two']);
      console.log(this._usersService.userRegisterData);
    }
  }



}
