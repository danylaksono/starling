import { Injectable, Output, EventEmitter, Directive } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarningSnackbarService } from '../dialog/warning-snackbar.service';

//import { map } from 'rxjs/operators';


@Directive()
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
    private cookie: CookieService,
    private warning: WarningSnackbarService
  ) { }

  private hasToken(): boolean {
    return !!this.cookie.get(this.currentUser);
  }


  createAccount(credentials) {
    this.http.post('api/users', credentials).subscribe((res) => {
      //console.log(res);
    });
  }

  signIn(credentials) {
    
    const authUrl = 'https://sitaru-arsip.jogjakota.go.id/auth/local';
    this.http.post(authUrl, credentials).subscribe((res: any) => {
      //this.http.post('api/auth', credentials).subscribe((res: any) => {
      //this.jwt = res.token;
      //localStorage.setItem('currentUser', res.token);
      
        this.cookie.set('currentUser', res.token, 0.25);
        this.isLoggedInSubject.next(true);
      
    },
      error => {
        //console.log('oops', error.error.message)
        this.warning.open(error.error.message);
    
      }

      

    );

    

  } //signin


  logOut() {
    this.cookie.delete('currentUser');
    this.isLoggedInSubject.next(false);
  } //logout

  isLoggedIn(): Observable<boolean> {
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