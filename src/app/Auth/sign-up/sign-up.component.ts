import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public createEmail: string;
  public createPassword: string;
  public signInEmail: string;
  public signInPassword: string;
  public jwt: string;

  constructor(
    private auth: AuthService
  ) { }

  getUser(){
    this.auth.isSignedIn();
  }

  createAccount(){
    let credentials = {
      email: this.signInEmail,
      password: this.signInPassword
    }
    this.auth.createAccount(credentials);
  }

  ngOnInit() {
  }

}
