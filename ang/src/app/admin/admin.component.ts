import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {AuthService} from '../services/auth.service'
import {Router, ActivatedRoute} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private http: Http,
    private router:Router,
    private flashMessage: FlashMessagesService
  ) { }

  result: {}  

  ngOnInit() {

    this.authService.getAll()
    .subscribe(result => this.result = result)
    // this.flashMessage.show('We are in about component!', { cssClass: 'green', timeout: 3000 });
  }


  public deleteClient(id){
      this.http.delete('http://localhost:3000/clients/delete/'+id).subscribe(res => {
        if(res.status){
          this.flashMessage.show('Obrisano', {cssClass: 'green', timeout: 3000})
          this.router.navigate(['/admin'])
          this.authService.getAll()
          .subscribe(result => this.result = result)  
        } else {
          this.flashMessage.show('Brisanje nije uspelo', {cssClass: 'red', timeout: 3000})
        }
      })
    }
   

}
