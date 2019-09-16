import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private Auth: AuthService
  ) { }

  getUser(){
    this.Auth.isSignedIn();
  }

  ngOnInit() {
  }

}
