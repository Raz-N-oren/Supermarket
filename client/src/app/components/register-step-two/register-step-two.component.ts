import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.css']
})
export class RegisterStepTwoComponent implements OnInit {

  registerUserData: any = {
    firstName: "",
    lastName: "", city: "",
    street: ""
  };

  userRegisterForm: FormGroup;
  displayModal: boolean = false;
  cities: string[];

  constructor(
    private _usersService: UsersService,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      city: [this.registerUserData.city, [Validators.required]],
      street: [this.registerUserData.street, [Validators.required, Validators.maxLength(40)]],
      firstName: [this.registerUserData.firstName, [Validators.required, Validators.maxLength(12)]],
      lastName: [this.registerUserData.lastName, [Validators.required, Validators.maxLength(12)]]
    })

    this.cities = [
      'Akko',
      'Afula',
      'Al Buţayḩah',
      'Al Khushnīyah',
      'Ashdod',
      'Ashqelon',
      'Bat Yam',
      'Beersheba',
      'Bené Beraq',
      'Bet Shemesh',
      'Dimona',
      'Eilat',
      'El‘ad',
      'Eṭ Ṭaiyiba',
      'Fīq',
      'Givatayim',
      'Hadera',
      'Haifa',
      'Herẕliyya',
      'Hod HaSharon',
      'Holon',
      'Jerusalem',
      'Karmiel',
      'Kefar Sava',
      'Lod',
      'Ma‘alot Tarshīḥā',
      'Modi‘in Makkabbim Re‘ut',
      'Nahariyya',
      'Nazareth',
      'Nes Ẕiyyona',
      'Netanya',
      'Netivot',
      'Or Yehuda',
      'Petaẖ Tiqwa',
      'Qiryat Ata',
      'Qiryat Bialik',
      'Qiryat Gat',
      'Qiryat Moẕqin',
      'Qiryat Ono',
      'Qiryat Yam',
      'Ra‘ananna',
      'Rahat',
      'Ramat Gan',
      'Ramat HaSharon',
      'Ramla',
      'Reẖovot',
      'Rishon LeẔiyyon',
      'Rosh Ha‘Ayin',
      'Sakhnīn',
      'Tamra',
      'Tel Aviv-Yafo',
      'Tiberias',
      'Umm el Faḥm',
      'Yehud',
      'Ẕefat'
    ]
  }

  addNewUser(): void {
    this.registerUserData = this.userRegisterForm.value;
    console.log(this.registerUserData);

    this._usersService.userRegisterData.city = this.registerUserData.city;
    this._usersService.userRegisterData.street = this.registerUserData.street;
    this._usersService.userRegisterData.firstName = this.registerUserData.firstName;
    this._usersService.userRegisterData.lastName = this.registerUserData.lastName;

    this._usersService.addNewUser(this._usersService.userRegisterData);
    this.displayModal = true;
    console.log(this._usersService.userRegisterData);
  }

  goBackToStepOne(): void {
    this.router.navigate(['/landing-page/register/step-one']);
  }

}