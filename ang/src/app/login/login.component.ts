import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {AuthService} from '../services/auth.service'
import {UserService} from '../services/user.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import { Http } from '@angular/http';

// import {StorageService} from '../../services/storage.service'
// import {UserService} from '../../services/user.service'
// import {AuthService} from '../../services/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String
  password: String
  user: String
  sudouser: String
  result: {}
  googleUser: [{
    email:String
    admin: Boolean
  }]
  email:String
  admin: Boolean

  constructor(    
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService:AuthService,
    private userService: UserService,
    private http: Http,
    private route:ActivatedRoute     
  ) { 
    
  } 
   
  ngOnInit() { 
    const email = this.route.snapshot.params['id']
    if(email){
      this.authService.storeUserData(email)
      // const sudouser = email;
      // this.userService.sudouser.next(sudouser);
      this.authService.getGoogleUser(email)
      .subscribe(googleUser => {
        this.googleUser = googleUser
      })
      
            
      // this.authService.getAll()
      // .subscribe(result => this.result = result)
      // // this.flashMessage.show('We are in about component!', { cssClass: 'green', timeout: 3000 });      
    } else {

    } 
  }

  onLoginSubmit(){
    const user = {      
      username: this.username,
      password: this.password      
  }

  console.log(user)
  
  // this.authService.authenticateUser(user).subscribe(data => {
  //   if(data.success){
  //     this.authService.storeUserData(data.token, data.user)        
  //     this.flashMessage.show(
  //       'Ulogovani ste', {
  //       cssClass: 'alert-success', 
  //       timeout: 3000})
        
  //       this.storageService.getStorage()

  //       let sudouser = this.username;
  //       this.userService.sudouser.next(sudouser);
        
  //     this.router.navigate(['all'])

  //   } else {
  //     this.flashMessage.show(
  //       data.msg, {
  //       cssClass: 'alert-danger', 
  //       timeout: 3000})
  //     this.router.navigate(['/login']) 
  //     }
  // })
  }

  google(){
    this.authService.googleAuth()
    .subscribe(data => console.log(data))
    this.http.get('http://localhost:3000/auth/google/redirect')
    .subscribe(data => console.log(data));
  }

  logOut(){
    localStorage.clear()      
  }  
}
