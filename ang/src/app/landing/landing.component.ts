import { Component, OnInit } from '@angular/core';

const intervalID = null
const launchDate = new Date('Jun 1, 2018 10:00:00').getTime()

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {
 
  days: Number
  hours: Number
  minutes: Number
  seconds: Number
  constructor() { }

  ngOnInit() {  
      let interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate - now
      
      // Time calculation
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) /(1000 * 60 * 60))
      this.minutes = Math.floor(distance % (1000 * 60 * 60)/(1000 * 60))
      this.seconds = Math.floor(distance % (1000 * 60)/1000)
  
      
      // if(distance < 0) {
      //   clearInterval(intervalID) 
      //   countdown.style.color = "#17a2b8"
      //   countdown.innerHTML = "Its birthday time"
      //   // gone.style.display = "none"
      // } 
    }, 1000)  
    
  }  

}
