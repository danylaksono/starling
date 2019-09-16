import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public jwt: string;
  public currentUser: string;

  constructor(
    private http: HttpClient,
    
    private cookie: CookieService
    ) { }

  createAccount(email,password) {
    let credentials = {
      email: email,
      password: password
    }
    this.http.post('http://localhost:3000/users', credentials).subscribe((res) => {
      //console.log(res);
    });
  }

  signIn(credentials) {

    this.http.post('http://localhost:3000/auth', credentials).subscribe((res: any) => {
      //console.log(res);
      //this.jwt = res.token;
      //localStorage.setItem('currentUser', res.token);
      this.cookie.set('currentUser', res.token, 0.25);
    });   
  }

  isSignedIn(){
    //check if expired first
    const cookieExist: boolean = this.cookie.check('currentUser');
    //this.currentUser = localStorage.getItem('currentUser');
    if (cookieExist){
      return true;
      console.log('logged in');
    } else {
      return false;
      console.log('not logged in');
    }  
  }

  
  logOut() {
    this.cookie.delete('currentUser');
    //localStorage.removeItem('currentUser');
  }





}
