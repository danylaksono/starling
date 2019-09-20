import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  public jwt: string;
  public currentUser: string;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.hasToken());

  @Output() loggedin = new EventEmitter();

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  private hasToken() : boolean {
    return !!this.cookie.get(this.currentUser);
  }


  createAccount(credentials) {
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
      this.isLoggedInSubject.next(true);
    });

  } //signin

  
  logOut() {
    this.cookie.delete('currentUser');
    this.isLoggedInSubject.next(false);
    
    //this.isSignedIn();
    //this.loggedin.emit(this.isSignedIn);
    //localStorage.removeItem('currentUser');
  } //logout



  isLoggedIn() : Observable<boolean> {
    const isExist = this.cookie.get('currentUser');
    if (isExist) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
    //console.log(this.isLoggedInSubject.asObservable());
    return this.isLoggedInSubject.asObservable();
   }


  isSignedIn() {
    //check if expired first
    let cookieExist: boolean = this.cookie.check('currentUser');
    //this.currentUser = localStorage.getItem('currentUser');
    if (cookieExist) {
      //this.loggedin.emit(true);
      //this.isOpen.next(true);
      return true;
      console.log('logged in');
    } else {
      //this.isOpen.next(false);
      //this.loggedin.emit(false);
      return false;
      console.log('not logged in');
    }
  }






}


//based on https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243