import { AdminGuard } from './guards/admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { OrderComponent } from './components/order/order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';
import { StoreComponent } from './components/store/store.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { OrderGuard } from './guards/order.guard';

const routes: Routes = [
  {
    path: "landing-page", component: LandingPageComponent, children: [
      { path: "login", canActivate: [LoggedInGuard], component: LoginComponent },
      {
        path: "register", canActivate: [LoggedInGuard], component: RegisterComponent, children: [
          { path: 'step-one', component: RegisterStepOneComponent },
          { path: 'step-two', component: RegisterStepTwoComponent },
          { path: '', redirectTo: 'step-one', pathMatch: 'full' }
        ]
      },
      { path: "before-shopping", canActivate: [LoginGuard], component: BeforeShoppingComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full', }
    ],
  },
  { path: "store", canActivate: [LoginGuard], component: StoreComponent },
  { path: "order", canActivate: [LoginGuard, OrderGuard], component: OrderComponent },
  { path: "doc",canActivate: [LoginGuard, AdminGuard], component: DocumentationComponent },
  { path: "", redirectTo: "/landing-page/login", pathMatch: "full" },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
