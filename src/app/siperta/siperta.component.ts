import { Component, OnInit, NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-siperta',
  templateUrl: './siperta.component.html',
  styleUrls: ['./siperta.component.scss']
})


@NgModule({
  imports: [
    MaterialModule

  ]
})

export class SipertaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
