import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';

const routes: Routes = [
  {
    path: "landing-page", component: LandingPageComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent, children:[
        {path: 'step-one', component: RegisterStepOneComponent},
        {path: 'step-two', component: RegisterStepTwoComponent},
        {path: '', redirectTo: 'step-one', pathMatch: 'full'}

      ]},
      { path: "before-shopping", component: BeforeShoppingComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full', }
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "add-new-product", canActivate: [LoginGuard], component: AddNewProductComponent },
  { path: "shopping", canActivate: [LoginGuard], component: ProductsContainerComponent },
  { path: "", redirectTo: "/landing-page/login", pathMatch: "full" },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
