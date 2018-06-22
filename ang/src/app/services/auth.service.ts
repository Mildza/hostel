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
    return this.http.post('http://localhost:3000/clients/add', client, {headers: headers})
      .map(res => res.json())
  }

  getAll(){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/clients/all', {headers: headers})
      .map(res => res.json())
  }

  getOne(email){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/clients/one/' + email, {headers: headers})
      .map(res => res.json())
  }

   getGoogleUser(email){          
    let headers = new Headers()    
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/user/find/' + email, {headers: headers})
      .map(res => res.json())
  }

  logOut(){ 
    localStorage.removeItem('gookie')
    localStorage.clear()          
    let headers = new Headers()     
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/user/logout', {headers: headers})
      .map(res => res.json())
  }

  deleteClient(id) { 
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete('http://localhost:3000/clients/delete/'+ id, {headers: headers})
      .map(res => res.json())
  }

  googleAuth(){
    let headers = new Headers() 
    headers.append('Access-Control-Allow-Origin', '*' )
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST') 
    headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization') 
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/auth/google', {headers: headers})
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