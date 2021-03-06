import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {
  registerUserData: any = {
    firstName: "",
    lastName: "",
    city: "",
    street: ""
  };

  userRegisterForm: UntypedFormGroup;

  constructor(
    private _usersService: UsersService,
    public _stateService: StateService,
    private formBuilder: UntypedFormBuilder,
    private _messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisterDataFromSessionStorage();
    this.userRegisterForm = this.formBuilder.group({
      city: [this.registerUserData.city, [Validators.required]],
      street: [this.registerUserData.street, [Validators.required, Validators.maxLength(40)]],
      firstName: [this.registerUserData.firstName, [Validators.required, Validators.maxLength(12)]],
      lastName: [this.registerUserData.lastName, [Validators.required, Validators.maxLength(12)]]
    })
  }

  addNewUser(): void {
    this.registerUserData = this.userRegisterForm.value;
    this._usersService.userRegisterData.city = this.registerUserData.city;
    this._usersService.userRegisterData.street = this.registerUserData.street;
    this._usersService.userRegisterData.firstName = this.registerUserData.firstName;
    this._usersService.userRegisterData.lastName = this.registerUserData.lastName;

    this._usersService.addNewUser(this._usersService.userRegisterData);
  }

  goBackToStepOne(): void {
    this.router.navigate(['/landing-page/register/step-one']);
  }

  getRegisterDataFromSessionStorage = () => {
    let lastSavedRegister = sessionStorage.getItem("register");
    if (lastSavedRegister) {
      this._usersService.userRegisterData = JSON.parse(lastSavedRegister);
    }
    else {
      this._messageService.add({ key: 'appToast', severity: 'error', summary: 'Invalid user data', detail: "Please fill step one first." });
      this.router.navigate(['landing-page/register/step-one']);
    }
  }
}
