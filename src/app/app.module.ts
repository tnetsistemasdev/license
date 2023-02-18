import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/widgets/modal/modal.component';
import {AlertModule} from "ngx-bootstrap/alert";
import { AlertComponent } from './components/widgets/alert/alert.component';
import { NotFountComponent } from './components/errors/not-fount/not-fount.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    ProductsComponent,
    ClientsComponent,
    LoginComponent,
    ModalComponent,
    AlertComponent,
    NotFountComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
