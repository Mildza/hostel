import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpModule } from '@angular/http';

import { MyDateRangePickerModule } from 'mydaterangepicker';

import { AuthService } from './services/auth.service'


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDateRangePickerModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
