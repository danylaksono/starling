import { Injectable } from '@angular/core';
import { NgModule, Inject } from '@angular/core';
//import { MaterialModule } from './../material/material.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})


export class WarningSnackbarService {

  actionButtonLabel: string = 'OK';

  constructor(public snackBar: MatSnackBar) { }

  open(message) {
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(message, this.actionButtonLabel, config);


  }
}
