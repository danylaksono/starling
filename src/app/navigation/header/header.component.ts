import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule
  ]
})

export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  onToggleSidenav () {
    this.sidenavToggle.emit();
  }

  onClicked(){
    //console.log('clicked');
    this.sidenavToggle.emit();
  }

  ngOnInit() {
  }

}
