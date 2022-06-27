import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  client: any
  googleId: any
  email: any
  
  constructor(private http:Http) {     
  }

  addReserve(client) {
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.post('clients/add', client, {headers: headers})
      .map(res => res.json())
  }

  getAll(){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('clients/all', {headers: headers})
      .map(res => res.json())
  }

  getOne(email){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('clients/one/' + email, {headers: headers})
      .map(res => res.json())
  }

   getGoogleUser(email){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('user/find/' + email, {headers: headers})
      .map(res => res.json())
  }

  logOut(){ 
    localStorage.removeItem('gookie')
    localStorage.clear()          
    let headers = new Headers()     
    headers.append('Content-Type', 'application/json')
    return this.http.get('user/logout', {headers: headers})
      .map(res => res.json())
  }

  deleteClient(id) { 
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete('clients/delete/'+ id, {headers: headers})
      .map(res => res.json())
  }

  googleAuth(){
    let headers = new Headers() 
    headers.append('Access-Control-Allow-Origin', '*' )
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST') 
    headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization') 
    headers.append('Content-Type', 'application/json')
    return this.http.get('auth/google', {headers: headers})
      .map(res => res.json())
  }


  getPrice() {
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('price/getPrice', {headers: headers})
      .map(res => res.json())
  }

  changeDiscount(room) {
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.post('price/discount', room, {headers: headers})
      .map(res => res.json())
  }


  getCounter(){ 
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('counter/get', {headers: headers})
      .map(res => res.json())
  }

  riseCounter(old){
    document.cookie = "visitor=customer; max-age=60*60*12";
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.put('counter/rise/' + old, {headers: headers})
      .map(res => res.json())
  }

  storeUserData(gookie){
    localStorage.setItem('gookie', gookie)
    this.email = gookie
  }

  getGookie(){'gookie'
    const cookie = localStorage.getItem('gookie')
    if(cookie) {
      return cookie
    } 
  }
  
  loggedIn(){
    const token = localStorage.getItem('gookie')          
    if(token){
      return true;
    }           
  }

}