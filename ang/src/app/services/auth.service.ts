import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  client: any
  
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

  deleteClient(id) { 
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete('http://localhost:3000/clients/delete/'+ id, {headers: headers})
      .map(res => res.json())
  }


}