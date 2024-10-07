import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    //constructor(){}
  private apiUrl = environment.apiUrl; //webapi host url
  constructor(private http: HttpClient) { }  
  
  getData(){      
    return this.http.get(this.apiUrl + 'api/registration/getUser');   
  }  

  post(data: any) {
    return this.http.post(this.apiUrl + "api/registration/saveUser", data);
  }
  
}
