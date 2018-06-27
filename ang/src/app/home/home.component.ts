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
  room: [{
    price,
    discount
  }]
  price1: number
  price2: number
  price3: number
  price4: number
  discount1: number
  discount2: number
  discount3: number
  discount4: number  
  action1: Boolean
  action2: Boolean
  action3: Boolean
  action4: Boolean
  lowering1: number
  lowering2: number
  lowering3: number
  lowering4: number
  percent1: string
  percent2: string
  percent3: string
  percent4: string

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
    
    this.authService.getPrice()
    .subscribe(room => {
      this.room = room
      this.price1 = this.room[0].price
      this.price2 = this.room[1].price
      this.price3 = this.room[2].price
      this.price4 = this.room[3].price

      this.discount1 = this.room[0].discount
      this.discount2 = this.room[1].discount
      this.discount3 = this.room[2].discount
      this.discount4 = this.room[3].discount

      this.lowering1 = Math.round(this.price1 * this.discount1)
      this.lowering2 = Math.round(this.price2 * this.discount2)
      this.lowering3 = Math.round(this.price3 * this.discount3)
      this.lowering4 = Math.round(this.price4 * this.discount4)

      

      if(this.discount1 < 1){
        if( 10 - this.discount1*10 == 1){
          this.percent1 = "10%"
        } else if(10 -this.discount1*10 == 2) {
          this.percent1 = "20%"
        } else if(10 -this.discount1*10 == 3) {
          this.percent1 = "30%"
        } else if(10 -this.discount1*10 == 4) {
          this.percent1 = "40%"
        } else if(10 -this.discount1*10 == 5) {
          this.percent1 = "50%"
        }
        this.action1=true
      }else {
        this.action1=false
      }
      if(this.discount2 < 1){
        if( 10 - this.discount2*10 == 1){
          this.percent2 = "10%"
        } else if(10 -this.discount2*10 == 2) {
          this.percent2 = "20%"
        } else if(10 -this.discount2*10 == 3) {
          this.percent2 = "30%"
        } else if(10 -this.discount2*10 == 4) {
          this.percent2 = "40%"
        } else if(10 -this.discount2*10 == 5) {
          this.percent2 = "50%"
        }
        this.action2=true
      }else {
        this.action2=false
      }
      if(this.discount3 < 1){
        if( 10 - this.discount3*10 == 1){
          this.percent3 = "10%"
        } else if(10 -this.discount3*10 == 2) {
          this.percent3 = "20%"
        } else if(10 -this.discount3*10 == 3) {
          this.percent3 = "30%"
        } else if(10 -this.discount3*10 == 4) {
          this.percent3 = "40%"
        } else if(10 -this.discount3*10 == 5) {
          this.percent3 = "50%"
        }
        this.action3=true
      }else {
        this.action3=false
      }
      if(this.discount4 < 1){
        if( 10 - this.discount4*10 == 1){
          this.percent4 = "10%"
        } else if(10 -this.discount4*10 == 2) {
          this.percent4 = "20%"
        } else if(10 -this.discount4*10 == 3) {
          this.percent4 = "30%"
        } else if(10 -this.discount4*10 == 4) {
          this.percent4 = "40%"
        } else if(10 -this.discount4*10 == 5) {
          this.percent4 = "50%"
        }
        this.action4=true
      }else {
        this.action4=false
      }
    })

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
