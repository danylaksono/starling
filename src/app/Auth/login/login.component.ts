import { AuthService } from './../../service/auth.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule
  ]
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public createEmail: string;
  public createPassword: string;
  public signInEmail: string;
  public signInPassword: string;
  public jwt: string;
  public showSignup: Boolean = true;
  public user: string;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService) { }


  toggleSignup() {
    //console.log("sini");
      this.showSignup = !this.showSignup;
  }


  signIn() {
    let credentials = {
      email: this.signInEmail,
      password: this.signInPassword
    }
    this.auth.signIn(credentials);
    //const cookieExist: boolean = this.cookie.check('currentUser');
    //if (cookieExist){
      this.router.navigateByUrl('/home');
    //};
  }



  ngOnInit() {
  }

}


/*


  logout() {
    this.auth.logOut();
  }



testRoute() {
  this.user = localStorage.getItem('currentUser');
  let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.user)
  this.http.get('http://localhost:3000/users/test', { headers: headers }).subscribe((res) => {
    console.log(res);
  });
  this.auth.isSignedIn();
}

*/