import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})

/*
@NgModule({
  imports: [
    MaterialModule
  ]
})
*/

export class SidenavListComponent implements OnInit {


  isLoggedIn : Observable<boolean>;

  constructor(
    private auth: AuthService
  ) { 
    this.isLoggedIn = auth.isLoggedIn();
  }


  ngOnInit() {
  }

}
