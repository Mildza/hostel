import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor() {
    
  }
  
  sudouser:BehaviorSubject<String> = new BehaviorSubject<String>('');

  //  sudouser = Observable.create(function(observer) {
  //   observer.next(observer);
  // });
}