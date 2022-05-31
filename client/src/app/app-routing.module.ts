import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "add-new-product",canActivate:[LoginGuard], component: AddNewProductComponent },
  { path: "shopping",canActivate:[LoginGuard], component: ProductsContainerComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
