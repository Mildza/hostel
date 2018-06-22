import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {AuthService} from '../services/auth.service'
import {UserService} from '../services/user.service'

import * as moment from 'moment';
import * as $ from 'jquery';
import * as Materialize from 'materialize-css';

declare let Materialize : any;
declare let $ : any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  day: Number
  month: Number
  year: Number
  nextDay: Number

  nowDay: Number
  nowMonth: Number
  nowYear: Number

  pastDay: number
  pastMonth: number
  pastYear: number
    
  btnSchedule : boolean = false

  model: any 
  all: any 
  begining: any
  end: any
  schedule = []
  beginDate:[{}]
  temp = 
    {beginDate: {year: 2018, month: 4, day: 28},
    endDate: {year: 2018, month: 4, day: 30}}
  
  calendar1 = []
  calendar2 = []
  calendar3 = []
  calendar4 = []

  proba = {year: 2018, month: 4, day: 28}

  apartman: String
  submited : boolean

  hidden: boolean

  myDateRangePickerOptions1: IMyDrpOptions
  myDateRangePickerOptions2: IMyDrpOptions
  myDateRangePickerOptions3: IMyDrpOptions
  myDateRangePickerOptions4: IMyDrpOptions
  
  gookie: String
  google: [{}]

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {const gookie = this.authService.getGookie()
    
    if(gookie){
      this.authService.getGoogleUser(gookie)
      .subscribe(google => this.google = google)
    }
  }

  ngOnInit() {

    $(function(){
      $('.carousel').carousel({indicators: true});
        $('.materialboxed').materialbox();
        $('.fixed-action-btn').floatingActionButton();
        $(".carousel-next").click(function() {
      $(this).closest(".carousel").carousel("next");
      });
      $(".carousel-previous").click(function() {
      $(this).closest(".carousel").carousel("prev");
      });      
      $('.carousel.carousel-slider').carousel({fullWidth: true});
  });

    this.beginDate = [{}]
    this.authService.getAll()
    .subscribe(result => {
      result.forEach(result => {
        if(result.room == 1) {
          this.temp = 
            {beginDate: {year: result.period[0].beginDate.year, month: result.period[0].beginDate.month, day: result.period[0].beginDate.day},
            endDate: {year: result.period[1].endDate.year, month: result.period[1].endDate.month, day: result.period[1].endDate.day}}
            this.calendar1.push(this.temp)
            this.temp=null
          }
        
        if(result.room == 2) {
          this.temp = 
            {beginDate: {year: result.period[0].beginDate.year, month: result.period[0].beginDate.month, day: result.period[0].beginDate.day},
            endDate: {year: result.period[1].endDate.year, month: result.period[1].endDate.month, day: result.period[1].endDate.day}}
            this.calendar2.push(this.temp)
          }
        
        
        if(result.room == 3) {
          this.temp = 
            {beginDate: {year: result.period[0].beginDate.year, month: result.period[0].beginDate.month, day: result.period[0].beginDate.day},
            endDate: {year: result.period[1].endDate.year, month: result.period[1].endDate.month, day: result.period[1].endDate.day}}
            this.calendar3.push(this.temp)
          }
        
        
        if(result.room == 4) {
          this.temp = 
            {beginDate: {year: result.period[0].beginDate.year, month: result.period[0].beginDate.month, day: result.period[0].beginDate.day},
            endDate: {year: result.period[1].endDate.year, month: result.period[1].endDate.month, day: result.period[1].endDate.day}}
            this.calendar4.push(this.temp)  
          }
              
      });
    }) 

    const today = (moment().format('L'))
    const tommorow = (moment().add(1, 'days').format('L'));
    const yesterday = (moment().subtract(1, 'days').format('L'))

    const res = today.split("/");
    const res2 = tommorow.split("/")
    const res3 = yesterday.split("/")

    this.month = parseInt(res[0])
    this.day = parseInt(res[1])
    this.year = parseInt(res[2])
    
    this.nowMonth = parseInt(res2[0])
    this.nowDay = parseInt(res2[1])
    this.nowYear = parseInt(res2[2])

    this.pastMonth = parseInt(res3[0])
    this.pastDay = parseInt(res3[1])
    this.pastYear = parseInt(res3[2])
    
    this.hidden = false

    this.model = {
      beginDate: {day: this.day, month: this.month, year: this.year },
      endDate: {year: this.nowYear, month: this.nowMonth, day: this.nowDay}
  }; 

    this.myDateRangePickerOptions1 = {
      disableUntil:{year: this.pastYear, month: this.pastMonth, day: this.pastDay},
      disableDateRanges : this.calendar1, 
      dateFormat: 'dd.mm.yyyy',
    };  
    
    this.myDateRangePickerOptions2 = {
      disableUntil:{year: this.pastYear, month: this.pastMonth, day: this.pastDay},
      disableDateRanges: this.calendar2,
      dateFormat: 'dd.mm.yyyy',
    };
    this.myDateRangePickerOptions3 = {
      disableUntil:{year: this.pastYear, month: this.pastMonth, day: this.pastDay},
      disableDateRanges: this.calendar3,
      dateFormat: 'dd.mm.yyyy',
    };
    this.myDateRangePickerOptions4 = {
      disableUntil:{year: this.pastYear, month: this.pastMonth, day: this.pastDay},
      disableDateRanges: this.calendar4, 
      dateFormat: 'dd.mm.yyyy',
    };
  } 
 
  onDateRangeChanged(e){
    this.schedule=[]
    this.btnSchedule  = true      
    this.schedule = [
      {beginDate:{day:e.beginDate.day, month:e.beginDate.month, year:e.beginDate.year}},
      {endDate:{day:e.endDate.day, month:e.endDate.month, year:e.endDate.year}}
    ]
  }

  apartman1(a){
    this.apartman = a
    this.hidden = true    
  }

  public check(event) {
    console.log(event.altKey)
          if(event.ctrlKey == true){
        this.router.navigate(['/admin'])
      }
    }
  
    logOut(){
      localStorage.clear()      
    }  
  
}
