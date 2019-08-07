import { Component, OnInit } from '@angular/core';
import { NgModule, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-snackbar-warning',
  templateUrl: './snackbar-warning.component.html',
  styleUrls: ['./snackbar-warning.component.scss']
})

@NgModule({
  imports: [
    MaterialModule
  ]
})


export class SnackbarWarningComponent {

  durationInSeconds = 3;


  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackBar: MatSnackBar) { }


  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }


}

export class PizzaPartyComponent {}


