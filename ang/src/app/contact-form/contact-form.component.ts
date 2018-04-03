import { Component, OnInit, Input } from '@angular/core';
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
    email: string,
    room: string,
    period: [{},{}]
  }
 
  constructor(private authService: AuthService) {
    
   }

  ngOnInit() {
    this.submited = false
    this.client = {
      firstname : "",
      lastname : "",
      email : '',
      room: "",
      period: null
    }   
  }
  

  onSubmit() {
    this.submited = true
    
    this.client = {
      firstname: this.client.firstname,
      lastname : this.client.lastname,
      email : this.client.email,
      room : this.apartman,
      period: [this.schedule[0],this.schedule[1]]
    }   
    console.log(this.client) 
    this.authService.sendEmail(this.client).subscribe(data => {
     console.log(data.ok)
    })
    
  }

}
