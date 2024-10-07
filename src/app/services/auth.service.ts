import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; //webapi host url
  STORAGE_KEY = '';
  constructor(private router: Router,private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
   
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  // get checkUserLogin() {
  //   this.STORAGE_KEY = 'local_user';
  //   const user = this.storage.get(this.STORAGE_KEY);
  //   if (user) {
  //     return true;
  //   }
  //   return false;
  // }
  
  logout() {  
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
    localStorage.removeItem('role');
  }
  
  ////Commeted code fpr refrence

  // login({ email, password }: any): Observable<any> {
  //   // console.log(email,password);
  //   if (email === 'admin' && password === 'admin') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     localStorage.setItem('role', 'admin');
  //     return of({ name: 'Admin User', email: 'admin', role: 'admin' });
  //   }
  //   if (email === 'user' && password === 'user') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     localStorage.setItem('role', 'user');
  //     return of({ name: 'Bhushan Ahire', email: 'user', role: 'user' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }

    login(data: any) {
    if (data) {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      localStorage.setItem('role', 'admin');
      //return of({ name: 'Bhushan Ahire', email: 'admin', role: 'admin' });
      return this.http.get(this.apiUrl + 'api/registration/getUserByEmail?email=' + data.email);
    }
    return throwError(new Error('Failed to login'));
      
    }

}