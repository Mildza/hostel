import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpModule } from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin/:id', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'google/redirect', component: AdminComponent, canActivate:[AuthGuard]},  
  {path: 'auth/google/login/:id', component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'login', component: LoginComponent},  
  {path: 'home', component: HomeComponent},
  {path: '404', component: HomeComponent},
  {path: '**',redirectTo: '/404'}   
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    ContactFormComponent,
    AdminComponent,
    LoginComponent
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
    AuthService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
