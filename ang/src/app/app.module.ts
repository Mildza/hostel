import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpModule } from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AuthService } from './services/auth.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},  
  {path: '404', component: HomeComponent},
  {path: '**',redirectTo: '/404'}   
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    ContactFormComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MyDateRangePickerModule,
    BsDatepickerModule.forRoot(),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
