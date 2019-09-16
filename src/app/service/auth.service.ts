import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public jwt: string;
  public currentUser: string;
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Output() loggedin = new EventEmitter();

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }



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
      this.isSignedIn();
    });

  } //signin

  
  logOut() {
    this.cookie.delete('currentUser');
    this.isSignedIn();
    //this.loggedin.emit(this.isSignedIn);
    //localStorage.removeItem('currentUser');
  } //logout


  popupIsOpen(): Observable<any> {
    return this.isOpen.asObservable();
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
