import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'
import {AuthService} from '../services/auth.service'


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Input() apartman: string

  @Input() submited: boolean
  
  @Input() schedule = [{}]
  
  client:{
    firstname: string,
    lastname: string,
    email: any,
    room: string,
    period: [{},{}]
  }

  email: String
  google: [{
    email: String
  }]
 
  constructor(
    private authService: AuthService,
    private http: Http,
    private router:Router,
    private flashMessage: FlashMessagesService) {}
    
   result: {}  

  ngOnInit() {
    this.email = this.authService.getGookie()

    this.submited = false
    this.client = {
      firstname : "",
      lastname : "",
      email : this.email ? this.email : "",
      room: "",
      period: null
    }   
  }  

  public onSubmit() {
    this.submited = true
    
    this.client = {
      firstname: this.client.firstname,
      lastname : this.client.lastname,
      email : this.client.email,
      room : this.apartman,
      period: [this.schedule[0],this.schedule[1]]
    }   
    this.authService.addReserve(this.client).subscribe(res => {
      if(res.success){
        this.flashMessage.show('Zakazan termin, potvrdicemo Vam rezervaciju', {cssClass: 'green', timeout: 3000})
        // this.router.navigate(['/home'])
        // this.authService.getAll(this.client.email)
        // .subscribe(result => this.result = result)  
      } else {
        this.flashMessage.show('Zakazivanje nije uspelo', {cssClass: 'red', timeout: 3000})
      }
    })    
  }

}
