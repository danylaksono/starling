import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})

@NgModule({
  imports: [
    MaterialModule

  ]
})


export class MainViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
