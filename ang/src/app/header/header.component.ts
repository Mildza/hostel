import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {UserService} from '../services/user.service'

import * as $ from 'jquery';
declare let $ : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  gookie: String
  google: [{}]
  sudouser: String

  constructor(
    private authService: AuthService,
    private userService: UserService
    
  ) {
  }
  ngOnInit() {

    const gookie = this.authService.getGookie()
    this.userService.sudouser.subscribe(sudouser => {
      this.sudouser = sudouser
      console.log("header: " + this.sudouser)
      
    if(this.sudouser || gookie){      
        this.authService.getGoogleUser(this.sudouser || gookie)
      .subscribe(google => this.google = google) 
    }
  })

    $(function(){
      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
          
  });
  }

  logOut(){
    this.authService.logOut()
    // localStorage.clear()      
  }  
}
