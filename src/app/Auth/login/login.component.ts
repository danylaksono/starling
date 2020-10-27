import { AuthService } from './../../service/auth.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { WarningSnackbarService } from 'src/app/dialog/warning-snackbar.service';
import { first } from 'rxjs/operators';



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
  returnUrl: string;
  isLoggedIn: Boolean;
  

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
    
    ) { }


  toggleSignup() {
    //console.log("sini");
      this.showSignup = !this.showSignup;
  }


  signIn() {
    let credentials = {
      strategy: 'local',
      email: this.signInEmail,
      password: this.signInPassword
    }
    this.auth.signIn(credentials);
    setTimeout(() => {
      this.auth.isLoggedIn()
      .pipe(first())
      .subscribe(
        data => {
          //console.log(data);
          if (data){
            this.router.navigateByUrl(this.returnUrl);  
          } 
          // else {     warning('server autentikasi bermasalah, silahkan coba lagi)          }          
        },
        error => {
          //console.log('error');
        }
      );  

    }, 1000    
    );
    
    
    

    
    
    
    //console.log(credentials);

    
    //const cookieExist: boolean = this.cookie.check('currentUser');
    //if (cookieExist){
      //this.router.navigateByUrl('/home');
      //https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
    //};
  }


  goBack() {
    this.location.back();
  }


  ngOnInit() {
    this.auth.logOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    console.log(this.returnUrl);
    //console.log(this.location.path());
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


// https://www.tektutorialshub.com/angular/angular-location-service/
*/