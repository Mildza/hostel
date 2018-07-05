import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'

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

  constructor(
    private authService: AuthService,
    
  ) {const gookie = this.authService.getGookie()
    
    if(gookie){
      this.authService.getGoogleUser(gookie)
      .subscribe(google => this.google = google)
    }
  }
  ngOnInit() {

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
