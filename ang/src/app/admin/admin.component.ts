import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {AuthService} from '../services/auth.service'
import {UserService} from '../services/user.service'
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:any

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: Http,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  result: {}
  sudouser:{}
  google: [{}]
  email:String


  ngOnInit() {
    
    this.email = this.authService.getGookie()
    if(this.email){      
      this.authService.getOne(this.email)
      .subscribe(result => this.result = result)
      // this.flashMessage.show('We are in about component!', { cssClass: 'green', timeout: 3000 });
      this.authService.getGoogleUser(this.email)
      .subscribe(google => this.google = google)
    } 
  }

  logOut(){
    localStorage.clear()
    // this.http.get('http://localhost:3000/user/logout')
    // .subscribe(data => console.log(data));
  }  

  public deleteClient(id){
      this.http.delete('http://localhost:3000/clients/delete/'+id).subscribe(res => {
        if(res.status){
          this.flashMessage.show('Obrisano', {cssClass: 'green', timeout: 3000})
          this.router.navigate(['/admin'])
          this.authService.getOne(this.email)
          .subscribe(result => this.result = result)  
        } else {
          this.flashMessage.show('Brisanje nije uspelo', {cssClass: 'red', timeout: 3000})
        }
      })
    }  
}
