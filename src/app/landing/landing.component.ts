import { MaterialModule } from './../material/material.module';
import { Component, OnInit, NgModule } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class LandingComponent implements OnInit {
   title = 'materialApp'; 
   centered = false;
   disabled = false;
   unbounded = false;
   radius: number;
   color: string;

  constructor() { }

  ngOnInit() {
  }

}
