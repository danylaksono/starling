import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
