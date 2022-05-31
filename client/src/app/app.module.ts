import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { Page404Component } from './components/page404/page404.component';
import { ProductsContainerComponent } from './components/products-container/products-container.component';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    Page404Component,
    ProductsContainerComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
