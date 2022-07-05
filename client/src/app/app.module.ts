import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/categories.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { RegisterStepOneComponent } from './components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register-step-two/register-step-two.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { BeforeShoppingComponent } from './components/before-shopping/before-shopping.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { DataViewModule } from 'primeng/dataview';
import { MatGridListModule, MatTabsModule } from '@angular/material';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddOrEditCartItemModalComponent } from './components/add-or-edit-cart-item-modal/add-or-edit-cart-item-modal.component';
import { TabViewModule } from 'primeng/tabview';
import { OrderComponent } from './components/order/order.component';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AddOrEditProductComponent } from './components/add-or-edit-product/add-or-edit-product.component';



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
    AddNewProductComponent,
    LandingPageComponent,
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    BeforeShoppingComponent,
    StoreComponent,
    CartComponent,
    AddOrEditCartItemModalComponent,
    OrderComponent,
    AddOrEditProductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    NgbModule,
    CardModule,
    StepsModule,
    DropdownModule,
    DialogModule,
    TabMenuModule,
    DataViewModule,
    MatTabsModule,
    MatGridListModule,
    InputNumberModule,
    TabViewModule,
    CalendarModule,
    InputMaskModule,
    MessagesModule,
    ToastModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }, CategoriesService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
