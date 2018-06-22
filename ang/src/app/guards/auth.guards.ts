import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service'


@Injectable()
export class AuthGuard implements CanActivate{

  sudouser: String

  constructor(
    private router:Router,
    private authService: AuthService)
    {}

  canActivate(){ 
      if(this.authService.loggedIn()) {
        return true;
      } else {
        // this.router.navigate(['/login']);
        console.log(this.authService.loggedIn())
        return false;
      }
    //   this.userService.sudouser.subscribe(sudouser => {
    //   this.sudouser = sudouser
    //   })    
    //   if(this.sudouser){
    //     console.log(this.sudouser)
    //     return true;
        
    //   } else {
    //     this.router.navigate(['/login']);
    //     console.log(this.sudouser)
    //     return false;
    // }
  
  }
}